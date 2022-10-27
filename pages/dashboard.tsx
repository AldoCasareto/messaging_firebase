import React from 'react';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router';

type Props = {};

const Dashboard = (props: Props) => {
  const route = useRouter();
  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <button
        className='cursos-pointer'
        onClick={() => {
          auth.signOut();
          route.push('/');
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
