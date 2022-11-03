import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {};

const Dashboard = (props: Props) => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) return;
    if (!user) route.push('/auth/login');
  };

  console.log(`loading = `, loading);
  console.log('user', user);

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      {loading ? null : (
        <>
          <h1>Hello {user?.displayName?.split(' ')[0]}</h1>
          <div>posts </div>
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
