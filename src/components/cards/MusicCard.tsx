import Image from 'next/image';
import Link from 'next/link';

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  className?: string;
  variant?: 'default' | 'minimal';
}

export default function MusicCard({
  id,
  title,
  artist,
  imageUrl,
  className = '',
  variant = 'default',
}: MusicCardProps) {
  const renderMinimal = () => (
    <div className={`relative ${className}`}>
      <Link href={`/music/${id}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-lg'>
          <Image
            src={imageUrl}
            alt={`${title} by ${artist}`}
            fill
            className='object-cover'
          />
        </div>
      </Link>
    </div>
  );

  const renderDefault = () => (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <Link href={`/music/${id}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-t-lg'>
          <Image
            src={imageUrl}
            alt={`${title} by ${artist}`}
            fill
            className='object-cover'
          />
        </div>
        <div className='p-4'>
          <h3 className='font-semibold text-gray-900 mb-1 truncate'>{title}</h3>
          <p className='text-gray-600 text-sm truncate'>{artist}</p>
        </div>
      </Link>
    </div>
  );

  return variant === 'minimal' ? renderMinimal() : renderDefault();
}
