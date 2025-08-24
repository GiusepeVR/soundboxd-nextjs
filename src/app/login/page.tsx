'use client';

import { Button } from '@/components';

export default function LoginPage() {
  const handleSpotifyLogin = () => {
    window.location.href = '/api/auth/spotify/login';
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5'>
      <div className='max-w-md w-full mx-4'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Welcome Back
            </h1>
            <p className='text-gray-600'>
              Connect your Spotify account to get started
            </p>
          </div>

          <Button
            variant='primary'
            size='lg'
            className='w-full'
            onClick={handleSpotifyLogin}
          >
            Continue with Spotify
          </Button>

          <p className='text-xs text-gray-500 text-center mt-6'>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
