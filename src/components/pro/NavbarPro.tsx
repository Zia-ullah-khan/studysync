'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// A redesigned premium navbar with glassmorphism and subtle animated underline
export default function NavbarPro() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://studysyncapi.rfas.software';

  useEffect(() => {
    try {
      const lsKeys = ['studysync_token', 'authToken', 'token'];
      const hasLS = lsKeys.some((k) => typeof window !== 'undefined' && !!localStorage.getItem(k));
      const cookies = typeof document !== 'undefined' ? document.cookie : '';
      const hasCookie = /auth|token/i.test(cookies);
      setIsAuthed(hasLS || hasCookie);
    } catch {
      setIsAuthed(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      ['studysync_token', 'authToken', 'token', 'user'].forEach((k) => localStorage.removeItem(k));
    } catch {}
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    } catch {}
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/40 bg-white/70 dark:bg-gray-950/30 border-b border-gray-200/60 dark:border-gray-800/60">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-3" aria-label="StudySync Home">
          <span className="relative">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/30 to-violet-600/30 blur-lg" aria-hidden />
            <span className="relative bg-blue-600 text-white p-2 rounded-xl inline-flex shadow-sm">
              <Image src="/logo.svg" alt="StudySync logo" width={20} height={20} priority />
            </span>
          </span>
          <span className="text-lg font-bold tracking-tight">StudySync</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {isAuthed &&
            [
              { href: '#features', label: 'Features' },
              { href: '#howitworks', label: 'How It Works' },
              { href: '/free-software', label: 'Philosophy' },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="relative py-1 hover:text-blue-600 transition-colors">
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!isAuthed ? (
            <>
              <Link href="/login" className="btn-animate inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800/60">
                Log in
              </Link>
              <Link href="/signup" className="btn-animate inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow shadow-blue-600/20 hover:bg-blue-700">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link href="/edubot" className="btn-animate inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800/60">EduBot</Link>
              <Link href="/smartnotes" className="btn-animate inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800/60">Smart Notes</Link>
              <Link href="/voicebot" className="btn-animate inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800/60">Voice Bot</Link>
              <Link href="/learnsphere" className="btn-animate inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800/60">LearnSphere</Link>
              <button onClick={handleLogout} className="btn-animate inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white hover:bg-rose-700">
                Log out
              </button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Link href="#menu" className="inline-flex p-2 rounded-lg border border-gray-200 dark:border-gray-800">
            <span className="sr-only">Open menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
