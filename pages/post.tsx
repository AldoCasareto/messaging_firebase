import React, { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

const Post = () => {
  const [message, setMessage] = useState<string>('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    const { value } = e.target as HTMLButtonElement;
    console.log(`value = `, value);
  };

  console.log(message);

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      <form onSubmit={submitHandler}>
        <h1 className='text-2xl font-bold'>Create a new post</h1>
        <div className='py-2'>
          <h3 className='text-lg font-medium py-2'>Description</h3>
          <textarea
            value={message}
            className='bg-gray-800 h-48 w-full text-white p-2 rounded-xl text-small'
            onChange={(e) => setMessage(e.target.value)}
            name='textarea'
          />
          <p className={` text-sm ${message.length > 300 ? 'text-red-600' : ''}`}>
            {message.length}/300
          </p>
          <button className='w-full bg-cyan-600 text-white rounded-lg p-2 my-2' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
