# StudySync API Documentation

This document provides comprehensive information about the StudySync API endpoints, request formats, and response structures.

## Table of Contents
- [Authentication](#authentication)
- [EduBot](#edubot)
- [SmartNotes](#smartnotes)
- [LearnSphere](#learnsphere)

## Base URL

All API requests should be prefixed with:
```
https://api.studysync.com/v1
```

## Authentication

### Login
Authenticates a user and returns a session token.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt-token-here",
    "userId": "user-123"
  }
  ```
- **Error Codes**:
  - `401`: Invalid credentials
  - `500`: Server error

### Signup
Creates a new user account.

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Account created successfully",
    "userId": "new-user-123"
  }
  ```
- **Error Codes**:
  - `400`: Invalid input or email already exists
  - `500`: Server error

## EduBot

### Chat with AI
Sends a question to the AI assistant and receives a response.

- **URL**: `/edubot/chat`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "prompt": "Explain quantum entanglement",
    "context": "I'm a physics student learning about quantum mechanics",
    "userId": "user-123"
  }
  ```
- **Response**:
  ```json
  {
    "response": "Quantum entanglement is a phenomenon where two particles become connected...",
    "sources": [
      "Introduction to Quantum Mechanics by David J. Griffiths",
      "https://example.com/quantum-physics"
    ]
  }
  ```
- **Error Codes**:
  - `400`: Invalid prompt
  - `500`: AI service error

### Generate Flashcards
Creates a set of AI-generated flashcards for studying.

- **URL**: `/edubot/flashcards`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "topic": "Cell Biology",
    "count": 10,
    "userId": "user-123"
  }
  ```
- **Response**:
  ```json
  {
    "flashcards": [
      {
        "question": "What is the function of the mitochondria?",
        "answer": "Mitochondria are the powerhouse of the cell, responsible for producing ATP through cellular respiration."
      },
      {
        "question": "What is the difference between prokaryotic and eukaryotic cells?",
        "answer": "Prokaryotic cells lack membrane-bound organelles including a nucleus, while eukaryotic cells have membrane-bound organelles and a nucleus."
      }
    ]
  }
  ```
- **Error Codes**:
  - `400`: Invalid topic or parameters
  - `500`: AI service error

### Generate Quiz
Creates an AI-generated quiz on a specific topic.

- **URL**: `/edubot/quiz`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "topic": "World War II",
    "difficulty": "medium",
    "questionCount": 5,
    "userId": "user-123"
  }
  ```
- **Response**:
  ```json
  {
    "quiz": {
      "id": "quiz-123",
      "questions": [
        {
          "id": "q1",
          "text": "In what year did World War II begin?",
          "options": ["1939", "1940", "1941", "1942"],
          "correctAnswer": 0
        },
        {
          "id": "q2",
          "text": "Who was the Prime Minister of the United Kingdom during most of World War II?",
          "options": ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"],
          "correctAnswer": 1
        }
      ]
    }
  }
  ```
- **Error Codes**:
  - `400`: Invalid parameters
  - `500`: AI service error

## SmartNotes

### Upload Audio
Uploads an audio file for transcription and summarization.

- **URL**: `/smartnotes/audio`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**: Form data with audio file
- **Response**:
  ```json
  {
    "success": true,
    "fileId": "audio-123",
    "message": "Audio file uploaded successfully"
  }
  ```
- **Error Codes**:
  - `400`: Invalid file format or size
  - `500`: Upload error

### Start Recording
Initiates a real-time recording session.

- **URL**: `/smartnotes/recording/start`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "userId": "user-123",
    "sessionName": "Physics Lecture 5"
  }
  ```
- **Response**:
  ```json
  {
    "sessionId": "recording-123",
    "websocketUrl": "wss://api.studysync.com/recordings/socket"
  }
  ```
- **Error Codes**:
  - `500`: Session creation error

### Transcribe Audio
Transcribes an uploaded audio file.

- **URL**: `/smartnotes/transcribe`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "fileId": "audio-123",
    "language": "en"
  }
  ```
- **Response**:
  ```json
  {
    "transcript": "This is a sample transcript of the recorded lecture...",
    "confidence": 0.95,
    "durationSeconds": 300
  }
  ```
- **Error Codes**:
  - `400`: Invalid file ID
  - `500`: Transcription error

### Summarize Transcript
Generates a summary of a transcript.

- **URL**: `/smartnotes/summarize`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "transcript": "Full transcript text here...",
    "maxPoints": 5
  }
  ```
- **Response**:
  ```json
  {
    "summary": "This is a concise summary of the lecture content.",
    "keyPoints": [
      "Key point 1 about the main topic",
      "Key point 2 about a related concept"
    ],
    "topics": ["Physics", "Quantum Mechanics"]
  }
  ```
- **Error Codes**:
  - `400`: Invalid transcript
  - `500`: Summarization error

## LearnSphere

### Get User Dashboard
Retrieves a user's learning dashboard data.

- **URL**: `/learnsphere/dashboard`
- **Method**: `GET`
- **Authentication**: Required
- **Query Parameters**:
  - `userId`: User ID
- **Response**:
  ```json
  {
    "learningStreak": 7,
    "topicsStudied": 12,
    "quizzesTaken": 5,
    "averageScore": 85,
    "weakTopics": ["Organic Chemistry", "Calculus"],
    "strongTopics": ["Physics", "Statistics"]
  }
  ```
- **Error Codes**:
  - `400`: Invalid user ID
  - `500`: Data retrieval error

### Get Topic Mastery
Retrieves a user's mastery level for topics within a subject.

- **URL**: `/learnsphere/mastery`
- **Method**: `GET`
- **Authentication**: Required
- **Query Parameters**:
  - `userId`: User ID
  - `subject`: Subject name
- **Response**:
  ```json
  {
    "subject": "Mathematics",
    "topics": [
      {
        "name": "Calculus",
        "masteryLevel": 0.85,
        "quizCount": 3
      },
      {
        "name": "Linear Algebra",
        "masteryLevel": 0.65,
        "quizCount": 2
      }
    ]
  }
  ```
- **Error Codes**:
  - `400`: Invalid parameters
  - `500`: Data retrieval error

### Get Recommendations
Retrieves personalized learning recommendations for a user.

- **URL**: `/learnsphere/recommendations`
- **Method**: `GET`
- **Authentication**: Required
- **Query Parameters**:
  - `userId`: User ID
- **Response**:
  ```json
  {
    "recommendedTopics": [
      {
        "topic": "Organic Chemistry",
        "reason": "Low mastery level"
      },
      {
        "topic": "Calculus",
        "reason": "Not practiced recently"
      }
    ],
    "recommendedResources": [
      {
        "type": "video",
        "title": "Understanding Orbitals",
        "url": "https://example.com/video1"
      },
      {
        "type": "quiz",
        "title": "Derivatives Practice",
        "id": "quiz-456"
      }
    ]
  }
  ```
- **Error Codes**:
  - `400`: Invalid user ID
  - `500`: Recommendation generation error

## Error Handling

All API endpoints follow a consistent error format:

```json
{
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "details": {} // Optional additional details
}
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```
