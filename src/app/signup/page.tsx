'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/login?signup=true');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to signup...</p>
    </div>
  );
}
