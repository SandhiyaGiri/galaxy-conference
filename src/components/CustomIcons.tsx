import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const EmbeddedBankingIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main chip body */}
    <rect x="5" y="5" width="14" height="14" rx="1.5" />

    {/* Professional dollar symbol - flipped */}
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="scaleX(-1) translate(-24 0)">
      {/* Vertical line - clean and centered */}
      <line x1="12" y1="8" x2="12" y2="16" />
      {/* Top loop - clean semi-circle */}
      <path d="M 10 10 C 10 9.3 11 8.8 12 8.8 C 13 8.8 14 9.3 14 10 C 14 10.6 13.2 11 12 11 C 10.8 11 10.2 11.4 10.2 12" />
      {/* Bottom loop - clean semi-circle */}
      <path d="M 14 12 C 14.2 12.6 13.2 13 12 13 C 10.8 13 10 13.4 10 14 C 10 14.7 11 15.2 12 15.2 C 13 15.2 14 14.7 14 14" />
    </g>

    {/* Left connection pins */}
    <line x1="2.5" y1="9.5" x2="5" y2="9.5" strokeWidth="1.5" />
    <line x1="2.5" y1="14.5" x2="5" y2="14.5" strokeWidth="1.5" />

    {/* Right connection pins */}
    <line x1="19" y1="9.5" x2="21.5" y2="9.5" strokeWidth="1.5" />
    <line x1="19" y1="14.5" x2="21.5" y2="14.5" strokeWidth="1.5" />

    {/* Top connection pins */}
    <line x1="9.5" y1="2.5" x2="9.5" y2="5" strokeWidth="1.5" />
    <line x1="14.5" y1="2.5" x2="14.5" y2="5" strokeWidth="1.5" />

    {/* Bottom connection pins */}
    <line x1="9.5" y1="19" x2="9.5" y2="21.5" strokeWidth="1.5" />
    <line x1="14.5" y1="19" x2="14.5" y2="21.5" strokeWidth="1.5" />
  </svg>
);

export const TokenizedDepositsIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Globe - larger and cleaner */}
    <circle cx="12" cy="8" r="5" />
    <ellipse cx="12" cy="8" rx="5" ry="2.2" />
    <path d="M 7 8 Q 12 9.5 17 8" strokeWidth="1.5" />
    <path d="M 12 3 L 12 13" strokeWidth="1.5" />
    <path d="M 7.8 5.8 Q 12 7 16.2 5.8" strokeWidth="1.5" />
    <path d="M 8 10.2 Q 12 9 16 10.2" strokeWidth="1.5" />

    {/* Database cylinder - larger and proportional */}
    <ellipse cx="12" cy="16" rx="4.5" ry="1.2" />
    <line x1="7.5" y1="16" x2="7.5" y2="19.5" strokeWidth="1.5" />
    <line x1="16.5" y1="16" x2="16.5" y2="19.5" strokeWidth="1.5" />
    <ellipse cx="12" cy="19.5" rx="4.5" ry="1.2" fill="currentColor" opacity="0.35" />

    {/* Center band on cylinder for depth */}
    <ellipse cx="12" cy="17.5" rx="4.5" ry="1" fill="none" opacity="0.4" />
  </svg>
);
