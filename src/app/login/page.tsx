import { Button, Input } from '@/components';
import Link from 'next/link';

export default function Login() {
  return (
    <main className='flex flex-col items-center justify-center h-screen bg-white'>
      <form className='box-sizing-content flex flex-col items-center justify-center gap-4 border border-gray-300 rounded-md p-6 h-auto lg:w-1/4  xs:w-full'>
        <h1 className='text-2xl text-gray-700 font-bold'>Login</h1>

        <Button type='submit' className='w-full' size='lg'>
          Login with Spotify
        </Button>
        <div className='flex flex-row items-center justify-center gap-4 w-full'>
          <div className='w-full h-px bg-gray-300' />
          <span className='text-gray-500'>or</span>
          <div className='w-full h-px bg-gray-300' />
        </div>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
        <Button type='submit' className='w-full' size='lg'>
          Login
        </Button>
        <Link href='/register' className='text-sm text-gray-500'>
          Don&apos;t have an account? Register
        </Link>
      </form>
    </main>
  );
}
