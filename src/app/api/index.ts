import { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001' 
  : 'https://studysyncapi.rfas.software/';

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', { email, password });
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Login error:', _error);
    res.status(500).json({ success: false, message: 'Authentication failed due to server error' });
  }
}

export async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, name } = req.body;
    console.log('Signup attempt with:', { email, password, name });
    
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Signup error:', _error);
    res.status(500).json({ success: false, message: 'Registration failed due to server error' });
  }
}

export async function chatWithAI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt, context, userId, fileId } = req.body;
    console.log('AI chat request:', { prompt, context, userId, fileId });
    
    const response = await fetch(`${API_BASE_URL}/edubot/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
       },
      body: JSON.stringify({ prompt, context, userId, fileId }),
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('AI chat error:', _error);
    res.status(500).json({ error: 'Failed to get AI response due to server error' });
  }
}

export async function generateFlashcards(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { topic, count, userId, fileId } = req.body;
    console.log('Flashcard generation for:', { topic, count, userId, fileId });

    const response = await fetch(`${API_BASE_URL}/edubot/flashcards`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
      body: JSON.stringify({ topic, count, userId, fileId }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Flashcard generation error:', _error);
    res.status(500).json({ error: 'Failed to generate flashcards due to server error' });
  }
}

export async function generateQuiz(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { topic, difficulty, questionCount, userId, fileId } = req.body;
    console.log('Quiz generation for:', { topic, difficulty, questionCount, userId, fileId });

    const response = await fetch(`${API_BASE_URL}/edubot/quiz`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
      body: JSON.stringify({ topic, difficulty, questionCount, userId, fileId }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Quiz generation error:', _error);
    res.status(500).json({ error: 'Failed to generate quiz due to server error' });
  }
}


export async function uploadAudio(req: NextApiRequest, res: NextApiResponse) {
  console.warn('uploadAudio proxy called - direct frontend upload recommended');
  res.status(501).json({ error: 'Direct upload recommended, proxy not fully implemented' });
}

export async function startRecording(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, sessionName } = req.body;
    console.log('Starting recording for:', { userId, sessionName });

    const response = await fetch(`${API_BASE_URL}/smartnotes/recordings/start`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
      body: JSON.stringify({ userId, sessionName }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Recording start error:', _error);
    res.status(500).json({ error: 'Failed to start recording session due to server error' });
  }
}

export async function transcribeAudio(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fileId, language = 'en', userId } = req.body;
    console.log('Transcribing audio:', { fileId, language, userId });

    const response = await fetch(`${API_BASE_URL}/smartnotes/transcribe`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
      body: JSON.stringify({ fileId, language, userId }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Transcription error:', _error);
    res.status(500).json({ error: 'Failed to transcribe audio due to server error' });
  }
}

export async function summarizeTranscript(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { transcript, maxPoints = 5, userId } = req.body;
    console.log('Summarizing transcript with params:', { transcript: transcript?.substring(0, 50) + '...', maxPoints, userId });

    const response = await fetch(`${API_BASE_URL}/smartnotes/summarize`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
      body: JSON.stringify({ transcript, maxPoints, userId }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Summarization error:', _error);
    res.status(500).json({ error: 'Failed to summarize transcript due to server error' });
  }
}

export async function getUserDashboard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    console.log('Getting dashboard for user:', userId);

    const response = await fetch(`${API_BASE_URL}/learnsphere/dashboard?userId=${userId}`, {
      method: 'GET',
      headers: { 
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Dashboard retrieval error:', _error);
    res.status(500).json({ error: 'Failed to get dashboard data due to server error' });
  }
}

export async function getTopicMastery(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, subject } = req.query;
    console.log('Fetching topic mastery for:', { userId, subject });

    const response = await fetch(`${API_BASE_URL}/learnsphere/mastery?userId=${userId}&subject=${subject}`, {
      method: 'GET',
      headers: { 
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Topic mastery retrieval error:', _error);
    res.status(500).json({ error: 'Failed to get topic mastery data due to server error' });
  }
}

export async function getRecommendations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    console.log('Getting recommendations for user:', userId);

    const response = await fetch(`${API_BASE_URL}/learnsphere/recommendations?userId=${userId}`, {
      method: 'GET',
      headers: { 
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (_error) {
    console.error('Recommendations retrieval error:', _error);
    res.status(500).json({ error: 'Failed to get recommendations due to server error' });
  }
}

