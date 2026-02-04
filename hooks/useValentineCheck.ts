import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useValentineCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const valentineAccepted = localStorage.getItem('valentineAccepted');
    
    // If on homepage and hasn't accepted, redirect to valentine page
    if (!valentineAccepted && typeof window !== 'undefined' && window.location.pathname === '/') {
      router.push('/valentine');
    }
  }, [router]);
};
