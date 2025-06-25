import React from 'react';

const ChartCard = ({ title, icon, children }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-2 mb-4'>
        {icon}
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;