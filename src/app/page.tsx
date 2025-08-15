'use client';

import { Button, MusicCard } from '@/components';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='p-8 bg-white flex flex-col overflow-hidden'>
      <div className='flex flex-col items-center justify-center h-screen relative'>
        <h1 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line text-center z-100'>
          <span className='block'>Dive into your music.</span>
          <span className='block'>Share what you liked.</span>
        </h1>
        <Button variant='primary' size='lg' className='z-100'>
          Get Started
        </Button>
        <div className='grid grid-cols-2 gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <MusicCard
            id='1'
            title='Bohemian Rhapsody'
            artist='Queen'
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
            className=''
          />
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
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='2'
            title='Hotel California'
            artist='Eagles'
            imageUrl='https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='3'
            title='Imagine'
            artist='John Lennon'
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='1'
            title='Bohemian Rhapsody'
            artist='Queen'
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='2'
            title='Hotel California'
            artist='Eagles'
            imageUrl='https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='3'
            title='Imagine'
            artist='John Lennon'
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='1'
            title='Bohemian Rhapsody'
            artist='Queen'
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='2'
            title='Hotel California'
            artist='Eagles'
            imageUrl='https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
          />
          <MusicCard
            id='3'
            title='Imagine'
            artist='John Lennon'
            imageUrl='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
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
