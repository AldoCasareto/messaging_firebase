import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import Message from '../components/message';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';

const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState<any[]>([]);

  const getData = async () => {
    if (loading) return;
    if (!user) route.push('/auth/login');

    const collectionRef = collection(db, 'messages');
    const q = query(collectionRef, where('user', '==', user?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((message) => ({ ...message.data(), id: message.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  const handleDelete = async (id: string) => {
    const docRef = doc(db, 'messages', id);
    await deleteDoc(docRef);
  };

  return (
    <div>
      {loading ? null : (
        <>
          <h1>Hello {user?.displayName?.split(' ')[0]}</h1>
          <div>posts </div>
          <div>
            {messages?.map((message: any) => (
              <Message {...message} key={message.id}>
                <div className='flex gap-4'>
                  <button
                    className='text-pink-600 flex items-center justify-center gap-2 py-2 text-sm'
                    onClick={() => handleDelete(message.id)}
                  >
                    Delete
                    <BsTrash2Fill />
                  </button>
                  <Link href={{ pathname: '/message', query: message }}>
                    <button className='text-teal-600 flex items-center justify-center gap-2 py-2 text-sm'>
                      Edit
                      <AiFillEdit />
                    </button>
                  </Link>
                </div>
              </Message>
            ))}
          </div>
          <button
            className='cursos-pointer'
            onClick={async () => {
              await auth.signOut();
              route.push('/');
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
