'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

interface UserData {
  email: string;
  userId?: string | number;
  name: string;
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('signup') === 'true') {
      setIsLogin(false);
    }
  }, [searchParams]);

  const saveAuthData = (token: string, userData: UserData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    if (rememberMe) {
      localStorage.setItem('authExpiration', (Date.now() + 30 * 24 * 60 * 60 * 1000).toString());
    } else {
      localStorage.setItem('authExpiration', (Date.now() + 24 * 60 * 60 * 1000).toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isLogin) {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _email: email, _password: password }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (data.token) {
            saveAuthData(data.token, {
              email,
              userId: data.userId || undefined,
              name: data.name || email.split('@')[0]
            });
          }
          
          router.push('/');
        } else {
          setErrorMessage(data.message || 'Login failed');
        }
      } else {
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        const response = await fetch('http://localhost:3001/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _email: email, _password: password }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (data.token) {
            saveAuthData(data.token, {
              email,
              userId: data.userId || undefined,
              name: data.name || email.split('@')[0]
            });
          }
          
          router.push('/dashboard');
        } else {
          setErrorMessage(data.message || 'Signup failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrorMessage(isLogin ? 'Login failed' : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
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
          
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}

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
              )}
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
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