import React, { useState, useEffect } from 'react';
import { FullScreenLoader } from './Loader';

const PageLifecycleLoader = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    // Handle page load/reload
    const handlePageLoad = () => {
      if (document.readyState === 'loading') {
        setShowLoader(true);
        setLoadingMessage('Loading Bal Krishna Nivas...');
      }
    };

    // Handle page before unload (refresh/close)
    const handleBeforeUnload = (event) => {
      setShowLoader(true);
      setLoadingMessage('Refreshing page...');
      // Note: Modern browsers may not show custom messages
      event.returnValue = '';
    };

    // Handle page visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is being hidden
        setLoadingMessage('Tab switching...');
      } else {
        // Tab is becoming visible again
        setShowLoader(true);
        setLoadingMessage('Restoring page...');
        
        // Hide loader after a short delay
        setTimeout(() => {
          setShowLoader(false);
        }, 600);
      }
    };

    // Handle page focus/blur (window focus changes)
    const handleFocus = () => {
      setShowLoader(true);
      setLoadingMessage('Restoring focus...');
      
      setTimeout(() => {
        setShowLoader(false);
      }, 400);
    };

    const handleBlur = () => {
      setLoadingMessage('Page unfocused...');
    };

    // Handle online/offline status
    const handleOnline = () => {
      setShowLoader(true);
      setLoadingMessage('Connection restored...');
      
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    };

    const handleOffline = () => {
      setShowLoader(true);
      setLoadingMessage('Connection lost...');
    };

    // Initial page load check
    if (document.readyState === 'loading') {
      setShowLoader(true);
      setLoadingMessage('Loading Bal Krishna Nivas...');
    }

    // Hide loader when page is fully loaded
    const handleDOMContentLoaded = () => {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    // Handle initial load
    if (document.readyState === 'complete') {
      setTimeout(() => {
        setShowLoader(false);
      }, 500);
    }

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);

  if (!showLoader) return null;

  return <FullScreenLoader message={loadingMessage} />;
};

export default PageLifecycleLoader;