'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import spotifyAuth from '@/utils/spotify';
import { MusicCard } from '@/components';
import { useUser } from '@/components/context/UserContext';

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
      id: string;
      artists: Array<{ name: string }>;
      album: {
        images: Array<{ url: string; height: number; width: number }>;
      };
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
  const { setIsUserLoggedIn } = useUser();

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
      console.log(recentlyPlayedData);
      setIsLoading(false);
      setIsUserLoggedIn(true);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {});

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
      {/* <nav className='bg-white shadow-sm border-b border-gray-200'>
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
      </nav> */}

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
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 py-4 w-full xl:max-w-full'>
              {userRecentlyPlayed?.items &&
                userRecentlyPlayed.items.map((item) => {
                  return (
                    <div className='text-gray-600 mb-4' key={item.track.id}>
                      <MusicCard
                        id={String(item.track.id)}
                        title={item.track.name}
                        artist='{item.track.artist.name}'
                        imageUrl={item.track.album.images[0]?.url || ''}
                        variant='minimal'
                        className='w-full xl:h-full'
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
