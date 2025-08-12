import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// Reusable, exportable navbar component
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6" aria-label="Main navigation">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3" aria-label="StudySync Home">
          <span className="bg-blue-600 text-white p-2 rounded-lg inline-flex">
            <Image src="/logo.svg" alt="StudySync logo" width={24} height={24} priority />
          </span>
          <span className="text-xl font-bold">StudySync</span>
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
        <Link href="#howitworks" className="hover:text-blue-600 transition-colors">How It Works</Link>
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </Link>
      </div>
    </nav>
  );
}