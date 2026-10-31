import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../config/business';

interface LogoProps {
  variant?: 'dark' | 'light' | 'mark-only';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  useFullBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = '',
  useFullBadge = BUSINESS_CONFIG.logo?.useFullBadgeInHeader ?? true,
}) => {
  const [imageError, setImageError] = useState(false);

  const iconDimensions = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  }[size];

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-2xl lg:text-[25px]',
    lg: 'text-2xl sm:text-3xl lg:text-4xl',
  }[size];

  const isDark = variant === 'dark';
  const isMarkOnly = variant === 'mark-only';

  // 1. Standalone Full Logo Badge Mode (Directly renders the user-provided horizontal brand logo)
  if (useFullBadge && !imageError) {
    const badgeHeights = {
      sm: 'h-8 sm:h-9',
      md: 'h-10 sm:h-12 lg:h-13',
      lg: 'h-14 sm:h-16 lg:h-18',
    }[size];

    return (
      <div className={`flex items-center select-none py-0.5 ${className}`}>
        <img
          src={BUSINESS_CONFIG.logo?.horizontalUrl || BUSINESS_CONFIG.logo?.fullUrl || '/nandini-logo-horizontal.png'}
          alt={`${BUSINESS_CONFIG.brandName} - ${BUSINESS_CONFIG.city}`}
          width="180"
          height="52"
          className={`${badgeHeights} w-auto object-contain transition-transform duration-300 group-hover:scale-102 filter drop-shadow-xs`}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // 2. Horizontal Lockup Mode: Custom Emblem + Typography
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Visual Mark / Emblem */}
      <div 
        className={`${iconDimensions} shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs overflow-hidden ${
          isDark 
            ? 'bg-[#FAF7F2] border border-[#C89D66]/40 ring-1 ring-[#1E3A5F]/15 p-1' 
            : 'bg-[#FAF7F2] border border-[#C89D66]/60 ring-1 ring-[#FAF7F2]/20 p-1 shadow-sm'
        }`}
        aria-hidden="true"
      >
        {!imageError ? (
          <img 
            src={BUSINESS_CONFIG.logo?.emblemUrl || '/nandini-emblem.png'} 
            alt={`${BUSINESS_CONFIG.brandName} Emblem`} 
            width="48"
            height="48"
            className="w-full h-full object-contain filter drop-shadow-xs" 
            onError={() => setImageError(true)}
          />
        ) : (
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            className="w-4/5 h-4/5"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle Outer Zen Arc */}
            <circle 
              cx="50" 
              cy="50" 
              r="44" 
              stroke={isDark ? "#C89D66" : "#E5C89F"} 
              strokeWidth="1.8" 
              strokeDasharray="4 3" 
              opacity="0.85" 
            />
            {/* Outer Prana Lotus Petal */}
            <path 
              d="M50 16 C60 28 75 42 75 58 C75 72 64 80 50 82 C36 80 25 72 25 58 C25 42 40 28 50 16 Z" 
              fill={isDark ? "#E7EFEA" : "#343F38"} 
              stroke={isDark ? "#446353" : "#7A9988"} 
              strokeWidth="2.5" 
              strokeLinejoin="round"
            />
            {/* Central Awakening Spire */}
            <path 
              d="M50 24 C57 36 66 48 66 60 C66 70 59 76 50 78 C41 76 34 70 34 60 C34 48 43 36 50 24 Z" 
              fill={isDark ? "#446353" : "#E7EFEA"} 
            />
            {/* Golden Core Seed */}
            <path 
              d="M50 37 C53 45 58 53 58 60 C58 65 54 69 50 70 C46 69 42 65 42 60 C42 53 47 45 50 37 Z" 
              fill={isDark ? "#C89D66" : "#D4AF37"} 
            />
          </svg>
        )}
      </div>

      {/* Brand Typography */}
      {!isMarkOnly && (
        <div className="flex flex-col text-left">
          <span 
            className={`font-serif font-semibold tracking-tight leading-none transition-colors ${titleSizes} ${
              isDark 
                ? 'text-[#28231D] group-hover:text-[#446353]' 
                : 'text-[#FAF7F2] group-hover:text-[#E7EFEA]'
            }`}
          >
            {BUSINESS_CONFIG.brandName}
          </span>
          {showTagline && (
            <span 
              className={`text-[10px] uppercase tracking-[0.22em] font-sans font-medium mt-1 ${
                isDark ? 'text-[#8C8275]' : 'text-[#AFA496]'
              }`}
            >
              Spa & Wellness · {BUSINESS_CONFIG.city}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
