import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, User, GitBranch } from 'lucide-react';
import api from '../utils/api';

const FamilyListPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/family');
        
        // Extract unique levels
        const uniqueLevels = [...new Set(res.data.map(member => member.level))].sort((a, b) => a - b);
        
        // Set a minimum loading time of 1 second for better UX
        setTimeout(() => {
          setMembers(res.data);
          setFilteredMembers(res.data);
          setLevels(uniqueLevels);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching family members:', err);
        setTimeout(() => {
          setError('Failed to load family members. Please try again later.');
          setLoading(false);
        }, 1000);
      }
    };

    fetchFamilyMembers();
  }, []);

  useEffect(() => {
    // Filter members based on search term and selected level
    let filtered = [...members];
    
    if (searchTerm) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.serNo.toString().includes(searchTerm)
      );
    }
    
    if (selectedLevel) {
      filtered = filtered.filter(member => member.level === parseInt(selectedLevel));
    }
    
    setFilteredMembers(filtered);
  }, [searchTerm, selectedLevel, members]);

  const handleLevelChange = async (level) => {
    setSelectedLevel(level);
    
    if (level) {
      try {
        setLoading(true);
        const res = await api.get(`/api/family/members?level=${level}`);
        
        // Set a minimum loading time of 1 second for better UX
        setTimeout(() => {
          setFilteredMembers(res.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching members by level:', err);
        setTimeout(() => {
          setError('Failed to load members by level. Please try again later.');
          setLoading(false);
        }, 1000);
      }
    } else {
      setLoading(true);
      // Set a minimum loading time of 1 second for better UX
      setTimeout(() => {
        setFilteredMembers(members);
        setLoading(false);
      }, 1000);
    }
  };

  if (loading && members.length === 0) return <div className="text-center py-10">Loading family members...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Family Members</h1>
        <Link 
          to="/family/tree/1" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
        >
          <GitBranch className="mr-2" size={16} />
          View Full Family Tree
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or serial number..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Level filter */}
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={selectedLevel}
              onChange={(e) => handleLevelChange(e.target.value)}
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No family members found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map(member => (
            <Link 
              key={member.serNo} 
              to={`/family/member/${member.serNo}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-full mr-3 ${member.gender === 'Male' ? 'bg-blue-100' : 'bg-pink-100'}`}>
                  <User className={`h-5 w-5 ${member.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Level {member.level}</span>
                    <span className="bg-gray-200 px-1.5 py-0.5 rounded-full text-xs">#{member.serNo}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm">
                {member.vansh && (
                  <p className="text-gray-600 mb-1">Vansh: {member.vansh}</p>
                )}
                
                {member.spouse && member.spouse.name && (
                  <p className="text-gray-600 mb-1">Spouse: {member.spouse.name}</p>
                )}
                
                {member.childrenSerNos && member.childrenSerNos.length > 0 && (
                  <p className="text-gray-600">Children: {member.childrenSerNos.length}</p>
                )}
              </div>
              
              <div className="mt-3 flex justify-end">
                <Link 
                  to={`/family/tree/${member.serNo}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitBranch className="mr-1" size={14} />
                  View Tree
                </Link>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyListPage;