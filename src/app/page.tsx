'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components';
import { MusicCard } from '@/components';
import { useUser } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';
import { Reorder } from 'framer-motion';
import {
  useTopFiveAlbums,
  useTrendingTracks,
  type Album,
  type Track,
} from '@/hooks/useDeezerData';

const genres = ['Pop', 'Rock', 'Rap', 'Electronic', 'Alternative'];

export default function Home() {
  const router = useRouter();
  const { isUserLoggedIn } = useUser();
  const [selectedGenre, setSelectedGenre] = useState('Pop');
  const [reorderedAlbums, setReorderedAlbums] = useState<Album[]>([]);

  const { data: topFiveAlbums = [], isLoading: topFiveLoading } =
    useTopFiveAlbums();
  const { data: trendingTracks = [], isLoading: trendingLoading } =
    useTrendingTracks(selectedGenre);

  useEffect(() => {
    setReorderedAlbums(topFiveAlbums);
  }, [topFiveAlbums]);

  const hasTopFive = reorderedAlbums && reorderedAlbums.length >= 5;

  const handleGenreClick = (genre: string) => {
    if (genre !== selectedGenre) {
      setSelectedGenre(genre);
    }
  };

  const handleRedirect = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className='p-8 bg-white flex flex-col overflow-hidden'>
      <div className='flex flex-col items-center justify-center h-screen relative'>
        <div className='absolute inset-0 flex items-center justify-center z-50'>
          <div className='text-center z-50'>
            <h1 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line pt-16 sm:pt-6'>
              <span className='block'>Dive into your music.</span>
              <span className='block'>Share what you liked.</span>
            </h1>
            <Button
              variant='primary'
              size='lg'
              className='z-50'
              onClick={() => handleRedirect(isUserLoggedIn)}
            >
              {isUserLoggedIn ? 'View my music' : 'Get Started'}
            </Button>
          </div>

          {hasTopFive && (
            <div className='absolute flex items-center justify-center top-1/8'>
              <Reorder.Group
                axis='x'
                values={reorderedAlbums}
                onReorder={setReorderedAlbums}
                className='flex items-center space-x-4'
              >
                {reorderedAlbums.map((album, index) => {
                  const coverFlowConfig = [
                    {
                      wrapper: 'transform -rotate-12 scale-75 opacity-80',
                      size: 'w-32 h-32',
                    },
                    {
                      wrapper: 'transform -rotate-6 scale-90 opacity-90',
                      size: 'w-40 h-40',
                    },
                    { wrapper: 'transform scale-110 z-10', size: 'w-56 h-56' },
                    {
                      wrapper: 'transform rotate-6 scale-90 opacity-90',
                      size: 'w-40 h-40',
                    },
                    {
                      wrapper: 'transform rotate-12 scale-75 opacity-80',
                      size: 'w-32 h-32',
                    },
                  ];
                  const cfg = coverFlowConfig[index] || coverFlowConfig[2];

                  const imageUrl =
                    album?.cover_big ||
                    album?.cover_xl ||
                    album?.cover_medium ||
                    album?.cover ||
                    '/static/albums/fallback.jpeg';
                  const title = album?.title || 'Unknown Album';
                  const artist = album?.artist?.name || 'Unknown Artist';
                  const id = String(album?.id ?? `${title}-${index}`);

                  return (
                    <Reorder.Item
                      key={id}
                      value={album}
                      className={cfg.wrapper}
                      whileDrag={{ scale: 1.1, zIndex: 20 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <MusicCard
                        id={id}
                        title={title}
                        artist={artist}
                        imageUrl={imageUrl}
                        className={cfg.size}
                        variant='minimal'
                      />
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </div>
          )}
        </div>
        <div className='absolute -top-1/5 left-1/2 -translate-x-1/2 -translate-y-1 sm:-translate-y-2 sm:top-16% w-[800px] h-[800px] bg-gradient-to-r from-primary/60 via-primary/10 to-transparent rounded-full blur-3xl z-10 rotate-270' />
      </div>
      <div className='flex flex-col w-full relative py-8 sm:py-12 md:py-16'>
        <div className='max-w-6xl mx-auto p-6 w-full'>
          <h2 className='text-3xl text-gray-900 font-semibold whitespace-pre-line mb-6'>
            Now Trending
          </h2>

          <ul className='flex flex-row text-gray-700 text-sm gap-4 mb-4 overflow-x-auto'>
            {genres.map((genre) => (
              <li
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className={`cursor-pointer hover:text-primary transition-colors whitespace-nowrap ${
                  selectedGenre === genre
                    ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                    : ''
                }`}
              >
                {genre}
              </li>
            ))}
          </ul>

          <div className='min-h-[400px] h-auto xl:overflow-hidden'>
            {trendingLoading ? (
              <div className='flex justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4 w-full xl:max-w-full'>
                {trendingTracks
                  .slice(0, 9)
                  .map((track) => {
                    if (
                      !track?.id ||
                      !track?.title ||
                      !track?.artist?.name ||
                      !track?.album?.cover_medium
                    ) {
                      return null;
                    }

                    const imageUrl =
                      track.album.cover_big ||
                      track.album.cover_xl ||
                      track.album.cover_medium;

                    return (
                      <div
                        key={track.id}
                        className='w-full xl:max-w-full xl:flex-shrink-0'
                      >
                        <MusicCard
                          id={String(track.id)}
                          title={track.title}
                          artist={track.artist.name}
                          imageUrl={imageUrl}
                          variant='default'
                          className='w-full xl:h-full'
                        />
                      </div>
                    );
                  })
                  .filter(Boolean)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center h-screen relative'>
        <h2 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line text-center z-100'>
          <span className='block'>Music is better together.</span>
          <span className='block'>Start sharing today.</span>
        </h2>
        <Button
          variant='primary'
          size='lg'
          className='z-50'
          onClick={() => handleRedirect(isUserLoggedIn)}
        >
          {isUserLoggedIn ? 'View my music' : 'Get Started'}
        </Button>
        <div className='absolute top-1/3 -left-24 w-96 h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl z-10' />
        <div className='absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/40 via-orange-300/30 to-transparent rounded-full blur-3xl z-10' />
      </div>
    </div>
  );
}
