import Image from 'next/image';
import Link from 'next/link';

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  imageAlt?: string;
  rating?: number;
  playCount?: number;
  releaseYear?: number;
  genre?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function MusicCard({
  id,
  title,
  artist,
  imageUrl,
  imageAlt,
  rating,
  playCount,
  releaseYear,
  genre,
  className = '',
  variant = 'default',
}: MusicCardProps) {
  const renderRating = () => {
    if (!rating) return null;

    return (
      <div className='flex items-center space-x-1'>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          ))}
        </div>
        <span className='text-sm text-gray-600 ml-1'>{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderCompact = () => (
    <div
      className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <Link href={`/music/${id}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-t-lg'>
          <Image
            src={imageUrl}
            alt={imageAlt || `${title} by ${artist}`}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-200'
          />
        </div>
        <div className='p-3'>
          <h3 className='font-semibold text-gray-900 truncate'>{title}</h3>
          <p className='text-sm text-gray-600 truncate'>{artist}</p>
          {rating && <div className='mt-2'>{renderRating()}</div>}
        </div>
      </Link>
    </div>
  );

  const renderDetailed = () => (
    <div
      className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <Link href={`/music/${id}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-t-lg'>
          <Image
            src={imageUrl}
            alt={imageAlt || `${title} by ${artist}`}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-200'
          />
          <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200' />
        </div>
        <div className='p-4'>
          <h3 className='font-semibold text-gray-900 text-lg mb-1'>{title}</h3>
          <p className='text-gray-600 mb-2'>{artist}</p>

          <div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
            {releaseYear && <span>{releaseYear}</span>}
            {genre && (
              <span className='bg-gray-100 px-2 py-1 rounded-full'>
                {genre}
              </span>
            )}
          </div>

          {rating && <div className='mb-3'>{renderRating()}</div>}

          {playCount && (
            <div className='flex items-center text-sm text-gray-500'>
              <svg
                className='w-4 h-4 mr-1'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
              {playCount.toLocaleString()} plays
            </div>
          )}
        </div>
      </Link>
    </div>
  );

  const renderDefault = () => (
    <div
      className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <Link href={`/music/${id}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-t-lg'>
          <Image
            src={imageUrl}
            alt={imageAlt || `${title} by ${artist}`}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-200'
          />
          <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200' />
        </div>
        <div className='p-4'>
          <h3 className='font-semibold text-gray-900 mb-1 truncate'>{title}</h3>
          <p className='text-gray-600 text-sm mb-2 truncate'>{artist}</p>

          <div className='flex items-center justify-between'>
            {rating && (
              <div className='flex items-center space-x-1'>
                <svg
                  className='w-4 h-4 text-yellow-400 fill-current'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                <span className='text-sm text-gray-600'>
                  {rating.toFixed(1)}
                </span>
              </div>
            )}

            <button className='opacity-0 group-hover:opacity-100 bg-primary text-white p-2 rounded-full transition-all duration-200 hover:bg-primary-600'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );

  switch (variant) {
    case 'compact':
      return renderCompact();
    case 'detailed':
      return renderDetailed();
    default:
      return renderDefault();
  }
}
