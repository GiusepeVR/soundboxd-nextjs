'use client';

export default function Home() {
  return (
    <div className='p-8 bg-white flex flex-col'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line text-center'>
          <span className='block'>Dive into your music.</span>
          <span className='block'>Share what you liked.</span>
        </h1>
        <button className='bg-primary text-white px-6 py-3 rounded-full font-semibold'>
          Get Started
        </button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-lg text-gray-900 font-semibold mb-4 text-center'>
          Now trending
        </h2>
        <ul className='flex flex-row text-gray-700 text-sm gap-4'>
          <li>Pop</li>
          <li>Rock</li>
          <li>Jazz</li>
          <li>Classical</li>
          <li>Hip Hop</li>
          <li>Electronic</li>
          <li>Country</li>
        </ul>
      </div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-3xl text-gray-900 font-semibold mb-4 whitespace-pre-line text-center'>
          <span className='block'>Music is better together.</span>
          <span className='block'>Start sharing today.</span>
        </h2>
        <button className='bg-primary text-white px-6 py-3 rounded-full font-semibold'>
          Get Started
        </button>
      </div>
    </div>
  );
}
