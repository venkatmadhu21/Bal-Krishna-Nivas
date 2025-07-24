import React, { useState } from 'react';
import { 
  Newspaper, 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  MessageCircle, 
  Eye,
  Clock,
  User
} from 'lucide-react';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState(null);

  // Mock news data - replace with actual API data
  const newsData = [
    {
      id: 1,
      title: 'Annual Family Reunion 2024 Announced',
      content: 'We are excited to announce our annual family reunion for 2024. This year\'s event will be bigger and better than ever before, with activities for all age groups. The reunion will take place at the beautiful Gogte Gardens, featuring traditional games, cultural performances, and a grand feast prepared by our family chefs.',
      summary: 'Join us for our biggest family gathering of the year with exciting activities and cultural performances.',
      author: {
        name: 'Rajesh Gogte',
        profilePicture: null
      },
      category: 'Announcement',
      publishDate: '2024-01-15T10:00:00Z',
      priority: 'High',
      images: [],
      likes: 24,
      comments: 8,
      views: 156,
      tags: ['reunion', 'family', 'celebration']
    },
    {
      id: 2,
      title: 'New Baby Born in the Family',
      content: 'Congratulations to Priya and Amit Gogte on the arrival of their beautiful baby boy! Little Arjun was born on January 10th, weighing 3.2 kg. Both mother and baby are healthy and doing well. The family is overjoyed with this new addition.',
      summary: 'Congratulations to Priya and Amit on their new arrival - baby Arjun!',
      author: {
        name: 'Sunita Gogte',
        profilePicture: null
      },
      category: 'Milestone',
      publishDate: '2024-01-12T14:30:00Z',
      priority: 'Medium',
      images: [],
      likes: 45,
      comments: 12,
      views: 203,
      tags: ['baby', 'birth', 'celebration']
    },
    {
      id: 3,
      title: 'Family Business Milestone Achievement',
      content: 'Our family business has reached a significant milestone by completing 50 years of successful operations. This achievement is a testament to the hard work and dedication of three generations of the Gogte family.',
      summary: 'Our family business celebrates 50 years of successful operations.',
      author: {
        name: 'Mohan Gogte',
        profilePicture: null
      },
      category: 'Achievement',
      publishDate: '2024-01-08T09:15:00Z',
      priority: 'High',
      images: [],
      likes: 32,
      comments: 6,
      views: 189,
      tags: ['business', 'milestone', 'achievement']
    },
    {
      id: 4,
      title: 'Traditional Cooking Workshop',
      content: 'Join our elderly family members for a traditional cooking workshop where they will share age-old recipes and cooking techniques passed down through generations.',
      summary: 'Learn traditional family recipes from our elderly members.',
      author: {
        name: 'Lata Gogte',
        profilePicture: null
      },
      category: 'Cultural',
      publishDate: '2024-01-05T16:45:00Z',
      priority: 'Medium',
      images: [],
      likes: 18,
      comments: 4,
      views: 98,
      tags: ['cooking', 'tradition', 'workshop']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'General', label: 'General' },
    { value: 'Announcement', label: 'Announcements' },
    { value: 'Achievement', label: 'Achievements' },
    { value: 'Milestone', label: 'Milestones' },
    { value: 'Memorial', label: 'Memorial' },
    { value: 'Celebration', label: 'Celebrations' },
    { value: 'Cultural', label: 'Cultural' }
  ];

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const NewsCard = ({ news }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            news.priority === 'High' ? 'bg-red-100 text-red-800' :
            news.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {news.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            news.priority === 'High' ? 'bg-red-100 text-red-800' :
            news.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {news.priority} Priority
          </span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer">
        {news.title}
      </h2>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {news.summary}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={12} />
            </div>
            <span>By {news.author.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{formatDate(news.publishDate)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Eye size={14} />
          <span>{news.views} views</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
            <Heart size={16} />
            <span>{news.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle size={16} />
            <span>{news.comments}</span>
          </button>
        </div>
        <button 
          onClick={() => setSelectedNews(news)}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Read More →
        </button>
      </div>

      {news.tags && news.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {news.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const NewsModal = ({ news, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{news.title}</h1>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span>By {news.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{formatDate(news.publishDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{news.views} views</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{news.content}</p>
          </div>
          
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Heart size={16} />
                <span>{news.likes} Likes</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageCircle size={16} />
                <span>{news.comments} Comments</span>
              </button>
            </div>
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
              <Newspaper className="mr-3" size={32} />
              Family News
            </h1>
            <p className="text-gray-600 mt-2">
              Stay updated with the latest family announcements, achievements, and milestones
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={20} className="mr-2" />
            Create News
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <Newspaper size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No news found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* News Modal */}
      {selectedNews && (
        <NewsModal 
          news={selectedNews} 
          onClose={() => setSelectedNews(null)} 
        />
      )}
    </div>
  );
};

export default News;