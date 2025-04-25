'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      const uploadResponse = await fetch('http://localhost:3001/smartnotes/audio', {
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

      const transcribeResponse = await fetch('http://localhost:3001/smartnotes/transcribe', {
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
    setIsRecording(!isRecording);
    setErrorMessage('Real-time recording not implemented yet.');
    // TODO: Implement actual recording logic using MediaRecorder API
    // and potentially WebSockets based on API docs/backend capabilities.
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
          Upload or record lecture audio for automatic transcription and summarization.
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
              disabled={isLoading}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Record Live'}
            </button>
          </div>

          {(transcript || summary) && (
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
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

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p>Processing audio...</p>
          </div>
        </div>
      )}
    </div>
  );
}
