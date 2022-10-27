import React from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

const Nav = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className='flex justify-between py-10 items-center'>
      <Link href='/'>
        <button className='text-lg font-medium'>Creative minds</button>
      </Link>
      <ul className='flex items-center gap-10'>
        {!user ? (
          <Link
            className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg text-medium ml-8'
            href={'/auth/login'}
          >
            Join Now
          </Link>
        ) : (
          <div className='flex gap-2 items-center'>
            <Link href='/post'>
              <button className='font-medium bg-cyan-500 rounded-lg px-4 py-2 text-white'>
                Post
              </button>
            </Link>
            <Link href='/dashboard'>
              <img className='rounded-full w-12 cursor-pointer' src={user?.photoURL} />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
