import React from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

const LoadingLink = ({ to, children, loadingMessage, className, onClick, ...props }) => {
  const { showLoader } = useLoading();

  const handleClick = (e) => {
    // Show loader with custom message for a very short time
    const message = loadingMessage || `Loading ${to.replace('/', '').replace('-', ' ')}...`;
    showLoader(message);
    
    // Auto-hide after a short delay
    setTimeout(() => {
      // The SimpleNavigationLoader will handle the actual loading
    }, 100);

    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LoadingLink;