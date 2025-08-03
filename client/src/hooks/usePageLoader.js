import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

// Hook for page-level loading states
export const usePageLoader = (initialLoading = true, minLoadTime = 800) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const { showPageLoader, hidePageLoader } = useLoading();

  useEffect(() => {
    if (initialLoading) {
      showPageLoader('Loading page...');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        hidePageLoader();
      }, minLoadTime);

      return () => clearTimeout(timer);
    }
  }, [initialLoading, minLoadTime, showPageLoader, hidePageLoader]);

  const startLoading = (message = 'Loading...') => {
    setIsLoading(true);
    showPageLoader(message);
  };

  const stopLoading = () => {
    setIsLoading(false);
    hidePageLoader();
  };

  return {
    isLoading,
    startLoading,
    stopLoading
  };
};

// Hook for async operations with loading
export const useAsyncLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showLoader, hideLoader } = useLoading();

  const executeWithLoader = async (asyncFunction, message = 'Processing...') => {
    setIsLoading(true);
    showLoader(message);

    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      console.error('Async operation failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  return {
    isLoading,
    executeWithLoader
  };
};

// Hook for navigation with loading
export const useNavigationLoader = () => {
  const { showPageLoader, hidePageLoader } = useLoading();

  const navigateWithLoader = (navigateFunction, message = 'Loading page...') => {
    showPageLoader(message);
    
    // Execute navigation
    navigateFunction();
    
    // Hide loader after a delay (will be overridden by route change effect)
    setTimeout(() => {
      hidePageLoader();
    }, 1000);
  };

  return { navigateWithLoader };
};

export default usePageLoader;