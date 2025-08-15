import { Button, Input } from '@/components';
import Link from 'next/link';

export default function Register() {
  return (
    <main className='flex flex-col items-center justify-center h-screen bg-white'>
      <form className='flex flex-col items-center justify-center gap-4 border border-gray-300 rounded-md p-6 lg:w-1/4 lg:h-1/3 sm:w-full sm:h-full'>
        <h1 className='text-2xl text-gray-700 font-bold'>Register</h1>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
        <Button type='submit' className='w-full' size='lg'>
          Register
        </Button>
        <Link href='/login' className='text-sm text-gray-500'>
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}
