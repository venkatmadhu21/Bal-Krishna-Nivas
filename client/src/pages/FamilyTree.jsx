import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Eye } from 'lucide-react';

const FamilyTree = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('all');
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'list'

  // Mock family data - replace with actual API data
  const familyMembers = [
    {
      id: 1,
      firstName: 'Ramesh',
      lastName: 'Gogte',
      generation: 1,
      isAlive: false,
      dateOfBirth: '1920-05-15',
      dateOfDeath: '1995-12-20',
      spouse: 'Sushila Gogte',
      children: ['Mohan Gogte', 'Rajesh Gogte', 'Sunita Gogte'],
      profilePicture: null
    },
    {
      id: 2,
      firstName: 'Mohan',
      lastName: 'Gogte',
      generation: 2,
      isAlive: true,
      dateOfBirth: '1945-08-10',
      spouse: 'Lata Gogte',
      children: ['Amit Gogte', 'Priya Gogte'],
      profilePicture: null
    },
    {
      id: 3,
      firstName: 'Rajesh',
      lastName: 'Gogte',
      generation: 2,
      isAlive: true,
      dateOfBirth: '1948-03-22',
      spouse: 'Meera Gogte',
      children: ['Vikram Gogte', 'Kavya Gogte'],
      profilePicture: null
    },
    {
      id: 4,
      firstName: 'Amit',
      lastName: 'Gogte',
      generation: 3,
      isAlive: true,
      dateOfBirth: '1975-11-05',
      spouse: 'Neha Gogte',
      children: ['Arjun Gogte'],
      profilePicture: null
    }
  ];

  const generations = [
    { value: 'all', label: 'All Generations' },
    { value: '1', label: 'Generation 1' },
    { value: '2', label: 'Generation 2' },
    { value: '3', label: 'Generation 3' },
    { value: '4', label: 'Generation 4' }
  ];

  const filteredMembers = familyMembers.filter(member => {
    const matchesSearch = `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGeneration = selectedGeneration === 'all' || member.generation.toString() === selectedGeneration;
    return matchesSearch && matchesGeneration;
  });

  const FamilyMemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          {member.profilePicture ? (
            <img 
              src={member.profilePicture} 
              alt={`${member.firstName} ${member.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <Users size={24} className="text-gray-400" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {member.firstName} {member.lastName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              member.isAlive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              Generation {member.generation}
            </span>
          </div>
          
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>Born: {new Date(member.dateOfBirth).toLocaleDateString()}</p>
            {member.dateOfDeath && (
              <p>Died: {new Date(member.dateOfDeath).toLocaleDateString()}</p>
            )}
            {member.spouse && <p>Spouse: {member.spouse}</p>}
            {member.children && member.children.length > 0 && (
              <p>Children: {member.children.join(', ')}</p>
            )}
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button className="flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm hover:bg-primary-200 transition-colors">
              <Eye size={14} className="mr-1" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3" size={32} />
              Family Tree
            </h1>
            <p className="text-gray-600 mt-2">
              Explore your family lineage and relationships across generations
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={20} className="mr-2" />
            Add Member
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search family members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {generations.map(gen => (
                  <option key={gen.value} value={gen.value}>{gen.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewMode === 'tree' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tree View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                List View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Family Members Display */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map(member => (
            <FamilyMemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="text-center py-20">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Interactive Family Tree
            </h3>
            <p className="text-gray-600 mb-6">
              The visual family tree component will be implemented here with interactive nodes and connections.
            </p>
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Switch to List View
            </button>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">156</div>
          <div className="text-gray-600">Total Members</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">4</div>
          <div className="text-gray-600">Generations</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">89</div>
          <div className="text-gray-600">Living Members</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">67</div>
          <div className="text-gray-600">Deceased Members</div>
        </div>
      </div>

      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;