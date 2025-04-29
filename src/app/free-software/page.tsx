'use client';

import Link from 'next/link';

export default function FreeSoftwarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">StudySync</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Philosophy on Free Software</h1>
          
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              StudySync was created by Zia Ullah Khan with a core belief: essential educational tools should be accessible to everyone, regardless of their financial situation. We believe that software, especially software aimed at learning and productivity, should be open and free for all users.
            </p>
            <p>
              That's why StudySync is offered completely free of charge. We want to empower students and learners everywhere without adding financial barriers.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Supporting StudySync</h2>
              <p>
                While StudySync is free to use, running the servers and maintaining the infrastructure incurs significant costs. Features like AI analysis and real-time collaboration require substantial resources.
              </p>
              <p className="mt-2">
                If you find StudySync valuable and wish to support its continued development and availability, any donations or contributions are highly appreciated. Your support helps us cover server costs and dedicate more time to improving the platform.
              </p>
              <p className="mt-3">
                Thank you for being part of the StudySync community!
              </p>
            </div>
            <p className="text-center mt-6">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                &larr; Back to Home
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StudySync. All rights reserved.
      </footer>
    </div>
  );
}
