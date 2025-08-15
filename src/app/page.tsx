'use client';

import { Button, MusicCard } from '@/components';

export default function Home() {
  return (
    <div className='p-8 bg-white flex flex-col overflow-hidden'>
      <div className='flex flex-col items-center justify-center h-screen relative'>
        <div className='absolute inset-0 flex items-center justify-center z-50'>
          <div className='text-center z-50'>
            <h1 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line'>
              <span className='block'>Dive into your music.</span>
              <span className='block'>Share what you liked.</span>
            </h1>
            <Button variant='primary' size='lg' className='z-50'>
              Get Started
            </Button>
          </div>

          <div className='absolute flex items-center justify-center top-1/8'>
            <div className='flex items-center space-x-4'>
              <div className='transform -rotate-12 scale-75 opacity-80'>
                <MusicCard
                  id='1'
                  title='Kid A'
                  artist='Radiohead'
                  imageUrl='/static/albums/radiohead1.jpeg'
                  className='w-32 h-32'
                  variant='minimal'
                />
              </div>

              <div className='transform -rotate-6 scale-90 opacity-90'>
                <MusicCard
                  id='2'
                  title='OK Computer'
                  artist='Radiohead'
                  imageUrl='/static/albums/radiohead1.jpeg'
                  className='w-40 h-40'
                  variant='minimal'
                />
              </div>

              <div className='transform scale-110 z-10'>
                <MusicCard
                  id='3'
                  title='In Rainbows'
                  artist='Radiohead'
                  imageUrl='/static/albums/radiohead1.jpeg'
                  className='w-56 h-56'
                  variant='minimal'
                />
              </div>

              <div className='transform rotate-6 scale-90 opacity-90'>
                <MusicCard
                  id='4'
                  title='The Bends'
                  artist='Radiohead'
                  imageUrl='/static/albums/radiohead1.jpeg'
                  className='w-40 h-40'
                  variant='minimal'
                />
              </div>
              <div className='transform rotate-12 scale-75 opacity-80'>
                <MusicCard
                  id='5'
                  title='Amnesiac'
                  artist='Radiohead'
                  imageUrl='/static/albums/radiohead1.jpeg'
                  className='w-32 h-32'
                  variant='minimal'
                />
              </div>
            </div>
          </div>
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
          <li>Jazz</li>
          <li>Classical</li>
          <li>Hip Hop</li>
          <li>Electronic</li>
          <li>Country</li>
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
        <Button variant='primary' size='lg' className='z-100'>
          Get Started
        </Button>
        <div className='absolute top-1/3 -left-24 w-96 h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl z-10' />
        <div className='absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/40 via-orange-300/30 to-transparent rounded-full blur-3xl z-10' />
      </div>
    </div>
  );
}
