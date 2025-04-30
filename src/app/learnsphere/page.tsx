'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SubjectProgress {
  subject: string;
  progress: number;
}

interface Recommendation {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
}

interface ApiRecommendation {
  id?: number;
  title?: string;
  topic?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface DashboardData {
  learningStreak: number;
  topicsStudied: number;
  quizzesTaken: number;
  averageScore: number;
  weakTopics: string[];
  strongTopics: string[];
  progressBySubject: SubjectProgress[];
  recommendations: Recommendation[];
}

export default function LearnSphere() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login?redirect=learnsphere');
    }
    const expiration = localStorage.getItem('authExpiration');
    if (expiration && parseInt(expiration) < Date.now()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('authExpiration');
      router.push('/login?redirect=learnsphere');
    }
  }, [router]);

  useEffect(() => {
    const fetchDashboard = async (): Promise<void> => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      const userId = userData ? JSON.parse(userData).userId : null;
      if (!token || !userId) return;
      try {
        const recRes = await fetch(
          `${process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001'
            : 'https://studysyncapi.onrender.com'
          }/learnsphere/recommendations?userId=${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const recData = await recRes.json();
        console.log('Recommendations API response:', recData);
        setDashboardData({
          learningStreak: 7,
          topicsStudied: 12,
          quizzesTaken: 5,
          averageScore: 85,
          weakTopics: ["Organic Chemistry", "Calculus"],
          strongTopics: ["Physics", "Statistics"],
          progressBySubject: [
            { subject: "Math", progress: 65 },
            { subject: "Science", progress: 82 },
            { subject: "History", progress: 45 },
            { subject: "Language", progress: 78 },
            ...(Array.isArray(recData.progressBySubject) ? recData.progressBySubject : [])
          ],
          recommendations: Array.isArray(recData.recommendations)
            ? recData.recommendations.map((t: ApiRecommendation, i: number) => ({
                id: t.id ?? i + 1,
                title: t.title ?? t.topic ?? 'Untitled',
                priority: t.priority ?? 'medium'
              }))
            : Array.isArray(recData.recommendedTopics)
              ? recData.recommendedTopics.map((t: ApiRecommendation, i: number) => ({
                  id: i + 1,
                  title: t.topic ?? t.title ?? 'Untitled',
                  priority: t.priority ?? 'medium'
                }))
              : []
        });
      } catch {
        setDashboardData({
          learningStreak: 7,
          topicsStudied: 12,
          quizzesTaken: 5,
          averageScore: 85,
          weakTopics: ["Organic Chemistry", "Calculus"],
          strongTopics: ["Physics", "Statistics"],
          progressBySubject: [
            { subject: "Math", progress: 65 },
            { subject: "Science", progress: 82 },
            { subject: "History", progress: 45 },
            { subject: "Language", progress: 78 }
          ],
          recommendations: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    if (!dashboardData || loading) return;

    const animateCounter = (key: string, target: number, duration: number): void => {
      let startTime: number | undefined;
      const element = document.getElementById(`counter-${key}`);
      if (!element) return;

      const updateCounter = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        const value = Math.floor(percentage * target);
        element.textContent = value.toString();
        
        if (percentage < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    setTimeout(() => animateCounter('streak', dashboardData.learningStreak, 1000), 200);
    setTimeout(() => animateCounter('topics', dashboardData.topicsStudied, 1500), 400);
    setTimeout(() => animateCounter('quizzes', dashboardData.quizzesTaken, 1000), 600);
    setTimeout(() => animateCounter('score', dashboardData.averageScore, 2000), 800);
  }, [dashboardData, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            </div>
            <span className="text-xl font-bold">StudySync</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/smartnotes" className="hover:text-blue-600 transition-colors">SmartNotes</Link>
            <Link href="/edubot" className="hover:text-blue-600 transition-colors">EduBot</Link>
            <Link href="/learnsphere" className="text-blue-600 font-medium">LearnSphere</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="text-sm hover:underline">
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">LearnSphere Dashboard</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Visualize your learning journey, track your progress, and get personalized study recommendations.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-blue-400 h-12 w-12 mb-4 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <span className="text-blue-600 dark:text-blue-400">Loading your personalized dashboard...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transform transition-all duration-300 hover:scale-105">
              <div className="text-blue-500 dark:text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="font-bold text-2xl mb-1">
                <span id="counter-streak">0</span> Days
              </div>
              <div className="text-gray-500 dark:text-gray-400">Learning Streak</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transform transition-all duration-300 hover:scale-105">
              <div className="text-green-500 dark:text-green-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="font-bold text-2xl mb-1">
                <span id="counter-topics">0</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Topics Studied</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transform transition-all duration-300 hover:scale-105">
              <div className="text-purple-500 dark:text-purple-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="font-bold text-2xl mb-1">
                <span id="counter-quizzes">0</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Quizzes Taken</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transform transition-all duration-300 hover:scale-105">
              <div className="text-yellow-500 dark:text-yellow-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="font-bold text-2xl mb-1">
                <span id="counter-score">0</span>%
              </div>
              <div className="text-gray-500 dark:text-gray-400">Average Score</div>
            </div>

            <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg mb-4">Progress by Subject</h3>
              <div className="space-y-4">
                {dashboardData?.progressBySubject.map((subject: SubjectProgress) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{subject.subject}</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          subject.progress > 80 ? 'bg-green-500' : 
                          subject.progress > 60 ? 'bg-blue-500' : 
                          subject.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${subject.progress}%`, 
                          transition: 'width 1.5s ease-in-out'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg mb-4">Strengths & Weaknesses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-500 dark:text-green-400 mb-2">Strong Topics</h4>
                  <ul className="space-y-2">
                    {dashboardData?.strongTopics.map((topic: string) => (
                      <li 
                        key={topic} 
                        className="flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-500 dark:text-red-400 mb-2">Weak Topics</h4>
                  <ul className="space-y-2">
                    {dashboardData?.weakTopics.map((topic: string) => (
                      <li 
                        key={topic} 
                        className="flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg mb-4">Personalized Recommendations</h3>
              {dashboardData?.recommendations && dashboardData.recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dashboardData.recommendations.map((rec: Recommendation) => (
                    <div 
                      key={rec.id}
                      className={`p-4 rounded-lg border ${
                        rec.priority === 'high' ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20' :
                        rec.priority === 'medium' ? 'border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20' :
                        'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20'
                      } transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${
                          rec.priority === 'high' ? 'text-red-500 dark:text-red-400' :
                          rec.priority === 'medium' ? 'text-yellow-500 dark:text-yellow-400' :
                          'text-blue-500 dark:text-blue-400'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {rec.title}
                          </h4>
                          <div className="mt-2">
                            <button className={`text-xs py-1 px-3 rounded-full ${
                              rec.priority === 'high' ? 'bg-red-100 dark:bg-red-800/40 text-red-700 dark:text-red-200' :
                              rec.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-800/40 text-yellow-700 dark:text-yellow-200' :
                              'bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-200'
                            }`}>
                              Start Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No recommendations available at this time.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} StudySync. All rights reserved.
        </div>
      </footer>
    </div>
  );
}