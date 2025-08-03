import React, { useState } from 'react';
import { Download, FileText, Image, Users, TreePine, Layout, List, Type } from 'lucide-react';
import { Link } from 'react-router-dom';

const PDFExportDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const exportFeatures = [
    {
      id: 'modern',
      title: 'Modern Tree View',
      description: 'Export the modern interactive family tree with clean design and visual hierarchy',
      icon: <TreePine className="h-6 w-6" />,
      color: 'blue',
      route: '/family/tree/1'
    },
    {
      id: 'card',
      title: 'Card View',
      description: 'Export family members displayed in card format with detailed information',
      icon: <Layout className="h-6 w-6" />,
      color: 'purple',
      route: '/family/tree/1'
    },
    {
      id: 'horizontal',
      title: 'Horizontal Tree',
      description: 'Export the horizontal family tree layout for wide-format printing',
      icon: <Image className="h-6 w-6" />,
      color: 'green',
      route: '/family/tree/1'
    },
    {
      id: 'vertical',
      title: 'Vertical Tree',
      description: 'Export the vertical family tree layout optimized for portrait printing',
      icon: <List className="h-6 w-6" />,
      color: 'orange',
      route: '/family/tree/1'
    },
    {
      id: 'text',
      title: 'Text Report',
      description: 'Export comprehensive text-based family report with statistics',
      icon: <Type className="h-6 w-6" />,
      color: 'red',
      route: '/family/tree/1'
    },
    {
      id: 'member',
      title: 'Member Details',
      description: 'Export individual family member profiles with complete information',
      icon: <Users className="h-6 w-6" />,
      color: 'indigo',
      route: '/family/member/1'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900',
      purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-900',
      green: 'from-green-50 to-green-100 border-green-200 text-green-900',
      orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-900',
      red: 'from-red-50 to-red-100 border-red-200 text-red-900',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-900'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Family Tree PDF Export System
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Export your family tree in multiple formats for offline viewing, printing, or sharing. 
          Choose from visual layouts or detailed text reports.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'features'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Export Options
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'instructions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            How to Use
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Comprehensive PDF Export System
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Visual Exports</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• High-quality image-based PDFs</li>
                  <li>• Multiple tree layout options</li>
                  <li>• Optimized for printing</li>
                  <li>• Maintains visual formatting</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Text Reports</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Detailed family statistics</li>
                  <li>• Structured text format</li>
                  <li>• Complete member information</li>
                  <li>• Professional formatting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <Download className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Export</h3>
              <p className="text-gray-600">
                One-click export functionality with automatic file naming and timestamp
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <FileText className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">
                Choose between visual tree exports or comprehensive text reports
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <Image className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">High Quality</h3>
              <p className="text-gray-600">
                High-resolution exports suitable for printing and professional use
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Features Tab */}
      {activeTab === 'features' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`bg-gradient-to-br ${getColorClasses(feature.color)} rounded-xl p-6 border`}
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
              </div>
              <p className="text-sm mb-4 opacity-80">
                {feature.description}
              </p>
              <Link
                to={feature.route}
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-80 rounded-lg hover:bg-opacity-100 transition-all text-sm font-medium"
              >
                Try Export
                <Download className="h-4 w-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Instructions Tab */}
      {activeTab === 'instructions' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Export Family Trees</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Navigate to Family Tree</h3>
                  <p className="text-gray-600">
                    Go to any family tree page or individual member profile. You can access these from the main family list.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your View</h3>
                  <p className="text-gray-600">
                    Select the tree view you want to export: Modern, Card, Horizontal, Vertical, or Text view.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Click Export</h3>
                  <p className="text-gray-600">
                    Look for the PDF export section and choose between Visual Export or Text Report options.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Download & Save</h3>
                  <p className="text-gray-600">
                    The PDF will be automatically generated and downloaded to your device with a descriptive filename.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Best Results</h3>
            <ul className="space-y-2 text-yellow-700">
              <li>• For large family trees, use horizontal or vertical layouts for better readability</li>
              <li>• Text reports are ideal for detailed documentation and record-keeping</li>
              <li>• Visual exports maintain the exact appearance of the tree as displayed</li>
              <li>• Files are automatically named with member names and timestamps</li>
            </ul>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8 border">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/family"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            View Family List
          </Link>
          <Link
            to="/family/tree/1"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <TreePine className="h-5 w-5 mr-2" />
            Family Tree
          </Link>
          <Link
            to="/family/member/1"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Member Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PDFExportDemo;