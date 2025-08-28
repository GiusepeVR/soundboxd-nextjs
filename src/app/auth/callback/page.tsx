'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import spotifyAuth from '@/utils/spotify';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);

        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          setError('Authorization was denied');
          setIsLoading(false);
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setIsLoading(false);
          return;
        }

        const tokenData = await spotifyAuth.exchangeCodeForToken(code);

        localStorage.setItem('spotify_access_token', tokenData.access_token);
        localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        localStorage.setItem(
          'spotify_expires_at',
          (Date.now() + tokenData.expires_in * 1000).toString()
        );

        router.push('/dashboard');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Failed to complete authentication');
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router]);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-white'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4'></div>
          <h2 className='text-xl text-gray-700 font-semibold mb-2'>
            Connecting to Spotify...
          </h2>
          <p className='text-gray-600'>
            Please wait while we complete your authentication
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-white'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <h2 className='text-xl text-gray-700 font-semibold mb-2'>
            Authentication Failed
          </h2>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button
            onClick={() => router.push('/login')}
            className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
