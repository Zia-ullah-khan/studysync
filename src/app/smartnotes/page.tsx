'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001' 
  : 'https://studysyncapi.rfas.software/';

type TranscriptionResponse = {
  transcript: string;
  confidence?: number;
  durationSeconds?: number;
  error?: string;
};

type SummarizationResponse = {
  summary: string;
  keyPoints: string[];
  topics: string[];
};

type UploadResponse = {
  success: boolean;
  fileId: string;
  message: string;
};

type AudioRecorder = {
  audioContext: AudioContext;
  source: MediaStreamAudioSourceNode;
  scriptNode: ScriptProcessorNode;
  stream: MediaStream;
  isRecording: boolean;
};

export default function SmartNotes() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummarizationResponse | null>(null);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | AudioRecorder | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isLiveTranscribing, setIsLiveTranscribing] = useState(false);
  const [isSettingUpTranscription, setIsSettingUpTranscription] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);
  const [isAudioRecording, setIsAudioRecording] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    } else {
      router.push('/login?redirect=smartnotes');
    }

    const expiration = localStorage.getItem('authExpiration');
    if (expiration && parseInt(expiration) < Date.now()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('authExpiration');
      router.push('/login?redirect=smartnotes');
    }
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Page unloading, cleaning up...');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setTranscript(null);
      setSummary(null);
      setCurrentFileId(null);
      setErrorMessage('');
    }
  };

  const handleUploadAndProcess = async () => {
    if (!selectedFile || !authToken) {
      setErrorMessage('Please select an audio file and ensure you are logged in.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTranscript(null);
    setSummary(null);
    setCurrentFileId(null);

    try {
      const formData = new FormData();
      formData.append('audioFile', selectedFile, selectedFile.name);
      const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId || '';
      if (userId) {
        formData.append('userId', userId);
      }

      console.log('Uploading audio file:', selectedFile.name);
      const uploadResponse = await fetch(`${API_BASE_URL}/smartnotes/audio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      const uploadData: UploadResponse = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(uploadData.message || `HTTP error! status: ${uploadResponse.status}`);
      }

      const fileId = uploadData.fileId;
      if (!fileId) {
        throw new Error('File ID is required but was not returned by the upload response.');
      }
      setCurrentFileId(fileId);
      console.log('Upload successful. File ID:', fileId);

      console.log('Requesting transcription for file ID:', fileId);
      console.log('Transcription request payload:', {
        fileId: fileId,
        language: 'en',
        userId: userId
      });

      const transcribeResponse = await fetch(`${API_BASE_URL}/smartnotes/transcribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          fileId: fileId,
          language: 'en',
          userId: userId
        })
      });
      console.log(transcribeResponse);
      const transcribeData: TranscriptionResponse = await transcribeResponse.json();
      if (!transcribeResponse.ok) {
        throw new Error(transcribeData.error || 'Failed to transcribe audio');
      }
      setTranscript(transcribeData.transcript);
      console.log('Transcription received:', transcribeData.transcript?.substring(0, 100) + '...');

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('SmartNotes processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToEduBot = () => {
    if (currentFileId) {
      router.push(`/edubot?fileId=${currentFileId}`);
    } else {
      setErrorMessage('Cannot send to EduBot: File ID is missing.');
    }
  };

  const handleRecord = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
          setIsRecording(true);
          setErrorMessage('');
          setRecordedAudioUrl(null);
          
          const audioChunks: Blob[] = [];
          
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.push(event.data);
            }
          };
          
          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudioUrl(audioUrl);
            setTranscript(`Recorded audio of size ${audioBlob.size} bytes. You can now play it back or upload it for transcription.`);
            stream.getTracks().forEach(track => track.stop());
            setMediaRecorder(null);
            
            console.log('Recording stopped. Audio blob size:', audioBlob.size);
          };
          
          recorder.start();
          console.log('Recording started...');
        })
        .catch((err) => {
          setErrorMessage('Microphone access denied or unavailable.');
          setIsRecording(false);
          console.error('getUserMedia error:', err);
        });
    } else {
      if (mediaRecorder) {
        if ('state' in mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
          console.log('Stopping recording...');
        } else if ('isRecording' in mediaRecorder && mediaRecorder.isRecording) {
          stopAudioCapture();
        }
      }
    }
  };

  const handleUploadRecording = async () => {
    if (!recordedAudioUrl || !authToken) {
      setErrorMessage('No recording available or not logged in.');
      return;
    }

    try {
      const response = await fetch(recordedAudioUrl);
      const audioBlob = await response.blob();
      const audioFile = new File([audioBlob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
      setSelectedFile(audioFile);
      setErrorMessage('');
      const formData = new FormData();
      formData.append('audioFile', audioFile, audioFile.name);
      const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId || '';
      if (userId) {
        formData.append('userId', userId);
      }

      setIsLoading(true);
      setTranscript(null);
      setSummary(null);
      setCurrentFileId(null);

      console.log('Uploading recorded audio file:', audioFile.name);
      const uploadResponse = await fetch(`${API_BASE_URL}/smartnotes/audio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      const uploadData: UploadResponse = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(uploadData.message || `HTTP error! status: ${uploadResponse.status}`);
      }

      const fileId = uploadData.fileId;
      if (!fileId) {
        throw new Error('File ID is required but was not returned by the upload response.');
      }
      setCurrentFileId(fileId);
      console.log('Upload successful. File ID:', fileId);

      console.log('Requesting transcription for file ID:', fileId);
      const transcribeResponse = await fetch(`${API_BASE_URL}/smartnotes/transcribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          fileId: fileId,
          language: 'en',
          userId: userId
        })
      });

      const transcribeData: TranscriptionResponse = await transcribeResponse.json();
      if (!transcribeResponse.ok) {
        throw new Error(transcribeData.error || 'Failed to transcribe audio');
      }
      setTranscript(transcribeData.transcript);
      console.log('Transcription received:', transcribeData.transcript?.substring(0, 100) + '...');

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('Recording upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLiveTranscription = async () => {
    if (!isLiveTranscribing) {
      try {
        setIsLiveTranscribing(true);
        setIsSettingUpTranscription(true);
        setErrorMessage('');
        setLiveTranscript('');
        setIsWebSocketReady(false);
        setIsAudioRecording(false);

        const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId || '';
        console.log('Starting recording session with userId:', userId);
        
        const startResponse = await fetch(`${API_BASE_URL}/smartnotes/start-recording`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            userId,
            sessionName: `Live Session ${new Date().toLocaleTimeString()}`
          })
        });

        if (!startResponse.ok) {
          const responseText = await startResponse.text();
          throw new Error(`Failed to start recording session: ${responseText}`);
        }

        const responseData = await startResponse.json();
        const { sessionId: newSessionId, websocketUrl } = responseData;
        
        if (!newSessionId) {
          throw new Error('No session ID received from server');
        }
        
        setSessionId(newSessionId);
        console.log('Session started with ID:', newSessionId);

        const wsUrl = process.env.NODE_ENV === 'development' 
          ? 'ws://localhost:3001/recordings/socket' 
          : websocketUrl;

        console.log('Connecting to WebSocket:', wsUrl);
        const ws = new WebSocket(wsUrl);
        setWebsocket(ws);

        ws.onopen = () => {
          console.log('WebSocket connected');
        };

        ws.onclose = (event) => {
          console.log('WebSocket closed:', event.code, event.reason);
          setIsWebSocketReady(false);
          setIsAudioRecording(false);
          
          if (event.code === 1005) {
            console.log('Connection closed without status - possible network issue');
          }
          
          if (isLiveTranscribing) {
            console.log('Unexpected disconnect during recording');
            setErrorMessage('Connection lost during recording');
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setErrorMessage('WebSocket connection error');
        };

        await setupAudioRecording(ws, newSessionId);
        
        if (ws.readyState === WebSocket.OPEN) {
          const initMessage = {
            type: 'init',
            sessionId: newSessionId,
            userId,
            authToken
          };
          console.log('Sending init message after setup:', initMessage);
          ws.send(JSON.stringify(initMessage));
        } else {
          console.error('WebSocket not open when trying to send init message');
        }

      } catch (error) {
        console.error('Error starting live transcription:', error);
        setErrorMessage('Failed to start live transcription: ' + (error instanceof Error ? error.message : 'Unknown error'));
        setIsLiveTranscribing(false);
        setIsSettingUpTranscription(false);
        setIsWebSocketReady(false);
        setIsAudioRecording(false);
      }
    } else {
      console.log('Stopping live transcription');
      stopAudioCapture();
      cleanupWebSocket();
      
      setIsLiveTranscribing(false);
      setIsSettingUpTranscription(false);
      setIsWebSocketReady(false);
      setIsAudioRecording(false);
    }
  };

  const setupAudioRecording = async (ws: WebSocket, sessionId: string) => {
    try {
      console.log('Setting up PCM audio recording...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass({
        sampleRate: 16000
      });
      
      const source = audioContext.createMediaStreamSource(stream);
      
      const scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
      
      const audioRecorder = {
        audioContext,
        source,
        scriptNode,
        stream,
        isRecording: false
      };
      
      setMediaRecorder(audioRecorder);
      
      scriptNode.onaudioprocess = (event) => {
        if (!audioRecorder.isRecording) return;
        
        const inputBuffer = event.inputBuffer;
        const channelData = inputBuffer.getChannelData(0);
        
        const pcmData = new Int16Array(channelData.length);
        for (let i = 0; i < channelData.length; i++) {
          const sample = Math.max(-1, Math.min(1, channelData[i]));
          pcmData[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        }
        
        if (ws.readyState === WebSocket.OPEN) {
          console.log('Sending PCM chunk of size:', pcmData.byteLength, 'samples:', pcmData.length);
          ws.send(pcmData.buffer);
        }
      };
      
      source.connect(scriptNode);
      scriptNode.connect(audioContext.destination);
      
      console.log('PCM audio recording setup complete, AudioContext ready');
      
      console.log('Setting up WebSocket message handler for PCM audio recording...');
      ws.onmessage = (event) => {
        console.log('Raw WebSocket message received:', event.data);
        
        if (typeof event.data === 'string') {
          try {
            const data = JSON.parse(event.data);
            console.log('Parsed JSON message:', data.type, data);
            
            switch (data.type) {
              case 'session_initialized':
                console.log('Session ready:', data.sessionId);
                setIsWebSocketReady(true);
                setIsSettingUpTranscription(false);
                console.log('WebSocket state before starting audio:', ws.readyState);
                console.log('About to start PCM audio capture...');
                startAudioCapture(ws, sessionId, audioRecorder);
                break;
                
              case 'recording_started':
                console.log('Recording started');
                setIsAudioRecording(true);
                break;
                
              case 'chunk_received':
                console.log('Chunk received:', data.chunkNumber, 'streaming active:', data.streamingActive);
                break;
                
              case 'realtime_transcript':
                console.log('REALTIME TRANSCRIPT received!', {
                  text: data.text,
                  is_final: data.is_final,
                  confidence: data.confidence,
                  turn_order: data.turn_order
                });
                if (data.text) {
                  console.log('Updating live transcript with realtime data:', data.text);
                  if (data.is_final) {
                    setLiveTranscript(prev => {
                      const newTranscript = prev + (prev ? ' ' : '') + data.text;
                      console.log('Final realtime transcript updated to:', newTranscript);
                      return newTranscript;
                    });
                  } else {
                    setLiveTranscript(prev => {
                      const baseTranscript = prev.replace(/ \[LIVE\].*$/, '');
                      const newTranscript = baseTranscript + (baseTranscript ? ' ' : '') + '[LIVE] ' + data.text;
                      console.log('Interim realtime transcript updated to:', newTranscript);
                      return newTranscript;
                    });
                  }
                } else {
                  console.warn('Realtime transcript received but no text!', data);
                }
                break;
                
              case 'transcript_update':
                console.log('TRANSCRIPT UPDATE received!', {
                  text: data.text,
                  is_final: data.is_final,
                  confidence: data.confidence,
                  messageId: data.messageId
                });
                if (data.text) {
                  console.log('Updating live transcript with:', data.text);
                  if (data.is_final) {
                    setLiveTranscript(prev => {
                      const newTranscript = prev + ' ' + data.text;
                      console.log('Final transcript updated to:', newTranscript);
                      return newTranscript;
                    });
                  } else {
                    setLiveTranscript(prev => {
                      const newTranscript = prev + ' [LIVE] ' + data.text;
                      console.log('Interim transcript updated to:', newTranscript);
                      return newTranscript;
                    });
                  }
                } else {
                  console.warn('Transcript update received but no text!', data);
                }
                break;
                
              case 'recording_stopped':
                console.log('Recording stopped');
                setIsAudioRecording(false);
                break;
                
              case 'final_transcript':
                console.log('Final transcript received:', data.text);
                if (data.text) {
                  setLiveTranscript(prev => prev + (prev ? ' ' : '') + data.text);
                }
                break;
                
              case 'error':
                console.error('WebSocket error:', data.message);
                setErrorMessage(data.message);
                break;
                
              default:
                console.log('Unknown message type:', data.type, 'Full message:', data);
            }
          } catch (error) {
            console.error('Error parsing WebSocket JSON message:', error);
            console.log('Raw message that failed to parse:', event.data);
          }
        } else {
          console.log('Received binary message (likely audio ack), size:', event.data?.byteLength || 'unknown');
        }
      };
      
      return audioRecorder;
      
    } catch (error) {
      console.error('Failed to setup PCM audio recording:', error);
      setErrorMessage('Microphone access denied or unavailable.');
      setIsLiveTranscribing(false);
      return null;
    }
  };

  const startAudioCapture = (ws: WebSocket, sessionId: string, audioRecorder: AudioRecorder) => {
    if (audioRecorder && !audioRecorder.isRecording && ws.readyState === WebSocket.OPEN) {
      console.log('Starting PCM audio capture...');
      
      ws.send(JSON.stringify({
        type: 'start',
        sessionId: sessionId,
        userId: JSON.parse(localStorage.getItem('userData') || '{}').userId || ''
      }));
      
      audioRecorder.isRecording = true;
      
      if (audioRecorder.audioContext.state === 'suspended') {
        audioRecorder.audioContext.resume();
      }
    }
  };

  const stopAudioCapture = () => {
    if (mediaRecorder && 'isRecording' in mediaRecorder && mediaRecorder.isRecording) {
      console.log('⏹️ Stopping PCM audio capture...');
      
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify({
          type: 'stop',
          sessionId: sessionId
        }));
      }
      
      const audioRecorder = mediaRecorder as AudioRecorder;
      audioRecorder.isRecording = false;
      
      if (audioRecorder.source) {
        audioRecorder.source.disconnect();
      }
      if (audioRecorder.scriptNode) {
        audioRecorder.scriptNode.disconnect();
      }
      if (audioRecorder.audioContext) {
        audioRecorder.audioContext.close();
      }
      if (audioRecorder.stream) {
        audioRecorder.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    }
  };

  const cleanupWebSocket = () => {
    if (websocket) {
      console.log('🧹 Cleaning up WebSocket connection...');
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close(1000, 'User initiated close');
      }
      setWebsocket(null);
      setMediaRecorder(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            </div>
            <span className="text-xl font-bold">StudySync</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/smartnotes" className="text-blue-600 font-medium">SmartNotes</Link>
            <Link href="/edubot" className="hover:text-blue-600 transition-colors">EduBot</Link>
            <Link href="/learnsphere" className="hover:text-blue-600 transition-colors">LearnSphere</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="text-sm hover:underline">
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">SmartNotes</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Upload audio files, record for later processing, or use live transcription for real-time speech-to-text.
        </p>

        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-lg mb-6 text-center">
            {errorMessage}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 space-y-6">

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label htmlFor="audio-upload" className="block text-sm font-medium mb-1">Upload Audio File</label>
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40"
              />
              {selectedFile && <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Selected: {selectedFile.name}</p>}
            </div>
            <button
              onClick={handleUploadAndProcess}
              disabled={!selectedFile || isLoading}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              Upload & Process
            </button>
            <span className="text-gray-400 dark:text-gray-500">OR</span>
            <button
              onClick={handleRecord}
              disabled={isLoading || isLiveTranscribing}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400'
              }`}
            >
              {isRecording && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
              {isRecording ? 'Stop Recording' : 'Record Live'}
            </button>
            <span className="text-gray-400 dark:text-gray-500">OR</span>
            <button
              onClick={handleLiveTranscription}
              disabled={isLoading || isRecording}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                isLiveTranscribing
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-400'
              }`}
            >
              {isLiveTranscribing && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
              {isLiveTranscribing ? 'Stop Live Transcription' : 'Start Live Transcription'}
            </button>
          </div>

          {(transcript || summary || recordedAudioUrl || liveTranscript || isLiveTranscribing) && (
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              
              {(liveTranscript || isLiveTranscribing) && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Live Transcript</h2>
                    {isLiveTranscribing && (
                      <span className="flex items-center gap-2 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                        {isWebSocketReady 
                          ? (isAudioRecording ? 'Recording & Transcribing...' : 'Connected, Ready to Record')
                          : 'Connecting...'
                        }
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 max-h-60 overflow-y-auto text-sm">
                    {liveTranscript ? (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Current transcript ({liveTranscript.length} chars):</div>
                        <div>{liveTranscript}</div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        {isWebSocketReady ? 'Ready to start recording. Speak into your microphone...' : 'Setting up connection...'}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {recordedAudioUrl && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Recorded Audio</h2>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <audio 
                      controls 
                      src={recordedAudioUrl}
                      className="w-full"
                    >
                      Your browser does not support the audio element.
                    </audio>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      You can play back your recording above. To get a transcript, you&apos;ll need to convert this to a file and upload it.
                    </div>
                    <button
                      onClick={handleUploadRecording}
                      disabled={isLoading}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
                    >
                      Upload Recording for Transcription
                    </button>
                  </div>
                </div>
              )}

              {transcript && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Transcript</h2>
                    {currentFileId && (
                      <button
                        onClick={handleSendToEduBot}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                      >
                        Send to EduBot
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 max-h-60 overflow-y-auto text-sm">
                    {transcript}
                  </div>
                </div>
              )}

              {summary && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Summary & Key Points</h2>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Overall Summary:</h3>
                      <p className="text-sm">{summary.summary}</p>
                    </div>
                    {summary.keyPoints && summary.keyPoints.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-1">Key Points:</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {summary.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {summary.topics && summary.topics.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-1">Detected Topics:</h3>
                        <div className="flex flex-wrap gap-2">
                          {summary.topics.map((topic, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} StudySync. All rights reserved.
        </div>
      </footer>

      {(isLoading || isSettingUpTranscription) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p>{isLoading ? 'Processing audio...' : 'Starting live transcription...'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
