'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//import spotifyAuth from '@/utils/spotify';

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  country: string;
  product: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('spotify_access_token');
      const userData = localStorage.getItem('spotify_user');

      if (!accessToken || !userData) {
        router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(userData);
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_user');
    localStorage.removeItem('spotify_expires_at');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen bg-white'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600'></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-screen bg-white'>
      <nav className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <h1 className='text-xl font-semibold text-gray-900'>Soundboxd</h1>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-gray-700'>
                  {user.display_name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className='text-sm text-gray-600 hover:text-gray-900'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Welcome back, {user.display_name}! 🎵
          </h2>
          <p className='text-lg text-gray-600'>
            Your Spotify account is now connected to Soundboxd
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Your Library
            </h3>
            <p className='text-gray-600 mb-4'>
              Access your saved songs and albums
            </p>
            <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors'>
              View Library
            </button>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Playlists
            </h3>
            <p className='text-gray-600 mb-4'>Manage and discover playlists</p>
            <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors'>
              Browse Playlists
            </button>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Recently Played
            </h3>
            <p className='text-gray-600 mb-4'>
              See what you&apos;ve been listening to
            </p>
            <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors'>
              View History
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
