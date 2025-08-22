'use client';

import { useState, useEffect } from 'react';
import deezer from '@/utils/deezer';
import { MusicCard } from '@/components';

interface Track {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
    cover_big?: string;
    cover_xl?: string;
  };
  preview: string;
}

const genres = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Alternative'];

export default function TrendingSection() {
  const [selectedGenre, setSelectedGenre] = useState('Pop');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenreClick = (genre: string) => {
    console.log('Genre clicked:', genre, 'Current:', selectedGenre);
    if (genre !== selectedGenre) {
      setSelectedGenre(genre);
    }
  };

  const fetchTracksForGenre = async (genre: string) => {
    console.log('Fetching tracks for genre:', genre);
    setLoading(true);
    try {
      const result = await deezer.getTopTracksByGenreName(genre);
      console.log('Received tracks:', result?.data?.length || 0);
      setTracks(result.data || []);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracksForGenre(selectedGenre);
  }, [selectedGenre]);

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h2 className='text-3xl text-gray-900 font-semibold whitespace-pre-line mb-6'>
        Now Trending
      </h2>

      <ul className='flex flex-row text-gray-700 text-sm gap-4 mb-4'>
        {genres.map((genre) => (
          <li
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`cursor-pointer hover:text-primary transition-colors ${
              selectedGenre === genre
                ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                : ''
            }`}
          >
            {genre}
          </li>
        ))}
      </ul>

      <div className='min-h-[600px]'>
        {loading ? (
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4'>
            {tracks.slice(0, 9).map((track) => {
              const imageUrl = track.album.cover_big || track.album.cover_xl || track.album.cover_medium;
              return (
                <MusicCard
                  key={track.id}
                  id={String(track.id)}
                  title={track.title}
                  artist={track.artist.name}
                  imageUrl={imageUrl}
                  variant='default'
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
