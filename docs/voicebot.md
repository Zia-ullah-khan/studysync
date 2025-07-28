# Voicebot Feature Design Document

## Overview
The voicebot feature enables real-time audio communication between the frontend and backend. The frontend sends audio data to the backend via a WebSocket connection. The backend transcribes the audio using AssemblyAI, processes the transcribed text with OpenAI or another AI model, and converts the response back to speech using OpenAI's Text-to-Speech (TTS) feature. The generated audio is then sent back to the frontend for playback.

## Architecture
1. **Frontend**:
   - Establishes a WebSocket connection with the backend.
   - Captures audio data from the user's microphone.
   - Sends audio chunks to the backend.
   - Receives audio data from the backend and plays it automatically.

2. **Backend**:
   - Manages WebSocket connections.
   - Receives audio data from the frontend.
   - Transcribes audio using AssemblyAI.
   - Processes the transcribed text with OpenAI or another AI model.
   - Converts the AI model's response to speech using OpenAI's TTS.
   - Sends the generated audio back to the frontend.

## Required Routes

### WebSocket Endpoint
**Path**: `ws://localhost:3001/voicebot/socket`
- **Description**: Handles WebSocket connections for real-time audio communication.
- **Frontend Actions**:
  - Establish a WebSocket connection.
  - Send audio chunks to the backend.
  - Receive audio responses from the backend.
- **Backend Actions**:
  - Process incoming audio chunks.
  - Transcribe audio using AssemblyAI.
  - Process transcriptions with OpenAI or another AI model.
  - Convert AI responses to speech using OpenAI's TTS.
  - Send generated audio back to the frontend.

### REST API Endpoints

#### 1. **Initialize Session**
**Path**: `/voicebot/init`
- **Method**: `POST`
- **Description**: Initializes a new voicebot session.
- **Request Body**:
  ```json
  {
    "userId": "string",
    "authToken": "string"
  }
  ```
- **Response**:
  ```json
  {
    "sessionId": "string",
    "message": "Session initialized successfully."
  }
  ```

#### 2. **Stop Session**
**Path**: `/voicebot/stop`
- **Method**: `POST`
- **Description**: Stops an active voicebot session.
- **Request Body**:
  ```json
  {
    "sessionId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Session stopped successfully."
  }
  ```

## Backend Workflow
1. **WebSocket Connection**:
   - The backend listens for WebSocket connections on `/voicebot/socket`.
   - Upon connection, a session is initialized.

2. **Audio Processing**:
   - Audio chunks are received from the frontend.
   - The backend streams the audio to AssemblyAI for transcription.
   - The transcribed text is sent to OpenAI or another AI model for processing.
   - The AI model's response is converted to speech using OpenAI's TTS.
   - The generated audio is sent back to the frontend.

3. **Session Management**:
   - Sessions are initialized and terminated via REST API endpoints.
   - WebSocket connections are cleaned up when closed.

4. **Audio Playback**:
   - The backend will use the WebSocket to send the generated audio file (from TTS) to the frontend for playback.

## Frontend Workflow
1. **WebSocket Connection**:
   - Establish a WebSocket connection to `/voicebot/socket`.

2. **Audio Capture**:
   - Use the Web Audio API to capture audio from the user's microphone.
   - Send audio chunks to the backend via the WebSocket connection.

3. **Audio Playback**:
   - Receive audio data from the backend.
   - Play the audio using the Web Audio API.

## Dependencies
- **Backend**:
  - `ws` for WebSocket management.
  - `assemblyai` for transcription.
  - `openai` for AI processing and TTS.
  - `node-fetch` for HTTP requests.

- **Frontend**:
  - Web Audio API for audio capture and playback.
  - WebSocket API for real-time communication.

## Error Handling
- Handle WebSocket disconnections gracefully.
- Validate API keys for AssemblyAI and OpenAI.
- Provide meaningful error messages for failed transcriptions or TTS conversions.

## Future Enhancements
- Add support for multiple languages.
- Implement user authentication for secure sessions.
- Optimize audio streaming for low-latency communication.
