# StudySync – Your AI-Powered Learning Companion

StudySync is a unified educational platform designed to help students study smarter, not harder. It combines four intelligent modules into one seamless web app:

- **EduBot** – AI chatbot for Q\&A, flashcards, and quizzes  
- **SmartNotes** – Live lecture transcription & summarization  
- **LearnSphere** – Personalized dashboard with study recommendations  
- **NoteSketch/NoteCanvas** – Upload and write handwritten notes, live\!

Whether you're revising concepts, recording a lecture, tracking your progress, or sketching math equations, StudySync empowers you with AI every step of the way.

---

## Features

### EduBot – AI Chat Interface

- Ask questions and get instant, AI-generated explanations  
- Generate flashcards and quizzes from your queries  
- Uses OpenAI/Gemini for natural language responses  
- References lecture notes and handwritten content for deeper answers

### SmartNotes – Live Transcription & Summarization

- Upload lecture audio or record in real-time  
- AI generates full transcript \+ summarized bullet points  
- Tags topics and suggests related resources  
- Supports integration with handwritten content and EduBot

### LearnSphere – Personalized Dashboard

- Visualizes your learning trends and topic mastery  
- Tracks interactions across EduBot, SmartNotes, and NoteSketch  
- Recommends topics, quizzes, or videos based on your performance

### NoteSketch & NoteCanvas – Handwritten Notes Integration

- Upload scanned handwritten notes or take photos (NoteSketch)  
- Use a full-page handwriting surface to write or draw directly in the app (NoteCanvas)  
- Convert handwriting to text using OCR (Tesseract.js or Google Vision API)  
- Summarize or extract flashcards from handwriting using AI  
- Share to SmartNotes or trigger quiz generation in EduBot

---

## Tech Stack

| Layer | Tools |
| :---- | :---- |
| Frontend | React, Tailwind CSS, Canvas libs (Fabric.js/Konva) |
| Backend | Flask (REST API \+ WebSocket support) |
| AI / ML | OpenAI / Gemini APIs, Whisper, Tesseract.js, TFLite |
| Database | Firebase / PostgreSQL |
| Hosting | Netlify (frontend), Render / Vercel (backend) |

---
