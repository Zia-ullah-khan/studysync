import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// A redesigned footer with multi-column links and gradient border
export default function FooterPro() {
  return (
    <footer className="relative mt-20 border-t border-transparent">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Image src="/logo.svg" alt="StudySync logo" width={20} height={20} />
              </div>
              <span className="text-lg font-bold">StudySync</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI chat, lecture transcription, and insights to help you study smarter.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/edubot" className="hover:text-blue-600">EduBot</Link></li>
              <li><Link href="/smartnotes" className="hover:text-blue-600">Smart Notes</Link></li>
              <li><Link href="/voicebot" className="hover:text-blue-600">Voice Bot</Link></li>
              <li><Link href="/learnsphere" className="hover:text-blue-600">LearnSphere</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/free-software" className="hover:text-blue-600">Philosophy</Link></li>
              <li><Link href="/subprocessors" className="hover:text-blue-600">Subprocessors</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/tos" className="hover:text-blue-600">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Get started</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-blue-600">Log in</Link></li>
              <li><Link href="/signup" className="hover:text-blue-600">Create account</Link></li>
              <li><Link href="/payment" className="hover:text-blue-600">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>© {new Date().getFullYear()} StudySync. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="https://x.com" className="hover:text-blue-600" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.5 1-1.5-1.6-4.3-1.4-5.6.4-1.1 1.4-.9 3.4.5 4.5-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.3 3.1 3.6-.6.2-1.2.2-1.8.1.5 1.5 1.9 2.5 3.5 2.5-1.3 1.1-3 1.7-4.7 1.7-.3 0-.6 0-.9-.1 1.8 1.1 3.9 1.7 6 1.7 7.2 0 11.2-6 11.2-11.2v-.5c.8-.6 1.4-1.2 1.9-2z" fill="currentColor"/></svg>
            </Link>
            <Link href="https://github.com" className="hover:text-blue-600" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.8.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.3 1 1.3 1 .8 1.4 2.1 1 2.6.7.1-.6.3-1 .6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.8 1 1.7 1 2.8 0 3.9-2.3 4.7-4.5 5 .4.3.7 1 .7 2.1v3.1c0 .3.2.6.7.5 4-1.4 6.9-5.3 6.9-9.8C22 6.6 17.5 2 12 2z" fill="currentColor"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
