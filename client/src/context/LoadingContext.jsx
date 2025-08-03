import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { FullScreenLoader } from '../components/common/Loader';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const loaderTimerRef = useRef(null);
  const maxLoaderTimeRef = useRef(null);

  // Function to clear all timers
  const clearAllTimers = () => {
    if (loaderTimerRef.current) {
      clearTimeout(loaderTimerRef.current);
      loaderTimerRef.current = null;
    }
    if (maxLoaderTimeRef.current) {
      clearTimeout(maxLoaderTimeRef.current);
      maxLoaderTimeRef.current = null;
    }
  };

  // Initial page load handling - simplified
  useEffect(() => {
    // Show loader on initial page load
    if (document.readyState !== 'complete') {
      setIsPageLoading(true);
      setLoadingMessage('Loading Bal Krishna Nivas...');
    }

    // Hide loader when page is fully loaded
    const handleLoad = () => {
      // Very short timeout to allow the UI to render
      loaderTimerRef.current = setTimeout(() => {
        setIsPageLoading(false);
      }, 100);
    };

    // Set a maximum time for the loader
    maxLoaderTimeRef.current = setTimeout(() => {
      setIsPageLoading(false);
    }, 300); // Maximum 300ms

    window.addEventListener('load', handleLoad);
    
    if (document.readyState === 'complete') {
      handleLoad();
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearAllTimers();
    };
  }, []);

  // Show loader for tab visibility changes - simplified
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden - do nothing
      } else {
        // Tab is visible again - very brief loader
        setIsPageLoading(true);
        setLoadingMessage('Restoring page...');
        
        loaderTimerRef.current = setTimeout(() => {
          setIsPageLoading(false);
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearAllTimers();
    };
  }, []);

  const showLoader = (message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
    
    // Set a maximum time for the loader
    maxLoaderTimeRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Maximum 300ms
  };

  const hideLoader = () => {
    setIsLoading(false);
    if (maxLoaderTimeRef.current) {
      clearTimeout(maxLoaderTimeRef.current);
      maxLoaderTimeRef.current = null;
    }
  };

  const showPageLoader = (message = 'Loading page...') => {
    setLoadingMessage(message);
    setIsPageLoading(true);
    
    // Set a maximum time for the loader
    maxLoaderTimeRef.current = setTimeout(() => {
      setIsPageLoading(false);
    }, 300); // Maximum 300ms
  };

  const hidePageLoader = () => {
    setIsPageLoading(false);
    if (maxLoaderTimeRef.current) {
      clearTimeout(maxLoaderTimeRef.current);
      maxLoaderTimeRef.current = null;
    }
  };

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const value = {
    isLoading,
    loadingMessage,
    isPageLoading,
    showLoader,
    hideLoader,
    showPageLoader,
    hidePageLoader,
    setLoadingMessage
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      
      {/* Global Loading Overlay */}
      {(isLoading || isPageLoading) && (
        <FullScreenLoader message={loadingMessage} />
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;