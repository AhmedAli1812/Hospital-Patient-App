
import React from 'react';

const LabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.95a7.5 7.5 0 1 0 9.9 9.9L12 21l-2.05-2.05a7.5 7.5 0 0 0-9.9-9.9Z"/>
  </svg>
);

export default LabIcon;
