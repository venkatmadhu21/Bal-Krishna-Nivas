import React from 'react';
import iconBal from '../../assets/images/ion-bal.jpg';

const Loader = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
    xlarge: 'w-48 h-48'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Simplified Animated Image Container */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 via-orange-500/40 to-orange-600/30 blur-xl animate-pulse" style={{ animationDuration: '0.6s' }}></div>
        
        {/* Image Container */}
        <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-lg shadow-orange-500/20 animate-bounce`} style={{ animationDuration: '0.4s' }}>
          {/* Image */}
          <img 
            src={iconBal} 
            alt="Bal Krishna" 
            className="w-full h-full object-cover"
          />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
        </div>
        
        {/* Simplified Dots */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDuration: '0.5s' }}></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}></div>
        </div>
      </div>

      {/* Loading Text */}
      {message && (
        <div className="text-center space-y-2">
          <p className={`${textSizes[size]} font-semibold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent animate-pulse`} style={{ animationDuration: '0.6s' }}>
            {message}
          </p>
          
          {/* Loading Dots */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDuration: '0.3s' }}></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDuration: '0.3s', animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-700 rounded-full animate-bounce" style={{ animationDuration: '0.3s', animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      {/* Custom Styles are now in global CSS */}
    </div>
  );
};

// Full Screen Loader Component
export const FullScreenLoader = ({ message = 'Loading...', showLogo = true }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-slate-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Loader */}
      <div className="relative z-10">
        {showLogo && (
          <div className="text-center mb-8">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
              Bal Krishna Nivas
            </h1>
            <p className="text-sm xs:text-base text-slate-600">
              Divine Blessings & Sacred Traditions
            </p>
          </div>
        )}
        
        <Loader size="large" message={message} />
      </div>
    </div>
  );
};

// Page Loader Component (smaller, for page transitions)
export const PageLoader = ({ message = 'Loading page...' }) => {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader size="medium" message={message} />
    </div>
  );
};

// Button Loader Component (tiny, for buttons)
export const ButtonLoader = ({ size = 'small' }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader size={size} message="" />
    </div>
  );
};

export default Loader;