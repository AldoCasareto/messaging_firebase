import React from 'react';
import { Timestamp } from 'firebase/firestore';

const Message = ({ avatar, username, timestamp, description, children }: any) => {
  const date = new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate().toDateString();
  console.log(date);

  return (
    <div className='bg-white p-8 border-b-2 rounded-lg '>
      <div className='flex items-center gap-2 '>
        <img className='rounded-full w-10' src={avatar} alt='' />
        <h2>{username.split(' ')[0]}</h2>
      </div>
      <div className='py-4'>
        <p>{description}</p>
      </div>
      <div>{date}</div>
      {children}
    </div>
  );
};

export default Message;
