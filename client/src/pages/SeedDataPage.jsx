import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const SeedDataPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSeedData = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);

      const response = await api.get('/api/seed');
      console.log('Seed response:', response.data);
      
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error seeding database:', err);
      setTimeout(() => {
        setError('Failed to seed database. Please try again later.');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Seed Database</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="mb-4">
          This page allows you to seed the database with comprehensive family data for the Gogte family.
          Clicking the button below will:
        </p>
        
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Clear any existing family members from the database</li>
          <li>Add detailed family data with 5 generations</li>
          <li>Create proper relationships between family members</li>
          <li>Include biographical information and birth dates</li>
        </ul>
        
        <div className="flex flex-col items-center">
          <button
            onClick={handleSeedData}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Seeding Database...' : 'Seed Database with Gogte Family Data'}
          </button>
          
          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Database seeded successfully! You can now explore the family tree.
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {success && (
        <div className="flex justify-center space-x-4">
          <Link 
            to="/family" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Family List
          </Link>
          <Link 
            to="/family/tree/1" 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            View Family Tree
          </Link>
        </div>
      )}
    </div>
  );
};

export default SeedDataPage;