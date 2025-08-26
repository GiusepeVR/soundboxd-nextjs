'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import spotifyAuth from '@/utils/spotify';

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  country: string;
  product: string;
}

interface RecentlyPlayedResponse {
  items: Array<{
    track: {
      name: string;
      artists: Array<{ name: string }>;
    };
    played_at: string;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [userRecentlyPlayed, setUserRecentlyPlayed] =
    useState<RecentlyPlayedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topTenRecentTracks, setTopTenRecentTracks] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('spotify_access_token');

      if (!accessToken) {
        router.push('/login');
        return;
      }

      try {
        const userData = await spotifyAuth.getUserProfile(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Error obtaining user data:', error);
        router.push('/login');
      }

      const recentlyPlayedData = await spotifyAuth.getRecentlyPlayed(
        accessToken
      );
      setUserRecentlyPlayed(recentlyPlayedData);
      setTopTenRecentTracks(recentlyPlayedData.items.slice(0, 10));
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {});

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

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Welcome back, {user.display_name}! 🎵
          </h2>
          <p className='text-lg text-gray-600'>
            Your Spotify account is now connected to Soundboxd
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Recently Played
            </h3>
            <p className='text-gray-600 mb-4'>
              See what you&apos;ve been listening to
            </p>
            {userRecentlyPlayed?.items &&
            userRecentlyPlayed.items.length > 0 ? (
              <p className='text-gray-600 mb-4'>
                {userRecentlyPlayed.items[0].track?.name || 'Unknown track'}
              </p>
            ) : (
              <p className='text-gray-600 mb-4'>No recently played tracks</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
