'use client';

import { Button, MusicCard } from '@/components';
import { useRouter } from 'next/navigation';
import deezer from '@/utils/deezer';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    const fetchTopFive = async () => {
      try {
        const data = await deezer.getTopFive();
        const albums = data?.albums?.data ?? [];
        setTopFive(albums);
      } catch (e) {
        console.error('Failed to fetch Deezer top five:', e);
        setTopFive([]);
      }
    };
    fetchTopFive();
  }, []);

  const hasTopFive = topFive?.length >= 5;

  return (
    <div className='p-8 bg-white flex flex-col overflow-hidden'>
      <div className='flex flex-col items-center justify-center h-screen relative'>
        <div className='absolute inset-0 flex items-center justify-center z-50'>
          <div className='text-center z-50'>
            <h1 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line'>
              <span className='block'>Dive into your music.</span>
              <span className='block'>Share what you liked.</span>
            </h1>
            <Button
              variant='primary'
              size='lg'
              className='z-50'
              onClick={() => router.push('/login')}
            >
              Get Started
            </Button>
          </div>

          {hasTopFive && (
            <div className='absolute flex items-center justify-center top-1/8'>
              <div className='flex items-center space-x-4'>
                {topFive.slice(0, 5).map((album: any, index: number) => {
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
                    album?.cover;
                  const title = album?.title || 'Unknown Album';
                  const artist = album?.artist?.name || 'Unknown Artist';
                  const id = String(album?.id ?? index);

                  return (
                    <div key={id} className={cfg.wrapper}>
                      <MusicCard
                        id={id}
                        title={title}
                        artist={artist}
                        imageUrl={imageUrl}
                        className={cfg.size}
                        variant='minimal'
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className='absolute -top-1/5 left-1/2 -translate-x-1/2 -translate-y-1 sm:-translate-y-2 sm:top-16% w-[800px] h-[800px] bg-gradient-to-r from-primary/60 via-primary/10 to-transparent rounded-full blur-3xl z-10 rotate-270' />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-lg text-gray-900 font-semibold mb-4 text-center'>
          Now trending
        </h2>
        <ul className='flex flex-row text-gray-700 text-sm gap-4 mb-4'>
          <li>Pop</li>
          <li>Rock</li>
          <li>Hip Hop</li>
          <li>Electronic</li>
          <li>Alternative</li>
        </ul>
        <div className='grid grid-cols-3 gap-4 py-4'>
          <MusicCard
            id='1'
            title='Bohemian Rhapsody'
            artist='Queen'
            imageUrl='/static/albums/radiohead1.jpeg'
            variant='default'
          />
          <MusicCard
            id='2'
            title='Hotel California'
            artist='Eagles'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='3'
            title='Imagine'
            artist='John Lennon'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='1'
            title='Bohemian Rhapsody'
            artist='Queen'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='2'
            title='Hotel California'
            artist='Eagles'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='3'
            title='Imagine'
            artist='John Lennon'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='1'
            title='Bohemian Rhapsody'
            artist='Queen'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='2'
            title='Hotel California'
            artist='Eagles'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
          <MusicCard
            id='3'
            title='Imagine'
            artist='John Lennon'
            imageUrl='/static/albums/radiohead1.jpeg'
          />
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
          onClick={() => router.push('/login')}
        >
          Get Started
        </Button>
        <div className='absolute top-1/3 -left-24 w-96 h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl z-10' />
        <div className='absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/40 via-orange-300/30 to-transparent rounded-full blur-3xl z-10' />
      </div>
    </div>
  );
}
