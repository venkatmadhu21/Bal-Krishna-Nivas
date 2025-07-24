import React from 'react';

const BalKrishnaIcon = ({ size = 24, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle - Represents Unity */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        fill="url(#outerGradient)" 
        stroke="url(#borderGradient)" 
        strokeWidth="2"
      />
      
      {/* Traditional House/Temple Structure */}
      <g transform="translate(50, 50)">
        {/* Base Foundation */}
        <rect 
          x="-20" 
          y="10" 
          width="40" 
          height="25" 
          fill="url(#houseGradient)" 
          rx="2"
        />
        
        {/* Roof - Traditional Indian Style */}
        <polygon 
          points="-25,10 0,-15 25,10" 
          fill="url(#roofGradient)"
        />
        
        {/* Central Pillar */}
        <rect 
          x="-2" 
          y="-5" 
          width="4" 
          height="20" 
          fill="url(#pillarGradient)"
        />
        
        {/* Door */}
        <rect 
          x="-6" 
          y="15" 
          width="12" 
          height="15" 
          fill="url(#doorGradient)" 
          rx="6"
        />
        
        {/* Windows */}
        <rect 
          x="-15" 
          y="18" 
          width="6" 
          height="6" 
          fill="url(#windowGradient)" 
          rx="1"
        />
        <rect 
          x="9" 
          y="18" 
          width="6" 
          height="6" 
          fill="url(#windowGradient)" 
          rx="1"
        />
        
        {/* Decorative Elements - Lotus Petals */}
        <g opacity="0.8">
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-25"
              rx="3"
              ry="8"
              fill="url(#petalGradient)"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
        
        {/* Central Dot - Bindu */}
        <circle 
          cx="0" 
          cy="-25" 
          r="4" 
          fill="url(#centerGradient)"
        />
        
        {/* Sacred Symbol - Om inspired curves */}
        <path 
          d="M -8,-8 Q -12,-12 -8,-16 Q -4,-12 0,-12 Q 4,-8 0,-4" 
          fill="url(#symbolGradient)" 
          opacity="0.6"
        />
      </g>
      
      {/* Decorative Border Pattern */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        fill="none" 
        stroke="url(#innerBorderGradient)" 
        strokeWidth="1" 
        strokeDasharray="3,2"
        opacity="0.7"
      />
      
      {/* Gradients */}
      <defs>
        <radialGradient id="outerGradient" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FFEDD5" />
        </radialGradient>
        
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
        
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        
        <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A3A3A3" />
          <stop offset="100%" stopColor="#737373" />
        </linearGradient>
        
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        
        <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        
        <radialGradient id="petalGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        
        <radialGradient id="centerGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F97316" />
        </radialGradient>
        
        <linearGradient id="symbolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        
        <linearGradient id="innerBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BalKrishnaIcon;