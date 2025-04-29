'use client';

import Link from 'next/link';

export default function PhilosophyPage() {
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

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Philosophy on Accessibility & API Access</h1>
          
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              StudySync was created by Zia Ullah Khan with a core belief: essential educational tools should be accessible to everyone, regardless of their financial situation. We are committed to removing barriers to learning and empowering students and learners everywhere.
            </p>
            <p>
              That&apos;s why the StudySync application is offered completely free to use. Our goal is to provide powerful study tools without adding financial hurdles. While the application is free, the source code is proprietary and not open source.
            </p>

            <h2 className="text-xl font-semibold pt-4 text-gray-800 dark:text-gray-200">API Access for Developers</h2>
            <p>
              To further extend the capabilities of StudySync, we are making our backend API available for developers. While the StudySync application remains free for all users, access to the API is provided as a paid service.
            </p>
            <p>
              Our API enables developers to leverage core StudySync features, such as AI-powered analysis, transcription services, and potentially note integration, allowing for seamless connections with external platforms or the creation of custom study tools. Whether you&apos;re building educational apps or integrating specific features, our API provides a robust foundation.
            </p>
            <p>
              This model allows us to keep the main application free for students while sustainably funding the platform&apos;s infrastructure and development, including the resources required for reliable API operation. More details on API access, features, and pricing will be available soon.
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-lg mt-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Supporting StudySync</h2>
              <p>
                Running StudySync, especially features like AI analysis, incurs significant server and maintenance costs. While the app is free, your support helps us keep it that way and continue improving it.
              </p>
              <p className="mt-2">
                If you find StudySync valuable, contributions are highly appreciated. Your support directly funds server costs, maintenance, and the development of new features, ensuring StudySync remains a powerful and accessible tool for everyone.
              </p>
              <p className="mt-3">
                Donation information will be available soon. In the meantime, if you&apos;re interested in contributing or have questions, please feel free to reach out to us at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">khansokan1234@gmail.com</a>.
              </p>
              <p className="mt-3">
                Even without donating, we value your feedback, suggestions, and simply using StudySync. Thank you for being part of our community!
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
