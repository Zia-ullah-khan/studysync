'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AudioContextConstructor = typeof AudioContext;
const getAudioContextClass = (): AudioContextConstructor => {
  if (typeof window === 'undefined') return AudioContext;
  const w = window as Window & { webkitAudioContext?: AudioContextConstructor };
  return (window.AudioContext || w.webkitAudioContext || AudioContext) as AudioContextConstructor;
};

type AudioRecorder = {
  audioContext: AudioContext;
  source: MediaStreamAudioSourceNode;
  scriptNode: ScriptProcessorNode;
  stream: MediaStream;
  isRecording: boolean;
};

interface WSBase { type: string; [k: string]: unknown }
type WSMessage =
  | { type: 'ready'; sessionId: string }
  | { type: 'partial_transcript'; text: string }
  | { type: 'final_transcript'; text: string; segmentId: string }
  | { type: 'ai_response_text'; text: string; turnId: string }
  | { type: 'ai_response_audio_chunk'; frame?: string }
  | { type: 'ai_response_audio_end'; turnId: string }
  | { type: 'error'; code: string; message: string }
  | WSBase;

const SAMPLE_RATE = 16000;
const WS_BASE = 'ws://localhost:5000';
const DEBUG = true;

const VoicebotPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const rafRef = useRef<number | null>(null);
  const amplitudeRef = useRef(0);
  const lastUiUpdateRef = useRef<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const wsReadyRef = useRef(false);
  const pendingAudioFramesRef = useRef<Int16Array[]>([]);
  const recordingActiveRef = useRef(false);
  const pendingStartRef = useRef(false);
  const lastStartSentRef = useRef<number>(0);

  const flushPendingFrames = () => {
    if (!wsRef.current || !wsReadyRef.current) return;
    const ws = wsRef.current;
    const queue = pendingAudioFramesRef.current;
    while (queue.length) {
      const frame = queue.shift();
      if (frame) ws.send(frame.buffer);
    }
  };

  const playbackCtxRef = useRef<AudioContext | null>(null);
  const playbackQueueEndTimeRef = useRef<number>(0);

  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [amplitude, setAmplitude] = useState(0);
  const [partialTranscript, setPartialTranscript] = useState('');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'ready' | 'closed' | 'error'>('idle');
  const [enableAI, setEnableAI] = useState(true);
  const [aiVoice] = useState('alloy');
  const [latestAudioUrl, setLatestAudioUrl] = useState<string | null>(null);
  const aiSpeakingRef = useRef(false);
  const userStoppingRef = useRef(false);
  const userTurnEndedRef = useRef(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      const uDataRaw = localStorage.getItem('userData');
      if (token) setAuthToken(token); else router.push('/login?redirect=voicebot');
      if (uDataRaw) {
        try { const parsed = JSON.parse(uDataRaw); if (parsed?.userId) setUserId(parsed.userId); } catch { /* ignore */ }
      }
      const exp = localStorage.getItem('authExpiration');
      if (exp && parseInt(exp) < Date.now()) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('authExpiration');
        router.push('/login?redirect=voicebot');
      }
    } catch { /* ignore */ }
  }, [router]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseRadius = 90;
    const maxExtra = 180;

    let visualAmp = 0;
    const VISUAL_SMOOTHING = 0.12;

    const draw = () => {
      const targetAmp = amplitudeRef.current;
      visualAmp += (targetAmp - visualAmp) * VISUAL_SMOOTHING;
      const r = baseRadius + visualAmp * maxExtra;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, 2 * Math.PI);
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        r * 0.25,
        canvas.width / 2,
        canvas.height / 2,
        r
      );
      gradient.addColorStop(0, '#eef2ff');
      gradient.addColorStop(0.6, '#d9e0ff');
      gradient.addColorStop(1, '#c7d2fe');
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 8;
      ctx.stroke();
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const openWebSocketIfNeeded = async (): Promise<void> => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;
    setConnectionStatus('connecting');
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(`${WS_BASE}/recordings/socket`);
        wsRef.current = ws;
        wsReadyRef.current = false;
        ws.binaryType = 'arraybuffer';
        ws.onopen = () => { wsReadyRef.current = true; setConnectionStatus('ready'); resolve(); };
        ws.onmessage = (ev) => {
          if (typeof ev.data === 'string') {
            try { handleWsMessage(JSON.parse(ev.data) as WSMessage); } catch { /* ignore parse */ }
          } else if (ev.data instanceof ArrayBuffer) {
            enqueuePlayback(new Int16Array(ev.data));
          }
        };
        ws.onerror = () => { setConnectionStatus('error'); };
        ws.onclose = (ev) => {
          if (DEBUG) console.log('[voicebot] ws.onclose code', ev.code, 'reason', ev.reason);
          wsReadyRef.current = false;
            if (!userStoppingRef.current && isRecording) {
              setTimeout(async () => {
                if (!isRecording || userStoppingRef.current) return;
                try {
                  await openWebSocketIfNeeded();
                  sendInitIfNeeded();
                  pendingStartRef.current = true;
                } catch {}
              }, 800);
            } else {
              setConnectionStatus('closed');
            }
        };
      } catch (err) {
        setConnectionStatus('error'); reject(err instanceof Error ? err : new Error('WS open failed'));
      }
    });
  };

  const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const sendInitIfNeeded = () => {
    if (!wsRef.current || !wsReadyRef.current) return;
    if (!sessionIdRef.current) sessionIdRef.current = generateSessionId();
    const initMsg = {
      type: 'init',
      sessionId: sessionIdRef.current,
      userId: userId || 'anon-user',
      authToken: authToken || '',
      enableAI,
      aiVoice,
      systemPrompt: 'You are a helpful AI assistant. Keep responses brief and conversational.'
    };
    if (DEBUG) console.log('[voicebot] sending init', initMsg);
    try { wsRef.current.send(JSON.stringify(initMsg)); } catch { /* ignore */ }
  };

  const startRecording = async () => {
    setErrorMsg(null); setUnsupported(false); if (isRecording) return;
    userStoppingRef.current = false;
    aiSpeakingRef.current = false;
    userTurnEndedRef.current = false;
    if (!authToken) { router.push('/login?redirect=voicebot'); return; }
    sessionIdRef.current = null; recordingActiveRef.current = false; pendingStartRef.current = true;
    if (DEBUG) console.log('[voicebot] startRecording invoked');
    try {
      await openWebSocketIfNeeded();
      sendInitIfNeeded();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'WebSocket failed'); return;
    }
    setTimeout(() => {
      if (pendingStartRef.current && wsRef.current && wsReadyRef.current && sessionIdRef.current) {
        if (DEBUG) console.warn('[voicebot] no session_initialized yet, forcing start');
        try { wsRef.current.send(JSON.stringify({ type: 'start', sessionId: sessionIdRef.current })); } catch {}
        recordingActiveRef.current = true; pendingStartRef.current = false; flushPendingFrames();
      }
    }, 3000);
    let rec = recorderRef.current; if (!rec) rec = await setupAudioRecording(); if (!rec) return;
    if (rec.audioContext.state === 'suspended') { try { await rec.audioContext.resume(); } catch {} }
    rec.isRecording = true; setIsRecording(true);
  };

  const stopRecording = () => {
    const rec = recorderRef.current; if (!rec) return; rec.isRecording = false; setIsRecording(false); amplitudeRef.current = 0; setAmplitude(0); setPartialTranscript('');
    recordingActiveRef.current = false; pendingStartRef.current = false;
    userStoppingRef.current = true;
    if (wsRef.current && wsReadyRef.current && sessionIdRef.current) {
      try { wsRef.current.send(JSON.stringify({ type: 'stop', sessionId: sessionIdRef.current })); } catch { /* ignore */ }
    }
    setTimeout(()=>{
      if (wsRef.current) { try { wsRef.current.close(1000, 'user_stop'); } catch {} }
    },300);
  };

  const ensurePlaybackCtx = () => {
    if (!playbackCtxRef.current) {
      const AC = getAudioContextClass();
      playbackCtxRef.current = new AC({ sampleRate: SAMPLE_RATE });
    }
    return playbackCtxRef.current!;
  };

  const enqueuePlayback = (pcm16: Int16Array) => {
    const ctx = ensurePlaybackCtx();
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768;
    const buffer = ctx.createBuffer(1, float32.length, SAMPLE_RATE);
    buffer.copyToChannel(float32, 0, 0);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const startAt = Math.max(ctx.currentTime + 0.05, playbackQueueEndTimeRef.current || ctx.currentTime);
    playbackQueueEndTimeRef.current = startAt + buffer.duration;
    src.connect(ctx.destination);
    src.start(startAt);
  };

  const base64ToInt16 = (b64: string): Int16Array => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const view = new DataView(bytes.buffer);
    const out = new Int16Array(Math.floor(bytes.length / 2));
    for (let i = 0; i < out.length; i++) out[i] = view.getInt16(i * 2, true);
    return out;
  };

  const float32ToInt16 = (f32: Float32Array): Int16Array => {
    const out = new Int16Array(f32.length);
    for (let i = 0; i < f32.length; i++) { let s = f32[i]; s = Math.max(-1, Math.min(1, s)); out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF; }
    return out;
  };

  const setupAudioRecording = async (): Promise<AudioRecorder | null> => {
    try {
      if (typeof navigator === 'undefined') return null;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { setUnsupported(true); return null; }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: SAMPLE_RATE, channelCount: 1, echoCancellation: true, noiseSuppression: true } });
      const AudioContextClass = getAudioContextClass();
      const audioContext = new AudioContextClass({ sampleRate: SAMPLE_RATE });
      const source = audioContext.createMediaStreamSource(stream);
      const scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
      const rec: AudioRecorder = { audioContext, source, scriptNode, stream, isRecording: false }; recorderRef.current = rec;
      let smooth = 0; const AUDIO_SMOOTHING = 0.22; const UI_UPDATE_INTERVAL = 120;
      scriptNode.onaudioprocess = (event) => {
        if (!rec.isRecording) return;
        const channelData = event.inputBuffer.getChannelData(0);
        let sum = 0; for (let i = 0; i < channelData.length; i++) sum += channelData[i] * channelData[i];
        const rms = Math.sqrt(sum / channelData.length);
        const target = Math.min(1, rms * 3.2);
        smooth += (target - smooth) * AUDIO_SMOOTHING;
        amplitudeRef.current = smooth;
        const now = performance.now();
        if (now - lastUiUpdateRef.current > UI_UPDATE_INTERVAL) { lastUiUpdateRef.current = now; setAmplitude(smooth); }
        // Removed AI speaking check - always send audio frames for continuous recording
        if (!wsRef.current) { if (DEBUG && Math.random() < 0.01) console.log('[voicebot] skip frame: no ws'); return; }
        const int16 = float32ToInt16(channelData);
        if (wsReadyRef.current) {
            try { wsRef.current.send(int16.buffer); } catch { if (DEBUG) console.warn('[voicebot] send failed'); }
            if (DEBUG && Math.random() < 0.01) console.log('[voicebot] frame sent bytes', int16.byteLength * 2);
        } else {
            pendingAudioFramesRef.current.push(int16);
            if (DEBUG && Math.random() < 0.01) console.log('[voicebot] queued frame (ws not ready) Q=', pendingAudioFramesRef.current.length);
        }
      };
      source.connect(scriptNode);
      const silentGain = audioContext.createGain();
      silentGain.gain.value = 0;
      scriptNode.connect(silentGain);
      silentGain.connect(audioContext.destination);
      return rec;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Microphone access denied or unavailable';
      setErrorMsg(msg); return null;
    }
  };

  type GenericMsg = {
    type?: 'ready' | 'session_initialized' | 'partial_transcript' | 'realtime_transcript' | 'final_transcript' | 'ai_response_text' | 'ai_response' | 'ai_response_audio_chunk' | 'ai_audio' | 'error' | 'ai_error' | string;
    text?: string;
    sessionId?: string;
    frame?: string;
    audioData?: string;
    mimeType?: string;
    message?: string;
    [k: string]: unknown;
  };
  const handleWsMessage = (msg: WSMessage | unknown) => {
    if (typeof msg !== 'object' || msg === null) return;
    const m = msg as GenericMsg;
    switch (m.type) {
      case 'ready':
      case 'session_initialized':
        if (typeof m.sessionId === 'string') sessionIdRef.current = m.sessionId;
        if (DEBUG) console.log('[voicebot] received', m.type, 'session', sessionIdRef.current);
        if (pendingStartRef.current && wsRef.current && sessionIdRef.current) {
          if (DEBUG) console.log('[voicebot] sending start');
          try { wsRef.current.send(JSON.stringify({ type: 'start', sessionId: sessionIdRef.current })); } catch {}
          recordingActiveRef.current = true; pendingStartRef.current = false; flushPendingFrames();
        }
        break;
      case 'partial_transcript':
      case 'realtime_transcript':
        if (typeof m.text === 'string') setPartialTranscript(m.text);
        if (typeof (m as Record<string, unknown>).is_final === 'boolean' && (m as Record<string, unknown>).is_final) {
          userTurnEndedRef.current = false;
          if (DEBUG) console.log('[voicebot] user turn final (continuous streaming retained)');
        }
        break;
      case 'final_transcript':
        if (typeof m.text === 'string') { const textStr = m.text; setTranscript(t => [...t, textStr]); setPartialTranscript(''); }
        break;
      case 'ai_response_text':
      case 'ai_response':
        if (typeof m.text === 'string') { const textStr = m.text; setAiResponses(r => [...r, textStr]); }
        break;
      case 'ai_response_audio_chunk':
      case 'ai_audio': {
        aiSpeakingRef.current = true;
        const audioMsg = m as GenericMsg;
        const mime = typeof audioMsg.mimeType === 'string' ? audioMsg.mimeType : '';
        if (typeof audioMsg.audioData === 'string' && /mp3|mpeg/i.test(mime)) {
          try {
            const b64 = audioMsg.audioData;
            const bin = atob(b64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const blob = new Blob([bytes], { type: mime || 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            if (latestAudioUrl) URL.revokeObjectURL(latestAudioUrl);
            setLatestAudioUrl(url);
          } catch {
            if (DEBUG) console.warn('[voicebot] mp3 decode failed, falling back to pcm path');
          }
          break;
        }
        if (typeof audioMsg.frame === 'string') enqueuePlayback(base64ToInt16(audioMsg.frame));
        else if (typeof audioMsg.audioData === 'string') { try { enqueuePlayback(base64ToInt16(audioMsg.audioData)); } catch {} }
        break;
      }
      case 'ai_response_audio_end': {
        aiSpeakingRef.current = false;
        userTurnEndedRef.current = false;
        if (DEBUG) console.log('[voicebot] ai_response_audio_end (continuous recording mode - no action needed)');
        // No need to resume upstream since we're continuously recording
        break;
      }
      case 'error':
      case 'ai_error':
        if (typeof m.message === 'string') setErrorMsg(String(m.message));
        break;
      default:
        break;
    }
  };

  const resumeUpstream = React.useCallback((reason: string = 'auto') => {
    if (!isRecording) { if (DEBUG) console.log('[voicebot] resumeUpstream skipped, not recording'); return; }
    const now = Date.now();
    if (now - lastStartSentRef.current < 100) {
      if (DEBUG) console.log('[voicebot] resumeUpstream throttled');
    } else if (wsRef.current && wsReadyRef.current && sessionIdRef.current) {
      try {
        wsRef.current.send(JSON.stringify({ type: 'start', sessionId: sessionIdRef.current, resume: true, reason }));
        lastStartSentRef.current = now;
      } catch {}
      if (DEBUG) console.log('[voicebot] resumeUpstream sent start(resume) reason=', reason);
    } else if (DEBUG) {
      console.warn('[voicebot] resumeUpstream could not send (wsReady?)', wsRef.current?.readyState, wsReadyRef.current);
    }
  }, [isRecording]);


  useEffect(() => {
    if (!isRecording) return;
    // Removed auto-resume logic since we're now continuously recording
    const id = setInterval(() => {
      // Just keep the connection alive
      if (isRecording && wsRef.current && wsRef.current.readyState === WebSocket.OPEN && wsReadyRef.current && !userStoppingRef.current) {
        // Connection is active and healthy
      }
    }, 5000);
    return () => clearInterval(id);
  }, [isRecording, resumeUpstream]);

  useEffect(() => {
    return () => {
      const rec = recorderRef.current;
      if (rec) {
        try { rec.source.disconnect(); } catch {}
        try { rec.scriptNode.disconnect(); } catch {}
        try { rec.audioContext.close(); } catch {}
        rec.stream.getTracks().forEach(t => t.stop());
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (wsRef.current && userStoppingRef.current) { try { wsRef.current.close(1000, 'user_stop'); } catch {} }
      if (playbackCtxRef.current) { try { playbackCtxRef.current.close(); } catch {} }
      if (latestAudioUrl) { try { URL.revokeObjectURL(latestAudioUrl); } catch {} }
    };
  }, [latestAudioUrl]);

  return (
    <div className="flex flex-col gap-4 h-full min-h-0 items-center justify-center p-4 text-center w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center min-h-bloop min-w-bloop h-max w-max">
        <canvas ref={canvasRef} width={454} height={454} style={{ width: 227, height: 227 }} className={!isRecording ? 'opacity-60 transition-opacity' : 'transition-opacity'} />
      </div>
      <div className="flex gap-3 flex-wrap justify-center items-center">
        {!isRecording && !unsupported && (<button onClick={startRecording} className="px-5 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">Start</button>)}
        {isRecording && (<button onClick={stopRecording} className="px-5 py-2 rounded-md bg-rose-600 text-white text-sm font-medium hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400">Stop</button>)}
        <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
          <input type="checkbox" checked={enableAI} onChange={e=>setEnableAI(e.target.checked)} /> AI
        </label>
        <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-100">Conn: {connectionStatus}</span>
      </div>
      {unsupported && <p className="text-sm text-red-500 max-w-md">Microphone API not supported in this environment.</p>}
      {errorMsg && <p className="text-sm text-red-500 max-w-md">{errorMsg}</p>}
      <p className="text-xs text-gray-500">Amplitude: {amplitude.toFixed(3)}</p>
      <div className="w-full grid md:grid-cols-2 gap-4 mt-4 text-left">
        <div className="p-3 border rounded-md bg-white/60 backdrop-blur">
          <h3 className="font-semibold text-sm mb-2">Live Transcript</h3>
          <div className="text-xs space-y-1 max-h-48 overflow-auto">
            {transcript.map((t,i) => <p key={i}>{t}</p>)}
            {partialTranscript && <p className="text-indigo-600">{partialTranscript}</p>}
          </div>
        </div>
        <div className="p-3 border rounded-md bg-white/60 backdrop-blur">
          <h3 className="font-semibold text-sm mb-2">AI Responses</h3>
          <div className="text-xs space-y-1 max-h-48 overflow-auto">
            {aiResponses.map((r,i) => <p key={i}>{r}</p>)}
          </div>
          {latestAudioUrl && <audio src={latestAudioUrl} onEnded={()=>{ 
            if (DEBUG) console.log('[voicebot] audio element ended - continuous recording continues');
            aiSpeakingRef.current = false; 
            userTurnEndedRef.current = false; 
            // No need to resume since we're continuously recording
          }} onLoadedData={()=>{
            if (DEBUG) console.log('[voicebot] audio loaded, AI speaking (but mic continues recording)');
            aiSpeakingRef.current = true;
          }} controls autoPlay className="mt-2 w-full" />}
        </div>
      </div>
      {DEBUG && (
        <div className="w-full max-w-3xl mx-auto mt-4 p-3 rounded-md bg-white/60 backdrop-blur text-left text-xs">
          <h3 className="font-semibold text-sm mb-2">Debug Info</h3>
          <pre className="whitespace-pre-wrap break-words">
            {`Connection Status: ${connectionStatus}
Session ID: ${sessionIdRef.current}
Recording Active: ${recordingActiveRef.current}
WebSocket Ready: ${wsReadyRef.current}
Pending Audio Frames: ${pendingAudioFramesRef.current.length}
AI Speaking: ${aiSpeakingRef.current}
User Stopping: ${userStoppingRef.current}
User Turn Ended: ${userTurnEndedRef.current}`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default VoicebotPage;