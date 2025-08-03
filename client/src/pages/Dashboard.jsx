import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Newspaper, 
  Calendar, 
  User,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    {
      title: 'Family Members',
      value: '156',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12 this month'
    },
    {
      title: 'Recent News',
      value: '8',
      icon: Newspaper,
      color: 'bg-green-500',
      change: '3 new this week'
    },
    {
      title: 'Upcoming Events',
      value: '5',
      icon: Calendar,
      color: 'bg-purple-500',
      change: '2 this month'
    },
    {
      title: 'Active Users',
      value: '89',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5 this week'
    }
  ];

  const recentNews = [
    {
      id: 1,
      title: 'Annual Family Reunion 2024 Announced',
      summary: 'Join us for our biggest family gathering of the year...',
      author: 'Rajesh Gogte',
      date: '2 days ago',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: 'New Baby Born in the Family',
      summary: 'Congratulations to Priya and Amit on their new arrival...',
      author: 'Sunita Gogte',
      date: '5 days ago',
      likes: 45,
      comments: 12
    },
    {
      id: 3,
      title: 'Family Business Milestone Achievement',
      summary: 'Our family business has reached a significant milestone...',
      author: 'Mohan Gogte',
      date: '1 week ago',
      likes: 32,
      comments: 6
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Diwali Celebration',
      date: 'Nov 12, 2024',
      time: '6:00 PM',
      location: 'Community Hall',
      attendees: 45
    },
    {
      id: 2,
      title: 'Monthly Family Meeting',
      date: 'Nov 20, 2024',
      time: '10:00 AM',
      location: 'Gogte Residence',
      attendees: 12
    },
    {
      id: 3,
      title: 'Children\'s Birthday Party',
      date: 'Nov 25, 2024',
      time: '4:00 PM',
      location: 'Garden Area',
      attendees: 28
    }
  ];

  return (
    <div className="space-y-6 xs:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-4 xs:p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-primary-100 text-sm xs:text-base sm:text-lg">
              Here's what's happening in your family community today.
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="bg-white/10 rounded-full p-3 xs:p-4">
              <User size={40} className="xs:w-[48px] xs:h-[48px] text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 xs:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl xs:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs xs:text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} rounded-full p-2 xs:p-3`}>
                <stat.icon size={20} className="xs:w-[24px] xs:h-[24px] text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8">
        {/* Recent News */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-4 xs:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg xs:text-xl font-semibold text-gray-900 flex items-center">
                <Newspaper className="mr-2" size={20} />
                <span className="xs:inline">Recent News</span>
              </h2>
              <Link 
                to="/news" 
                className="text-primary-600 hover:text-primary-700 text-xs xs:text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-4 xs:p-6">
            <div className="space-y-4">
              {recentNews.map((news) => (
                <div key={news.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{news.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>By {news.author}</span>
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {news.date}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        {news.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle size={12} className="mr-1" />
                        {news.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="mr-2" size={24} />
                Upcoming Events
              </h2>
              <Link 
                to="/events" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {event.date} at {event.time}
                    </p>
                    <p className="flex items-center">
                      <Users size={14} className="mr-2" />
                      {event.attendees} attending
                    </p>
                  </div>
                  <div className="mt-3">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/family-tree"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
          >
            <Users className="text-primary-600 mr-3 group-hover:scale-110 transition-transform" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Explore Family Tree</h3>
              <p className="text-sm text-gray-600">View family relationships</p>
            </div>
          </Link>
          
          <Link
            to="/news"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
          >
            <Newspaper className="text-primary-600 mr-3 group-hover:scale-110 transition-transform" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Read Latest News</h3>
              <p className="text-sm text-gray-600">Stay updated with family</p>
            </div>
          </Link>
          
          <Link
            to="/events"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
          >
            <Calendar className="text-primary-600 mr-3 group-hover:scale-110 transition-transform" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900">View Events</h3>
              <p className="text-sm text-gray-600">Check upcoming events</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;