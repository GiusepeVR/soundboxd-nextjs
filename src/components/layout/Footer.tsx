import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='col-span-1 md:col-span-2'>
            <Link href='/' className='text-2xl font-bold text-primary-400'>
              <Image
                src='/logos/lightLogo.svg'
                alt='Soundboxd'
                width={150}
                height={150}
                className='w-[150px] h-auto'
              />
            </Link>
            <p className='mt-4 text-gray-300 max-w-md'>
              Discover, track, and share your music journey. Connect with fellow
              music lovers and build your personal music library.
            </p>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-700'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © 2025 Soundboxd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
