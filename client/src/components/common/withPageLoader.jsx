import React, { useState, useEffect } from 'react';
import { PageLoader } from './Loader';

const withPageLoader = (WrappedComponent, loadingMessage = 'Loading page...', minLoadTime = 300) => {
  return function WithPageLoaderComponent(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading time for better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadTime);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100">
          <PageLoader message={loadingMessage} />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withPageLoader;