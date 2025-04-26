'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

type ChatResponse = {
  response: string;
  sources: string[];
};

type Flashcard = {
  question: string;
  answer: string;
};

type FlashcardsResponse = {
  flashcards: Flashcard[];
};

type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
};

type QuizResponse = {
  quiz: {
    id: string;
    questions: QuizQuestion[];
  };
};

export default function EduBot() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'chat' | 'flashcards' | 'quiz'>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [context, setContext] = useState(''); // <-- Add context state here

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    if (token) {
      setAuthToken(token);
    } else {
      router.push('/login?redirect=edubot');
    }

    const expiration = localStorage.getItem('authExpiration');
    if (expiration && parseInt(expiration) < Date.now()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('authExpiration');
      router.push('/login?redirect=edubot');
    }

    const fileIdParam = searchParams.get('fileId');
    if (fileIdParam) {
      setFileId(fileIdParam);
      console.log("Received fileId:", fileIdParam);
    }
  }, [router, searchParams]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadResponse = await axios.post('http://localhost:3001/uploads/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log('File uploaded successfully:', uploadResponse.data);
        setUploadedFile(file);
        const uploadedFileId = uploadResponse.data.fileId; // Update fileId with the generated file ID from the server
        setFileId(uploadedFileId);

        // Fetch the content of the uploaded file
        const fileContentResponse = await axios.get(`http://localhost:3001/uploads/file?id=${uploadedFileId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (fileContentResponse.data && fileContentResponse.data.content) {
          setContext(`uploaded file, ${file.name}, content of uploaded file: ${fileContentResponse.data.content}`);
          console.log('File content retrieved and set as context:', fileContentResponse.data.content);
        } else {
          console.warn('File content not found in response:', fileContentResponse.data);
          setErrorMessage('Failed to retrieve file content. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading or retrieving file content:', error);
        setErrorMessage('Failed to upload or retrieve file content. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="h-16 w-32" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/smartnotes" className="hover:text-blue-600 transition-colors">SmartNotes</Link>
            <Link href="/edubot" className="text-blue-600 font-medium">EduBot</Link>
            <Link href="/learnsphere" className="hover:text-blue-600 transition-colors">LearnSphere</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="text-sm hover:underline">
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'chat' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat with AI
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'flashcards' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab('flashcards')}
            >
              Generate Flashcards
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'quiz' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab('quiz')}
            >
              Generate Quiz
            </button>
          </div>

          <div className="p-6">
            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-lg mb-6">
                {errorMessage}
              </div>
            )}
            
            {activeTab === 'chat' && <ChatWithAI authToken={authToken} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} fileId={fileId} handleFileUpload={handleFileUpload} context={context} setContext={setContext} />} 
            {activeTab === 'flashcards' && <GenerateFlashcards authToken={authToken} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} fileId={fileId} />}
            {activeTab === 'quiz' && <GenerateQuiz authToken={authToken} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} fileId={fileId} />}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} StudySync. All rights reserved.
        </div>
      </footer>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p>Processing your request...</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatWithAI({ authToken, setIsLoading, setErrorMessage, fileId, handleFileUpload, context, setContext }: { authToken: string | null, setIsLoading: (loading: boolean) => void, setErrorMessage: (error: string) => void, fileId: string | null, handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void, context: string, setContext: (ctx: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string; sources?: string[] }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  useEffect(() => {
    // Only fetch transcription if fileId exists, authToken exists, and context is empty,
    // and fileId was not set by file upload (i.e., only fetch for fileId from URL param)
    if (!fileId || !authToken || context) return;
    // Only fetch if fileId came from URL param, not from upload
    // If fileId was set by upload, context will be set before fileId is set
    // So, if context is empty and fileId exists, fetch
    // If you want to never fetch from /smartnotes/transcriptions, just return
    return;
    /*
    const fetchTranscription = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await fetch(`http://localhost:3001/smartnotes/transcriptions/${fileId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          let errorText = `Failed to fetch transcription: ${response.statusText}`;
          try {
            const errorData = await response.text();
            errorText += ` - Server response: ${errorData}`;
          } catch (textError) {}
          throw new Error(errorText);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          try {
            const data = await response.json();
            if (data && data.transcription) {
              setContext(`Context from file: ${data.transcription}`);
              console.log("Transcription loaded into context.");
            } else {
              console.warn("Transcription data not found in JSON response:", data);
              setErrorMessage('Transcription data missing in the response from the server.');
              setContext(`Context related to file ID: ${fileId} (Transcription data missing)`);
            }
          } catch (jsonError) {
            console.error('Failed to parse JSON response:', jsonError);
            let responseText = '(Could not read text)';
            try {
              responseText = await response.text();
            } catch (e) {}
            setErrorMessage(`Failed to process transcription response. Server sent invalid JSON. Content: ${responseText.substring(0, 100)}...`);
            setContext(`Context related to file ID: ${fileId} (Invalid data format)`);
          }
        } else {
          const textData = await response.text();
          setContext(textData);
        }

      } catch (error: any) {
        console.error('Failed to fetch transcription:', error);
        setErrorMessage(error.message || 'Failed to load context from the provided file. Please check the file or try again.');
        setContext(`Context related to file ID: ${fileId} (Error loading)`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranscription();
    */
  }, [fileId, authToken, setIsLoading, setErrorMessage, setContext, context]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (!authToken) {
      setErrorMessage('You must be logged in to use this feature.');
      return;
    }

    const userPrompt = prompt;
    setPrompt('');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/edubot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          _prompt: userPrompt,
          _context: context,
          _userId: JSON.parse(localStorage.getItem('userData') || '{}').userId || '',
          _fileId: fileId
        })
      });

      const data: ChatResponse = await response.json();

      if (response.ok) {
        setChatHistory(prev => [...prev, {
          question: userPrompt,
          answer: data.response,
          sources: data.sources
        }]);
      } else {
        throw new Error(data.response || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setErrorMessage('Failed to communicate with AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Chat with EduBot</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ask me anything about your subjects, and I&apos;ll provide detailed explanations with sources.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <p>Start a conversation with EduBot by asking a question below.</p>
            <p className="text-sm mt-2">Try: &quot;Explain the theory of relativity&quot; or &quot;How does photosynthesis work?&quot;</p>
          </div>
        ) : (
          <div className="space-y-6">
            {chatHistory.map((chat, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 text-blue-600 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-500 dark:text-gray-400">You</p>
                    <p className="mt-1">{chat.question}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 text-green-600 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-500 dark:text-gray-400">EduBot</p>
                    <div className="mt-1 prose dark:prose-invert prose-sm max-w-none">
                      <p>{chat.answer}</p>
                    </div>
                    
                    {chat.sources && chat.sources.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sources:</p>
                        <ul className="mt-1 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside">
                          {chat.sources.map((source, idx) => (
                            <li key={idx}>{source}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleChatSubmit} className="space-y-4">
      <div>
        <label htmlFor="context" className="block text-sm font-medium mb-1">Context (Optional)</label>
        <input
          id="context"
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="E.g., I'm a biology student studying cell structure"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        />
      </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            required
          />
          <button
            type="submit"
            disabled={!prompt.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
          <label
            htmlFor="file-upload"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Upload Files
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </form>
    </div>
  );
}

function GenerateFlashcards({ authToken, setIsLoading, setErrorMessage, fileId }: { authToken: string | null, setIsLoading: (loading: boolean) => void, setErrorMessage: (error: string) => void, fileId: string | null }) {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeCard, setActiveCard] = useState(-1);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (fileId) {
      setTopic(`Topic related to file ID: ${fileId}`);
      console.log("GenerateFlashcards received fileId:", fileId);
    }
  }, [fileId]);

  const handleFlashcardGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    if (!authToken) {
      setErrorMessage('You must be logged in to use this feature.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setFlashcards([]);

    try {
      const response = await fetch('http://localhost:3001/edubot/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          _topic: topic,
          _count: count,
          _userId: JSON.parse(localStorage.getItem('userData') || '{}').userId || '',
          _fileId: fileId
        })
      });

      const data: FlashcardsResponse = await response.json();

      if (response.ok && data.flashcards) {
        setFlashcards(data.flashcards);
        if (data.flashcards.length > 0) {
          setActiveCard(0);
          setFlipped(false);
        }
      } else {
        throw new Error('Failed to generate flashcards');
      }
    } catch (error) {
      console.error('Flashcard generation error:', error);
      setErrorMessage('Failed to generate flashcards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextCard = () => {
    if (activeCard < flashcards.length - 1) {
      setActiveCard(prev => prev + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (activeCard > 0) {
      setActiveCard(prev => prev - 1);
      setFlipped(false);
    }
  };

  const toggleFlip = () => {
    setFlipped(prev => !prev);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Generate Flashcards</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Create AI-generated flashcards to help you study any topic.
        </p>
      </div>

      <form onSubmit={handleFlashcardGeneration} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium mb-1">Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Cell Biology"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            required
          />
        </div>
        
        <div>
          <label htmlFor="count" className="block text-sm font-medium mb-1">Number of Flashcards</label>
          <input
            id="count"
            type="number"
            value={count}
            min={1}
            max={20}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Generate Flashcards
        </button>
      </form>

      {flashcards.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="relative h-64 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden perspective">
            <div 
              className={`absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
              onClick={toggleFlip}
            >
              {!flipped ? (
                <>
                  <div className="text-lg font-semibold">{activeCard + 1}. Question</div>
                  <div className="flex-1 flex items-center justify-center text-xl">
                    {flashcards[activeCard]?.question}
                  </div>
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Click to see answer
                  </div>
                </>
              ) : (
                <div className="transform rotate-y-180 h-full flex flex-col justify-between">
                  <div className="text-lg font-semibold">Answer</div>
                  <div className="flex-1 flex items-center justify-center text-xl">
                    {flashcards[activeCard]?.answer}
                  </div>
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Click to see question
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevCard}
              disabled={activeCard <= 0}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <div className="text-center">
              Card {activeCard + 1} of {flashcards.length}
            </div>
            <button
              onClick={nextCard}
              disabled={activeCard >= flashcards.length - 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GenerateQuiz({ authToken, setIsLoading, setErrorMessage, fileId }: { authToken: string | null, setIsLoading: (loading: boolean) => void, setErrorMessage: (error: string) => void, fileId: string | null }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [quiz, setQuiz] = useState<{ id: string, questions: QuizQuestion[] } | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (fileId) {
      setTopic(`Topic related to file ID: ${fileId}`);
      console.log("GenerateQuiz received fileId:", fileId);
    }
  }, [fileId]);

  const handleQuizGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    if (!authToken) {
      setErrorMessage('You must be logged in to use this feature.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setQuiz(null);
    setUserAnswers([]);
    setShowResults(false);

    try {
      const response = await fetch('http://localhost:3001/edubot/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          _topic: topic,
          _difficulty: difficulty,
          _questionCount: questionCount,
          _userId: JSON.parse(localStorage.getItem('userData') || '{}').userId || '',
          _fileId: fileId
        })
      });

      const data: QuizResponse = await response.json();

      if (response.ok && data.quiz) {
        setQuiz(data.quiz);
        setUserAnswers(new Array(data.quiz.questions.length).fill(-1));
      } else {
        throw new Error('Failed to generate quiz');
      }
    } catch (error) {
      console.error('Quiz generation error:', error);
      setErrorMessage('Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelection = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleQuizSubmission = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    return quiz.questions.reduce((score, question, index) => {
      return score + (question.correctAnswer === userAnswers[index] ? 1 : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Generate Quiz</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Create an AI-generated quiz to test your knowledge on any topic.
        </p>
      </div>

      {!quiz ? (
        <form onSubmit={handleQuizGeneration} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-1">Topic</label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., World War II"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="questionCount" className="block text-sm font-medium mb-1">Number of Questions</label>
            <input
              id="questionCount"
              type="number"
              value={questionCount}
              min={1}
              max={10}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Generate Quiz
          </button>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Quiz: {topic}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} • {quiz.questions.length} questions
            </p>
          </div>
          
          <div className="space-y-8">
            {quiz.questions.map((question, qIndex) => (
              <div key={question.id} className="space-y-4">
                <h4 className="font-medium">
                  {qIndex + 1}. {question.text}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div 
                      key={oIndex}
                      onClick={() => handleAnswerSelection(qIndex, oIndex)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors
                        ${userAnswers[qIndex] === oIndex ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'}
                        ${showResults ? 
                          (question.correctAnswer === oIndex ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 
                           userAnswers[qIndex] === oIndex ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : '') 
                          : ''
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm
                          ${userAnswers[qIndex] === oIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                          ${showResults ? 
                            (question.correctAnswer === oIndex ? 'bg-green-500 text-white' : 
                             userAnswers[qIndex] === oIndex ? 'bg-red-500 text-white' : '') 
                            : ''
                          }
                        `}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <div className="flex-1">{option}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {showResults && (
                  <div className={`text-sm ${question.correctAnswer === userAnswers[qIndex] ? 'text-green-600' : 'text-red-600'}`}>
                    {question.correctAnswer === userAnswers[qIndex] 
                      ? 'Correct!' 
                      : `Incorrect. The correct answer is ${String.fromCharCode(65 + question.correctAnswer)}.`}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!showResults ? (
            <button
              onClick={handleQuizSubmission}
              disabled={userAnswers.includes(-1)}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-200">Quiz Results</h3>
              <p className="text-lg font-medium">
                Your Score: {calculateScore()} out of {quiz.questions.length}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {calculateScore() === quiz.questions.length ? "Excellent work!" : "Keep practicing!"}
              </p>
              <button
                onClick={() => {
                  setQuiz(null);
                  setShowResults(false);
                  setUserAnswers([]);
                }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Take Another Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}