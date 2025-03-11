import React from 'react';

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className="bg-white p-1 rounded">
    <svg 
      viewBox="0 0 100 60" 
      className={className}
      fill="black"
    >
      <path d="M0 0h20v60h-20zM40 0h20v60h-20zM80 0h20v60h-20z" />
    </svg>
  </div>
);