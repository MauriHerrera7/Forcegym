import React from 'react';
import { silhouettes } from './silhouettes';

interface SvgWrapperProps {
  children: React.ReactNode;
  side: 'front' | 'back';
  gender: 'male' | 'female';
}

export const SvgWrapper: React.FC<SvgWrapperProps> = ({ children, side, gender }) => {
  const viewBox = gender === 'female'
    ? (side === 'front' ? "-50 -40 734 1538" : "756 0 774 1448")
    : (side === 'front' ? "0 0 724 1448" : "724 0 724 1448");

  const pathD = silhouettes[gender][side];

  return (
    <svg 
      viewBox={viewBox} 
      className="w-full h-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dynamic Silhouette based on gender */}
      <g stroke="#6b7280" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
        <path d={pathD} />
      </g>

      {/* Dynamic Muscle Layers */}
      <g className="transition-all duration-500 ease-in-out">
        {children}
      </g>
    </svg>
  );
};
