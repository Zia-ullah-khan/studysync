'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (searchParams.get('signup') === 'true') {
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, confirmPassword, rememberMe, isLogin });
  };

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
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-full max-w-md">
          <div className="flex mb-8">
            <button 
              className={`flex-1 py-3 font-medium text-center border-b-2 ${isLogin ? 'border-blue-600 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button 
              className={`flex-1 py-3 font-medium text-center border-b-2 ${!isLogin ? 'border-blue-600 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-6">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1711 8.36788H17.5V8.33333H10V11.6667H14.6906C14.0533 13.6071 12.1844 15 10 15C7.23875 15 5 12.7613 5 10C5 7.23875 7.23875 5 10 5C11.2719 5 12.4363 5.48083 13.317 6.26275L15.6741 3.90563C14.1858 2.52275 12.195 1.66667 10 1.66667C5.3975 1.66667 1.66667 5.3975 1.66667 10C1.66667 14.6025 5.3975 18.3333 10 18.3333C14.6025 18.3333 18.3333 14.6025 18.3333 10C18.3333 9.44242 18.2758 8.89758 18.1711 8.36788Z" fill="#FFC107"/>
                <path d="M2.62964 6.12417L5.36964 8.11583C6.10547 6.31583 7.9028 5 10.0001 5C11.272 5 12.4364 5.48083 13.3172 6.26275L15.6743 3.90563C14.186 2.52275 12.1951 1.66667 10.0001 1.66667C6.8773 1.66667 4.21797 3.47417 2.62964 6.12417Z" fill="#FF3D00"/>
                <path d="M9.99999 18.3333C12.1525 18.3333 14.1092 17.5096 15.5859 16.17L13.0075 13.9875C12.1424 14.6452 11.0875 15 9.99999 15C7.8233 15 5.96082 13.6179 5.31666 11.6892L2.60249 13.785C4.17082 16.4817 6.85832 18.3333 9.99999 18.3333Z" fill="#4CAF50"/>
                <path d="M18.1711 8.36788H17.5V8.33333H10V11.6667H14.6906C14.3885 12.5908 13.8377 13.3971 13.1067 14L13.1075 13.9992L15.686 16.1817C15.5028 16.3492 18.3333 14.1667 18.3333 10C18.3333 9.44242 18.2758 8.89758 18.1711 8.36788Z" fill="#1976D2"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10C0 14.427 2.865 18.1675 6.84 19.4892C7.34 19.5817 7.5225 19.2733 7.5225 19.0058C7.5225 18.7633 7.515 18.1475 7.5125 17.3217C4.7275 17.9217 4.14 15.97 4.14 15.97C3.685 14.8108 3.0275 14.505 3.0275 14.505C2.12 13.8875 3.0975 13.9 3.0975 13.9C4.1025 13.9667 4.63 14.92 4.63 14.92C5.52 16.4392 6.97 16.0158 7.54 15.7575C7.6325 15.1175 7.89 14.6942 8.175 14.4283C5.955 14.16 3.62 13.3008 3.62 9.47417C3.62 8.38667 4.0075 7.49333 4.6475 6.79417C4.5375 6.5425 4.2025 5.52583 4.7475 4.14833C4.7475 4.14833 5.5875 3.87917 7.4875 5.1725C8.29 4.95 9.15 4.83833 10 4.83417C10.85 4.83833 11.7125 4.95 12.5125 5.1725C14.4125 3.87917 15.2525 4.14833 15.2525 4.14833C15.7975 5.52583 15.4625 6.5425 15.3525 6.79417C15.9975 7.49333 16.38 8.38667 16.38 9.47417C16.38 13.3108 14.04 14.1567 11.8125 14.4192C12.1725 14.745 12.5 15.3933 12.5 16.3892C12.5 17.8042 12.4875 18.6767 12.4875 19.0058C12.4875 19.275 12.67 19.5867 13.1775 19.4883C17.1375 18.165 20 14.4258 20 10C20 4.477 15.5225 0 10 0Z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                required
              />
            </div>
            
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  required
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              {isLogin && (
                <>
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)} 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StudySync. All rights reserved.
      </footer>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
