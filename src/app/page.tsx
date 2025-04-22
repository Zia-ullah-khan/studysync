import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">StudySync</span>
        </div>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#howitworks" className="hover:text-blue-600 transition-colors">How It Works</a>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-6">Your Ultimate Study Companion</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          StudySync combines AI-powered chat, lecture transcription, and personalized learning insights to help you study smarter, not harder.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
          <a href="#demo" className="border border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Watch Demo
          </a>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Three Powerful Tools, One Platform</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">EduBot</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your AI chat companion that answers questions, creates flashcards, and quizzes you on material from your notes.
            </p>
            <Link href="/edubot" className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline">
              Try EduBot
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">SmartNotes</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Upload or record lectures to get instant AI-powered transcriptions, summaries, and key concepts.
            </p>
            <Link href="/smartnotes" className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1 hover:underline">
              Try SmartNotes
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                <path d="M12 20v-6"></path>
                <path d="M6 20V10"></path>
                <path d="M18 20V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">LearnSphere</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Visualize your learning journey with a personalized dashboard showing strengths, weaknesses, and topic mastery.
            </p>
            <Link href="/learnsphere" className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1 hover:underline">
              Try LearnSphere
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="howitworks" className="max-w-6xl mx-auto px-6 py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12">Seamless Integration</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Record Your Lectures</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use SmartNotes to transcribe and summarize your lectures automatically.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Chat with EduBot</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ask questions about your lectures or request quizzes to test your knowledge.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">
              LearnSphere visualizes your knowledge gaps and suggests focus areas.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4">Everything Works Together</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            StudySync&apos;s true power comes from how the modules share information. Your lecture notes inform your AI tutor, 
            and both feed into your personalized dashboard to show exactly where you need to focus next.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              &quot;StudySync helped me raise my GPA from 3.2 to 3.8 in just one semester! The way everything connects makes studying so much more efficient.&quot;
              <span className="block mt-2 font-medium">— Jane D., Computer Science Student</span>
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Study Habits?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of students already using StudySync to achieve better grades with less stress.
        </p>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="text-xl font-bold">StudySync</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} StudySync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
