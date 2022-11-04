import React from 'react';

const Message = ({ avatar, username, description, children }: any) => {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg '>
      <div className='flex items-center gap-2 '>
        <img className='rounded-full w-10' src={avatar} alt='' />
        <h2>{username}</h2>
      </div>
      <div className='py-4'>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
