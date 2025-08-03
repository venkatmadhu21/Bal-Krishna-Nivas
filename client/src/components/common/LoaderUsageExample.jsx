import React, { useState, useEffect } from 'react';
import { FullScreenLoader, PageLoader, ButtonLoader } from './Loader';

// Example 1: Page with loading state
const ExamplePageWithLoader = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData({ message: 'Data loaded successfully!' });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PageLoader message="Loading page data..." />;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Page Content</h2>
      <p>{data?.message}</p>
    </div>
  );
};

// Example 2: Component with full screen loader
const ExampleWithFullScreenLoader = () => {
  const [showLoader, setShowLoader] = useState(false);

  const handleLongOperation = async () => {
    setShowLoader(true);
    
    try {
      // Simulate long operation
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Operation completed!');
    } catch (error) {
      console.error('Operation failed:', error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={handleLongOperation}
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
      >
        Start Long Operation
      </button>

      {showLoader && (
        <FullScreenLoader message="Processing your request..." />
      )}
    </div>
  );
};

// Example 3: Form with button loader
const ExampleFormWithButtonLoader = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Form submitted successfully!');
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors"
        >
          {submitting ? (
            <>
              <ButtonLoader size="small" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Form</span>
          )}
        </button>
      </form>
    </div>
  );
};

// Usage Examples Component
const LoaderUsageExample = () => {
  const [activeExample, setActiveExample] = useState('page');

  const examples = {
    page: { component: ExamplePageWithLoader, title: 'Page Loader Example' },
    fullscreen: { component: ExampleWithFullScreenLoader, title: 'Full Screen Loader Example' },
    form: { component: ExampleFormWithButtonLoader, title: 'Form with Button Loader' }
  };

  const ActiveComponent = examples[activeExample].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
            Loader Usage Examples
          </h1>
          <p className="text-slate-600">
            Real-world examples of how to use the loader components
          </p>
        </div>

        {/* Example Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
            {Object.entries(examples).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setActiveExample(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeExample === key
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Example */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
            <h2 className="text-xl font-bold">{examples[activeExample].title}</h2>
          </div>
          <div className="min-h-[400px]">
            <ActiveComponent />
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4">How to Use</h3>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// Import the loader components
import { FullScreenLoader, PageLoader, ButtonLoader } from './components/common/Loader';

// 1. Page Loader - for loading page content
{loading && <PageLoader message="Loading..." />}

// 2. Full Screen Loader - for app-wide loading states
{showLoader && <FullScreenLoader message="Processing..." />}

// 3. Button Loader - for button loading states
<button disabled={loading}>
  {loading ? (
    <>
      <ButtonLoader size="small" />
      <span>Loading...</span>
    </>
  ) : (
    <span>Click Me</span>
  )}
</button>`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoaderUsageExample;