"use client";

import { useState } from "react";
import SplitText from "@/components/TextAnimations/SplitText/SplitText";

export default function NewHomePage() {
  const [showSecondText, setShowSecondText] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleFirstAnimationComplete = () => {
    console.log('First animation complete!');
    setTimeout(() => {
      setShowSecondText(true);
    }, 500);
  };

  const handleSecondAnimationComplete = () => {
    console.log('Second animation complete!');
    setTimeout(() => {
      setAnimationsComplete(true);
      setTimeout(() => {
        setShowMainContent(true);
      }, 1000);
    }, 800);
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className={`fixed inset-0 w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center z-10 transition-all duration-2000 ease-in-out ${showMainContent ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className={`transition-all duration-1000 ease-in-out ${showSecondText ? '-translate-y-32 opacity-30 scale-75' : 'translate-y-0 opacity-100 scale-100'}`}>
          <SplitText
            text="Hello There!"
            className="text-3xl font-semibold text-center w-full text-gray-700"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleFirstAnimationComplete}
          />
        </div>

        {showSecondText && (
          <div className="transition-all duration-1000 ease-in-out">
            <SplitText
              text="Welcome to StudySync!"
              className="text-5xl font-bold text-center w-full text-gray-800"
              delay={80}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleSecondAnimationComplete}
            />
          </div>
        )}

        {animationsComplete && !showMainContent && (
          <div className="absolute bottom-8 animate-bounce">
            <div className="flex flex-col items-center space-y-2 text-gray-500">
              <span className="text-sm">Loading your experience...</span>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
      </div>

      <div className={`relative z-20 transition-all duration-2000 ease-in-out ${showMainContent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <nav className="w-full p-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-800">StudySync</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </nav>
        </div>
        <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <SplitText
              text="Your AI-Powered Learning Companion"
              className="text-3xl md:text-4xl text-gray-700 font-bold"
              delay={60}
              duration={0.7}
              ease="power2.out"
              splitType="words"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
            />

            <div className="animate-fade-in-up-delay">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Study smarter, not harder with three intelligent modules: AI chatbot, live transcription, 
                and personalized learning dashboard.
              </p>
            </div>

            <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                Start Learning
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Learning Tools</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our three core modules designed to revolutionize your learning experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-3xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">EduBot</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  AI chatbot for instant Q&A, flashcard generation, and interactive quizzes
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Instant answers to your questions</li>
                  <li>• Auto-generated flashcards</li>
                  <li>• Interactive quiz creation</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up-delay">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-3xl">✍️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">SmartNotes</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Live lecture transcription and AI-powered summarization with topic tagging
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Real-time transcription</li>
                  <li>• AI-powered summaries</li>
                  <li>• Smart topic tagging</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border border-purple-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up-delay-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-3xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">LearnSphere</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Personalized dashboard with learning analytics and smart recommendations
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Learning analytics</li>
                  <li>• Progress tracking</li>
                  <li>• Smart recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center px-6 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already studying smarter with StudySync
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105">
              Get Started Free
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}