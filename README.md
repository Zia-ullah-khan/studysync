# 📚 StudySync – Your AI-Powered Learning Companion

StudySync is a unified educational platform designed to help students study smarter, not harder. It combines four intelligent modules into one seamless web app:

- 🧠 **EduBot** – AI chatbot for Q&A, flashcards, and quizzes
- ✍️ **SmartNotes** – Live lecture transcription & summarization
- 📊 **LearnSphere** – Personalized dashboard with study recommendations
- 🎨 **NoteSketch** – Digital canvas for handwritten notes and diagrams
- 🎤 **VoiceBot** – Real-time voice interaction with AI

Whether you're revising concepts, recording a lecture, tracking your progress, or sketching equations, StudySync empowers you with AI every step of the way.

---

## 🚀 Features

### 🧠 EduBot – AI Chat Interface
- Ask questions and get instant, AI-generated explanations
- Generate flashcards and quizzes from your queries
- Agent mode for advanced command-driven AI interactions
- Uses OpenAI/Gemini for natural language responses
- References uploaded content for contextual answers

### ✍️ SmartNotes – Live Transcription & Summarization
- Upload lecture audio or record in real-time
- AI generates full transcript + summarized bullet points
- Tags topics and suggests related resources
- Supports audio processing with FFmpeg

### 📊 LearnSphere – Personalized Dashboard
- Visualizes your learning trends and topic mastery
- Tracks interactions across EduBot and SmartNotes
- Recommends topics, quizzes, or videos based on your performance
- Progress tracking with streaks and analytics

### 🎨 NoteSketch – Digital Canvas
- Full-page handwriting surface for notes and diagrams
- Drawing tools with pen, eraser, and color options
- Pan and zoom functionality
- Save and manage your digital sketches

### 🎤 VoiceBot – Voice-Powered AI
- Real-time voice communication with AI
- WebSocket-based audio streaming
- Automatic speech-to-text transcription
- AI-powered voice responses with text-to-speech

---

## 🧱 Tech Stack

| Layer      | Tools                                      |
|------------|---------------------------------------------|
| **Frontend**   | Next.js 15, React 19, TypeScript, Tailwind CSS v4 |
| **Backend**    | External REST API + WebSocket support       |
| **AI / ML**    | OpenAI/Gemini APIs, AssemblyAI (transcription) |
| **Audio/Video**| FFmpeg, Web Audio API, MediaRecorder        |
| **UI/UX**      | Framer Motion, Anime.js, React Icons        |
| **Authentication** | Google OAuth 2.0                        |
| **Hosting**    | Vercel (frontend), External API service     |

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Clone the Repository
```bash
git clone https://github.com/Zia-ullah-khan/studysync.git
cd studysync
```

### Install Dependencies
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://studysyncapi.rfas.software
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
studysync/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── edubot/            # EduBot chat interface
│   │   ├── smartnotes/        # Audio transcription & notes
│   │   ├── learnsphere/       # Dashboard & analytics
│   │   ├── notesketch/        # Digital drawing canvas
│   │   ├── voicebot/          # Voice interaction
│   │   └── api/               # API route handlers
│   ├── components/            # Reusable React components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── TextAnimations/    # Animation components
│   └── types/                 # TypeScript type definitions
├── docs/                      # Documentation
├── public/                    # Static assets
└── package.json               # Dependencies & scripts
```

---

## 🔧 Key Dependencies

- **Next.js 15** - React framework with app router
- **React 19** - UI library with concurrent features
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **React Markdown** - Markdown rendering
- **FFmpeg** - Audio/video processing
- **Anime.js** - JavaScript animation library

---

## 🌟 Key Features Implemented

- **Responsive Design**: Mobile-first approach with dark mode support
- **Real-time Communication**: WebSocket integration for voice features
- **Authentication**: Google OAuth integration
- **Audio Processing**: Client-side audio recording and processing
- **Canvas Drawing**: HTML5 Canvas-based note sketching
- **Markdown Support**: Rich text rendering with syntax highlighting
- **Progressive Web App**: Modern web app capabilities

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- AssemblyAI for speech transcription
- Google for OAuth and API services
- The open-source community for amazing tools and libraries

---

*Built with ❤️ for students worldwide*
