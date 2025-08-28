import Image from 'next/image';

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
    <div className={`relative group cursor-pointer ${className}`}>
      <div className='block'>
        <div className='relative aspect-square overflow-hidden rounded-lg'>
          <Image
            src={imageUrl}
            alt={`${title} by ${artist}`}
            fill
            className='object-cover'
          />

          <div className='absolute flex flex-col justify-end bg-black/60 p-4 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200 group-hover:opacity-100'>
            <span className='block text-white mb-2 truncate'>{title}</span>
            <span className='block text-white text-sm truncate'>{artist}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefault = () => (
    <div
      className={`bg-white rounded-lg shadow-sm cursor-pointer ${className}`}
    >
      <div className='block'>
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
      </div>
    </div>
  );

  return variant === 'minimal' ? renderMinimal() : renderDefault();
}
