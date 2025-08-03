import React from 'react';
import { useLoading } from '../../context/LoadingContext';
import LoadingLink from './LoadingLink';

const LoadingTest = () => {
  const { showLoader, hideLoader, showPageLoader, hidePageLoader } = useLoading();

  const testGlobalLoader = () => {
    showLoader('Testing global loader...');
    setTimeout(() => hideLoader(), 400);
  };

  const testPageLoader = () => {
    showPageLoader('Testing page loader...');
    setTimeout(() => hidePageLoader(), 400);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Loading System Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testGlobalLoader}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mr-4"
        >
          Test Global Loader
        </button>
        
        <button
          onClick={testPageLoader}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg mr-4"
        >
          Test Page Loader
        </button>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Navigation with Loading:</h3>
          <div className="space-x-4">
            <LoadingLink 
              to="/" 
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg inline-block"
              loadingMessage="Going to Home..."
            >
              Home
            </LoadingLink>
            
            <LoadingLink 
              to="/about" 
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg inline-block"
              loadingMessage="Going to About..."
            >
              About
            </LoadingLink>
            
            <LoadingLink 
              to="/yogeshwari-devi" 
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg inline-block"
              loadingMessage="Going to Yogeshwari Devi..."
            >
              Yogeshwari Devi
            </LoadingLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTest;