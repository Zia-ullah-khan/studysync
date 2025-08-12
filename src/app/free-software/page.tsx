'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Philosophy on Accessibility & Subscription</h1>
          
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              StudySync was created by Zia Ullah Khan with a core belief: essential educational tools should be accessible to everyone, regardless of their financial situation. We are committed to removing barriers to learning and empowering students and learners everywhere.
            </p>
            <p>
              While our goal has always been to keep StudySync free, the increasing costs of running and maintaining the platform—especially with advanced features like AI analysis—have made it unsustainable to continue offering all features at no cost.
            </p>
            <p>
              To ensure StudySync remains available and continues to improve, we are introducing a subscription model. This will help cover server, maintenance, and development costs, while still prioritizing accessibility.
            </p>

            <h2 className="text-xl font-semibold pt-4 text-gray-800 dark:text-gray-200">Subscription Tiers</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Basic</strong>: <span className="font-semibold">$5/month</span> – Access to core features.
              </li>
              <li>
                <strong>Enhanced</strong>: <span className="font-semibold">$10/month</span> – Includes all basic features plus enhanced tools and integrations.
              </li>
              <li>
                <strong>Full</strong>: <span className="font-semibold">$15/month</span> – Unlocks all features, including advanced AI-powered analysis and premium support.
              </li>
            </ul>
            <p>
              These subscriptions allow us to sustainably fund the platform and continue developing new features for everyone.
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-lg mt-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Can&apos;t Afford a Subscription?</h2>
              <p>
                We understand that not everyone can afford a subscription. If you are a student or user who cannot pay for StudySync, please reach out to us at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">khansokan1234@gmail.com</a>. We are committed to ensuring that financial barriers do not prevent anyone from accessing essential study tools, and we will provide free access to those in need.
              </p>
              <p className="mt-3">
                Your support—whether through a subscription, feedback, or simply using StudySync—helps us keep the platform running and improving for everyone.
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
      <Footer />
    </div>
  );
}
