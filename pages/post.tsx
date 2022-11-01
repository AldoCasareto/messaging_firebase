import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Post = () => {
  const [message, setMessage] = useState({ description: '' });
  const [user, loading] = useAuthState(auth);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!message.description) {
      toast.error('please add a message', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    const collectionRef = collection(db, 'messages');
    await addDoc(collectionRef, {
      ...message,
      timestamp: serverTimestamp(),
      user: user?.uid,
      avatar: user?.photoURL,
      username: user?.displayName,
    });
    setMessage({ description: '' });
  };

  console.log(message);

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      <form onSubmit={submitHandler}>
        <h1 className='text-2xl font-bold'>Create a new post</h1>
        <div className='py-2'>
          <h3 className='text-lg font-medium py-2'>Description</h3>
          <textarea
            value={message.description}
            className='bg-gray-800 h-48 w-full text-white p-2 rounded-xl text-small'
            onChange={(e) => setMessage({ ...message, description: e.target.value })}
            name='textarea'
          />
          <p className={` text-sm ${message.description.length > 300 ? 'text-red-600' : ''}`}>
            {message.description.length}/300
          </p>
          <button
            disabled={message.description.length > 300 && true}
            className='w-full bg-cyan-600 text-white rounded-lg p-2 my-2'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
