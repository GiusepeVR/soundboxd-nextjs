import { MusicCard, Button } from '@/components';

export default function ComponentsDemo() {
  const sampleMusic = [
    {
      id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      imageUrl:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      rating: 4.8,
      playCount: 1250000,
      releaseYear: 1975,
      genre: 'Rock',
    },
    {
      id: '2',
      title: 'Hotel California',
      artist: 'Eagles',
      imageUrl:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
      rating: 4.6,
      playCount: 980000,
      releaseYear: 1976,
      genre: 'Rock',
    },
    {
      id: '3',
      title: 'Imagine',
      artist: 'John Lennon',
      imageUrl:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      rating: 4.9,
      playCount: 2100000,
      releaseYear: 1971,
      genre: 'Pop',
    },
  ];

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
          Components Demo
        </h1>

        {/* Button Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Button Components
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button variant='primary' size='lg'>
              Primary Large
            </Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='danger'>Danger</Button>
            <Button size='sm'>Small</Button>
            <Button size='lg'>Large</Button>
            <Button isLoading>Loading</Button>
            <Button leftIcon={<span>🎵</span>}>With Icon</Button>
          </div>
        </section>

        {/* Music Cards Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Music Card Components
          </h2>

          {/* Default Variant */}
          <div className='mb-8'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Default Variant
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sampleMusic.map((music) => (
                <MusicCard key={music.id} {...music} variant='default' />
              ))}
            </div>
          </div>

          {/* Compact Variant */}
          <div className='mb-8'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Compact Variant
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {sampleMusic.map((music) => (
                <MusicCard key={music.id} {...music} variant='compact' />
              ))}
            </div>
          </div>

          {/* Detailed Variant */}
          <div className='mb-8'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Detailed Variant
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {sampleMusic.map((music) => (
                <MusicCard key={music.id} {...music} variant='detailed' />
              ))}
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className='bg-white p-6 rounded-lg shadow-sm'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Usage Examples
          </h2>
          <div className='space-y-4'>
            <div>
              <h3 className='font-medium text-gray-700 mb-2'>
                Importing Components:
              </h3>
              <pre className='bg-gray-100 p-3 rounded text-sm overflow-x-auto'>
                {`import { MusicCard, Button } from '@/components';`}
              </pre>
            </div>

            <div>
              <h3 className='font-medium text-gray-700 mb-2'>
                Using MusicCard:
              </h3>
              <pre className='bg-gray-100 p-3 rounded text-sm overflow-x-auto'>
                {`<MusicCard
  id="1"
  title="Song Title"
  artist="Artist Name"
  imageUrl="/path/to/image.jpg"
  rating={4.5}
  variant="detailed"
/>`}
              </pre>
            </div>

            <div>
              <h3 className='font-medium text-gray-700 mb-2'>Using Button:</h3>
              <pre className='bg-gray-100 p-3 rounded text-sm overflow-x-auto'>
                {`<Button variant="primary" size="lg" isLoading>
  Click Me
</Button>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
