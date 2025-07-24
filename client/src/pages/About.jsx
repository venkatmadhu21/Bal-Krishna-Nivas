import React from 'react';
import { 
  Users, 
  Heart, 
  Target, 
  Award,
  Globe,
  Shield,
  Star,
  TreePine
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Family Unity',
      description: 'Strengthening bonds across generations through shared experiences and traditions.',
      color: 'text-red-500'
    },
    {
      icon: Shield,
      title: 'Heritage Preservation',
      description: 'Safeguarding our cultural legacy and passing it on to future generations.',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      title: 'Global Connection',
      description: 'Connecting family members worldwide through modern technology.',
      color: 'text-green-500'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Striving for excellence in all our endeavors while maintaining our values.',
      color: 'text-yellow-500'
    }
  ];

  const stats = [
    { number: '200+', label: 'Family Members', icon: Users },
    { number: '4', label: 'Generations', icon: TreePine },
    { number: '50+', label: 'Years of Legacy', icon: Award },
    { number: '15+', label: 'Cities Connected', icon: Globe }
  ];

  const team = [
    {
      name: 'Rajesh Gogte',
      role: 'Family Elder & Advisor',
      description: 'Guiding the family with wisdom and experience spanning decades.',
      image: null
    },
    {
      name: 'Mohan Gogte',
      role: 'Community Coordinator',
      description: 'Organizing events and maintaining family connections.',
      image: null
    },
    {
      name: 'Sunita Gogte',
      role: 'Cultural Coordinator',
      description: 'Preserving traditions and organizing cultural activities.',
      image: null
    },
    {
      name: 'Priya Gogte',
      role: 'Youth Coordinator',
      description: 'Engaging younger generations and modernizing family activities.',
      image: null
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white rounded-2xl p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-serif mb-6">
            About Bal Krishna Nivas
          </h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            A digital home where tradition meets technology, connecting families 
            across generations and geographical boundaries while preserving our 
            rich cultural heritage.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
              <Users size={48} className="text-primary-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary-500">
          <div className="flex items-center mb-6">
            <div className="bg-primary-100 rounded-full p-3 mr-4">
              <Target className="text-primary-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800">Our Mission</h2>
          </div>
          <p className="text-secondary-600 leading-relaxed">
            To create a unified digital platform that strengthens family bonds, 
            preserves our cultural heritage, and facilitates meaningful connections 
            between family members across the globe. We strive to honor our past 
            while embracing the future.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-secondary-500">
          <div className="flex items-center mb-6">
            <div className="bg-secondary-100 rounded-full p-3 mr-4">
              <Award className="text-secondary-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800">Our Vision</h2>
          </div>
          <p className="text-secondary-600 leading-relaxed">
            To be the cornerstone of family unity, where every member feels 
            connected, valued, and proud of their heritage. We envision a future 
            where technology serves as a bridge between generations, not a barrier.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">Our Core Values</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            These fundamental principles guide everything we do and shape our family community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-secondary-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <value.icon className={value.color} size={32} />
              </div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">{value.title}</h3>
              <p className="text-secondary-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-secondary-800 to-secondary-700 rounded-xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Family in Numbers</h2>
          <p className="text-secondary-200">
            These numbers represent the strength and reach of our family community.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-primary-300" size={24} />
              </div>
              <div className="text-3xl font-bold text-primary-300 mb-2">{stat.number}</div>
              <div className="text-secondary-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">Family Leadership</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Meet the dedicated family members who help coordinate and maintain our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <Users className="text-white" size={32} />
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-1">{member.name}</h3>
              <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
              <p className="text-secondary-600 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Family Community</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Be part of something bigger. Connect with your family, share your stories, 
          and help preserve our heritage for future generations.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;