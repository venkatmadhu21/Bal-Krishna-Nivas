import React, { useState } from 'react';
import Loader, { FullScreenLoader, PageLoader, ButtonLoader } from './Loader';

const LoaderDemo = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 3000);
  };

  const showFullScreenLoader = () => {
    setShowFullScreen(true);
    setTimeout(() => setShowFullScreen(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
            Loader Components Demo
          </h1>
          <p className="text-slate-600">
            Different loader variations using the Bal Krishna icon
          </p>
        </div>

        {/* Loader Sizes */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Different Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-slate-700">Small</h3>
              <div className="flex justify-center">
                <Loader size="small" message="Loading..." />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="font-semibold text-slate-700">Medium</h3>
              <div className="flex justify-center">
                <Loader size="medium" message="Loading..." />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="font-semibold text-slate-700">Large</h3>
              <div className="flex justify-center">
                <Loader size="large" message="Loading..." />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="font-semibold text-slate-700">X-Large</h3>
              <div className="flex justify-center">
                <Loader size="xlarge" message="Loading..." />
              </div>
            </div>

          </div>
        </div>

        {/* Page Loader */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Page Loader</h2>
          <div className="border-2 border-dashed border-slate-200 rounded-xl">
            <PageLoader message="Loading page content..." />
          </div>
        </div>

        {/* Button Loader */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Button Loader</h2>
          <div className="flex flex-wrap gap-4">
            
            <button
              onClick={handleButtonClick}
              disabled={buttonLoading}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {buttonLoading ? (
                <>
                  <ButtonLoader size="small" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Click to Load</span>
              )}
            </button>

            <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl shadow-lg">
              <ButtonLoader size="small" />
              <span>Always Loading</span>
            </button>

          </div>
        </div>

        {/* Full Screen Loader Demo */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Full Screen Loader</h2>
          <div className="text-center">
            <button
              onClick={showFullScreenLoader}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Show Full Screen Loader (5 seconds)
            </button>
            <p className="text-sm text-slate-500 mt-2">
              Click to see the full screen loader overlay
            </p>
          </div>
        </div>

        {/* Custom Messages */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Custom Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="text-center">
              <Loader size="medium" message="Connecting to server..." />
            </div>

            <div className="text-center">
              <Loader size="medium" message="Preparing your content..." />
            </div>

            <div className="text-center">
              <Loader size="medium" message="Almost ready..." />
            </div>

            <div className="text-center">
              <Loader size="medium" message="" />
            </div>

          </div>
        </div>

      </div>

      {/* Full Screen Loader */}
      {showFullScreen && (
        <FullScreenLoader message="Loading Bal Krishna Nivas..." />
      )}
    </div>
  );
};

export default LoaderDemo;