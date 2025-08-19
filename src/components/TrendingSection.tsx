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
  };
  preview: string;
}

const genres = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Alternative'];

export default function TrendingSection() {
  const [selectedGenre, setSelectedGenre] = useState('Pop');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTracksForGenre = async (genre: string) => {
    setLoading(true);
    try {
      const result = await deezer.getTopTracksByGenreName(genre);
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
            onClick={() => setSelectedGenre(genre)}
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

      {loading ? (
        <div className='flex justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
          {tracks.slice(0, 9).map((track) => (
            <MusicCard
              key={track.id}
              id={String(track.id)}
              title={track.title}
              artist={track.artist.name}
              imageUrl={track.album.cover_medium}
              variant='default'
            />
          ))}
        </div>
      )}
    </div>
  );
}
