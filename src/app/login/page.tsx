'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [Auth2, setAuth2] = useState<boolean | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (searchParams.get('auth2')) {
      setAuth2(searchParams.get('auth2') === 'true');
      //login?auth2=true&redirect=test
      setRedirectUrl(searchParams.get('redirect') || null);
    }
  }, [searchParams]);

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
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('hasPaid', String(data.user?.hasPaid ?? data.hasPaid));
            localStorage.setItem('subscriptionTier', data.user?.subscriptionTier || data.subscriptionTier || '');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loginEmail', email);
            if (data.googleCalander && data.googleCalander.accessToken) {
              localStorage.setItem('googleCalanderAccessToken', data.googleCalander.accessToken);
              localStorage.setItem('googleCalanderExpiresAt', data.googleCalander.expiresAt);
            }
            if (data.token) {
              localStorage.setItem('authToken', data.token);
            }
          }
          console.log('Login successful:', data);
          if (data.token) {
            saveAuthData(data.token, {
              email,
              userId: data.userId || data.user?._id || undefined,
              name: data.name || data.user?.name || email.split('@')[0]
            });
          }
          if (redirectUrl && Auth2) {
            const redirect = new URL(redirectUrl, window.location.origin);
            redirect.searchParams.set('token', data.token);
            router.push(redirect.toString());
            console.log('Redirecting to:', redirect.toString(), "with token:", data.token );
          } else{
            router.push('/');
          }
          
        } else {
          setErrorMessage(data.message || 'Login failed');
        }
      } else {
        if (!agreedToTerms) {
          setErrorMessage('You must agree to the Terms of Service and Privacy Policy to sign up.');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
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
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-sm dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-300">
            Good News! StudySync will now have 24/7 uptime with instant response times from our API. This means you can rely on StudySync for all your study needs without interruptions.
          </div>
          {/* Add auth2 name display if available */}
          {Auth2 && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded-md text-sm dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-300">
              Auth2 by: {Auth2}!
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
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
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                    required
                  />
                </div>
              )}
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

              {!isLogin && (
                <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="mb-2">
                    At StudySync, your privacy and trust are our top priorities.
                    We protect your personal data following GDPR and CCPA standards, and we never sell your information.
                  </p>
                  <p>
                    By using StudySync, you agree to our Terms of Service, which emphasize academic integrity, responsible AI use, and user control over their data.
                    For full details, please review our complete <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link> and <Link href="/tos" className="text-blue-600 dark:text-blue-400 underline">Terms of Service</Link>.
                  </p>
                  <div className="flex items-center mt-4">
                    <input
                      id="agree-terms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={() => setAgreedToTerms(!agreedToTerms)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      I have read and agree to the Terms of Service and Privacy Policy.
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium ${(!isLogin && !agreedToTerms) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading || (!isLogin && !agreedToTerms)}
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
        </div>
      </main>
      <Footer />
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