import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Clock, 
  Users,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock events data - replace with actual API data
  const eventsData = [
    {
      id: 1,
      title: 'Diwali Celebration 2024',
      description: 'Join us for a grand Diwali celebration with traditional rituals, cultural performances, and a community feast. This year\'s celebration will feature rangoli competition, traditional dance performances, and fireworks display.',
      eventType: 'Festival',
      startDate: '2024-11-12',
      endDate: '2024-11-12',
      startTime: '18:00',
      endTime: '23:00',
      venue: {
        name: 'Community Hall',
        address: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      organizer: {
        name: 'Rajesh Gogte',
        profilePicture: null
      },
      attendees: [
        { status: 'Going', count: 45 },
        { status: 'Maybe', count: 12 },
        { status: 'Not Going', count: 3 }
      ],
      maxAttendees: 100,
      status: 'Upcoming',
      priority: 'High',
      images: [],
      requirements: [
        { item: 'Decorations', isRequired: true, assignedTo: 'Sunita Gogte' },
        { item: 'Catering', isRequired: true, assignedTo: 'Mohan Gogte' },
        { item: 'Sound System', isRequired: true, assignedTo: null }
      ]
    },
    {
      id: 2,
      title: 'Monthly Family Meeting',
      description: 'Regular monthly meeting to discuss family matters, upcoming events, and important decisions. All family members are encouraged to attend.',
      eventType: 'Meeting',
      startDate: '2024-11-20',
      endDate: '2024-11-20',
      startTime: '10:00',
      endTime: '12:00',
      venue: {
        name: 'Gogte Residence',
        address: {
          street: '456 Family Lane',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400002'
        }
      },
      organizer: {
        name: 'Mohan Gogte',
        profilePicture: null
      },
      attendees: [
        { status: 'Going', count: 12 },
        { status: 'Maybe', count: 5 },
        { status: 'Not Going', count: 2 }
      ],
      maxAttendees: 25,
      status: 'Upcoming',
      priority: 'Medium',
      images: [],
      requirements: []
    },
    {
      id: 3,
      title: 'Children\'s Birthday Party',
      description: 'A fun-filled birthday celebration for all the children in our family. Games, cake, and lots of entertainment planned!',
      eventType: 'Birthday',
      startDate: '2024-11-25',
      endDate: '2024-11-25',
      startTime: '16:00',
      endTime: '20:00',
      venue: {
        name: 'Garden Area',
        address: {
          street: '789 Garden View',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400003'
        }
      },
      organizer: {
        name: 'Priya Gogte',
        profilePicture: null
      },
      attendees: [
        { status: 'Going', count: 28 },
        { status: 'Maybe', count: 8 },
        { status: 'Not Going', count: 1 }
      ],
      maxAttendees: 50,
      status: 'Upcoming',
      priority: 'Medium',
      images: [],
      requirements: [
        { item: 'Birthday Cake', isRequired: true, assignedTo: 'Lata Gogte' },
        { item: 'Games & Activities', isRequired: true, assignedTo: 'Amit Gogte' }
      ]
    },
    {
      id: 4,
      title: 'Annual Family Reunion',
      description: 'Our biggest family gathering of the year! Three days of fun, food, and family bonding.',
      eventType: 'Reunion',
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      startTime: '09:00',
      endTime: '22:00',
      venue: {
        name: 'Gogte Resort',
        address: {
          street: 'Resort Road',
          city: 'Lonavala',
          state: 'Maharashtra',
          pincode: '410401'
        }
      },
      organizer: {
        name: 'Family Committee',
        profilePicture: null
      },
      attendees: [
        { status: 'Going', count: 89 },
        { status: 'Maybe', count: 23 },
        { status: 'Not Going', count: 8 }
      ],
      maxAttendees: 150,
      status: 'Upcoming',
      priority: 'High',
      images: [],
      requirements: [
        { item: 'Accommodation', isRequired: true, assignedTo: 'Rajesh Gogte' },
        { item: 'Transportation', isRequired: true, assignedTo: 'Vikram Gogte' },
        { item: 'Food & Catering', isRequired: true, assignedTo: 'Sunita Gogte' }
      ]
    }
  ];

  const eventTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Birthday', label: 'Birthday' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'Wedding', label: 'Wedding' },
    { value: 'Festival', label: 'Festival' },
    { value: 'Reunion', label: 'Reunion' },
    { value: 'Memorial', label: 'Memorial' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Religious', label: 'Religious' },
    { value: 'Meeting', label: 'Meeting' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Ongoing', label: 'Ongoing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.eventType === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Upcoming':
        return <Clock size={16} className="text-blue-500" />;
      case 'Ongoing':
        return <AlertCircle size={16} className="text-orange-500" />;
      case 'Completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getTotalAttendees = (attendees) => {
    return attendees.reduce((total, group) => total + group.count, 0);
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.eventType === 'Festival' ? 'bg-purple-100 text-purple-800' :
            event.eventType === 'Birthday' ? 'bg-pink-100 text-pink-800' :
            event.eventType === 'Reunion' ? 'bg-blue-100 text-blue-800' :
            event.eventType === 'Meeting' ? 'bg-gray-100 text-gray-800' :
            'bg-green-100 text-green-800'
          }`}>
            {event.eventType}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.priority === 'High' ? 'bg-red-100 text-red-800' :
            event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {event.priority} Priority
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {getStatusIcon(event.status)}
          <span className="text-sm text-gray-600">{event.status}</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer">
        {event.title}
      </h2>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Calendar size={16} />
          <span>
            {formatDate(event.startDate)}
            {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} />
          <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin size={16} />
          <span>{event.venue.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users size={16} />
          <span>{getTotalAttendees(event.attendees)} attending</span>
          {event.maxAttendees && (
            <span className="text-gray-400">/ {event.maxAttendees} max</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Organized by {event.organizer.name}
        </div>
        <button 
          onClick={() => setSelectedEvent(event)}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details →
        </button>
      </div>
    </div>
  );

  const EventModal = ({ event, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.eventType === 'Festival' ? 'bg-purple-100 text-purple-800' :
              event.eventType === 'Birthday' ? 'bg-pink-100 text-pink-800' :
              event.eventType === 'Reunion' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {event.eventType}
            </span>
            <div className="flex items-center space-x-1">
              {getStatusIcon(event.status)}
              <span className="text-sm text-gray-600">{event.status}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-gray-600">
                      {formatDate(event.startDate)}
                      {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-gray-600">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Venue</div>
                    <div className="text-gray-600">
                      {event.venue.name}<br />
                      {event.venue.address.street}, {event.venue.address.city}<br />
                      {event.venue.address.state} {event.venue.address.pincode}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Organizer</div>
                    <div className="text-gray-600">{event.organizer.name}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance</h3>
              <div className="space-y-3">
                {event.attendees.map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className={`font-medium ${
                      group.status === 'Going' ? 'text-green-600' :
                      group.status === 'Maybe' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {group.status}
                    </span>
                    <span className="text-gray-900 font-semibold">{group.count}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total Attending</span>
                    <span>{getTotalAttendees(event.attendees)}</span>
                  </div>
                  {event.maxAttendees && (
                    <div className="text-sm text-gray-500 mt-1">
                      Maximum capacity: {event.maxAttendees}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">RSVP</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    Going
                  </button>
                  <button className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                    Maybe
                  </button>
                  <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    Can't Go
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {event.requirements && event.requirements.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-2">
                {event.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{req.item}</span>
                    <span className={`text-sm ${
                      req.assignedTo ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {req.assignedTo ? `Assigned to ${req.assignedTo}` : 'Needs assignment'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              <Calendar className="mr-3" size={32} />
              Family Events
            </h1>
            <p className="text-gray-600 mt-2">
              Discover and participate in upcoming family gatherings and celebrations
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={20} className="mr-2" />
            Create Event
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default Events;