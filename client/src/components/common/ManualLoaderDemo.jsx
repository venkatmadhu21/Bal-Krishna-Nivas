import React, { useState } from 'react';
import { useLoading } from '../../context/LoadingContext';
import { ButtonLoader } from './Loader';

const ManualLoaderDemo = () => {
  const { showLoader, hideLoader } = useLoading();
  const [buttonLoading, setButtonLoading] = useState(false);

  const testQuickLoader = () => {
    showLoader('Quick test loading...');
    setTimeout(() => hideLoader(), 1000);
  };

  const testMediumLoader = () => {
    showLoader('Medium test loading...');
    setTimeout(() => hideLoader(), 2000);
  };

  const testButtonLoader = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Manual Loader Tests</h2>
      <p className="text-slate-600 mb-6">
        Test the loading system with these manual controls:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={testQuickLoader}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300"
        >
          Quick Loader (1s)
        </button>
        
        <button
          onClick={testMediumLoader}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-300"
        >
          Medium Loader (2s)
        </button>
        
        <button
          onClick={testButtonLoader}
          disabled={buttonLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-xl font-medium transition-all duration-300"
        >
          {buttonLoading ? (
            <>
              <ButtonLoader size="small" />
              <span>Loading...</span>
            </>
          ) : (
            <span>Button Loader</span>
          )}
        </button>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="font-semibold text-slate-700 mb-2">Navigation Loading:</h3>
        <p className="text-sm text-slate-600">
          Click any navbar link to see the quick navigation loader in action. 
          It shows for just 100ms to provide visual feedback without being intrusive.
        </p>
      </div>
    </div>
  );
};

export default ManualLoaderDemo;