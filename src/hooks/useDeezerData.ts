import { useQuery } from '@tanstack/react-query';
import deezer from '@/utils/deezer';

export interface Track {
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

export interface Album {
  id?: number;
  title?: string;
  artist?: { name?: string };
  cover?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
}

export function useTopFiveAlbums() {
  return useQuery({
    queryKey: ['topFiveAlbums'],
    queryFn: async () => {
      const result = await deezer.getTopFive();
      return (result?.albums?.data?.slice(0, 5) || []) as Album[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrendingTracks(genre: string) {
  return useQuery({
    queryKey: ['trendingTracks', genre],
    queryFn: async () => {
      const result = await deezer.getTopTracksByGenreName(genre);
      return (result?.data || []) as Track[];
    },
    enabled: !!genre,
    staleTime: 2 * 60 * 1000,
  });
}
