import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  MapPin, 
  Users,
  Award,
  Building,
  Heart,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const History = () => {
  const [expandedTimeline, setExpandedTimeline] = useState(null);

  const timeline = [
    {
      year: '1920',
      title: 'The Foundation',
      description: 'Ramesh Gogte established the family roots in Mumbai, starting with humble beginnings and strong values.',
      details: 'Ramesh Gogte, born in a small village in Maharashtra, moved to Mumbai with dreams of building a better future for his family. He started a small trading business and established the first Gogte residence, which would later become known as "Bal Krishna Nivas".',
      icon: Building,
      color: 'bg-blue-500'
    },
    {
      year: '1945',
      title: 'Post-Independence Growth',
      description: 'The family business expanded significantly after India\'s independence, establishing multiple ventures.',
      details: 'Following India\'s independence, the Gogte family seized new opportunities. The business diversified into textiles, real estate, and trading. The family also became actively involved in community development and social causes.',
      icon: Award,
      color: 'bg-green-500'
    },
    {
      year: '1960',
      title: 'Second Generation Leadership',
      description: 'Mohan and Rajesh Gogte took over family responsibilities, modernizing operations.',
      details: 'The second generation brought fresh perspectives and modern business practices. They established formal education funds for family members and started the tradition of annual family reunions.',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      year: '1980',
      title: 'Cultural Renaissance',
      description: 'Emphasis on preserving cultural traditions while embracing modernity.',
      details: 'The family established cultural committees to preserve traditional practices, languages, and customs. They also started documenting family history and genealogy systematically.',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      year: '2000',
      title: 'Digital Age Adaptation',
      description: 'The family embraced technology to stay connected across geographical boundaries.',
      details: 'With family members spread across different cities and countries, the family adopted digital communication tools. Email lists, family websites, and later social media groups helped maintain connections.',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      year: '2024',
      title: 'Bal Krishna Nivas Portal',
      description: 'Launch of the comprehensive family management platform.',
      details: 'The culmination of decades of family unity efforts, this digital platform brings together all aspects of family life - from genealogy and news to events and cultural preservation.',
      icon: BookOpen,
      color: 'bg-primary-500'
    }
  ];

  const milestones = [
    {
      title: 'First Family Business',
      year: '1925',
      description: 'Established the first trading company',
      icon: Building
    },
    {
      title: 'Educational Foundation',
      year: '1965',
      description: 'Created scholarship fund for family education',
      icon: BookOpen
    },
    {
      title: 'Cultural Center',
      year: '1985',
      description: 'Built community center for family gatherings',
      icon: Heart
    },
    {
      title: 'Global Expansion',
      year: '2005',
      description: 'Family members established in 15+ cities worldwide',
      icon: MapPin
    }
  ];

  const traditions = [
    {
      name: 'Annual Family Reunion',
      description: 'A grand gathering bringing together family members from across the globe',
      established: '1962',
      participants: '150+ members'
    },
    {
      name: 'Cultural Festival',
      description: 'Celebrating traditional festivals with authentic rituals and customs',
      established: '1970',
      participants: '200+ members'
    },
    {
      name: 'Educational Awards',
      description: 'Recognizing academic achievements of young family members',
      established: '1975',
      participants: '50+ recipients'
    },
    {
      name: 'Heritage Documentation',
      description: 'Systematic recording of family history, stories, and genealogy',
      established: '1990',
      participants: 'All generations'
    }
  ];

  const toggleTimeline = (index) => {
    setExpandedTimeline(expandedTimeline === index ? null : index);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-secondary-800 via-secondary-700 to-primary-800 text-white rounded-2xl p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-serif mb-6">
            Our Family Heritage
          </h1>
          <p className="text-xl text-secondary-200 mb-8 leading-relaxed">
            A century-long journey of growth, tradition, and unity. Discover the 
            rich history that shaped the Gogte family legacy and continues to 
            inspire future generations.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
              <BookOpen size={48} className="text-primary-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">Family Timeline</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Journey through the decades and discover the key moments that shaped our family story.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary-200"></div>

          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline Dot */}
                <div className={`${event.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10`}>
                  <event.icon className="text-white" size={24} />
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-secondary-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">{event.year}</span>
                        <h3 className="text-xl font-semibold text-secondary-800 mt-1">{event.title}</h3>
                      </div>
                      <button
                        onClick={() => toggleTimeline(index)}
                        className="text-secondary-500 hover:text-secondary-700 transition-colors"
                      >
                        {expandedTimeline === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </button>
                    </div>
                    
                    <p className="text-secondary-600 mb-4">{event.description}</p>
                    
                    {expandedTimeline === index && (
                      <div className="border-t border-secondary-200 pt-4 mt-4">
                        <p className="text-secondary-700 leading-relaxed">{event.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">Key Milestones</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Significant achievements that mark important chapters in our family journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                <milestone.icon className="text-white" size={28} />
              </div>
              <div className="text-lg font-bold text-primary-600 mb-1">{milestone.year}</div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">{milestone.title}</h3>
              <p className="text-secondary-600 text-sm">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Traditions Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Family Traditions</h2>
          <p className="text-primary-100 max-w-2xl mx-auto">
            Cherished customs and practices that have been passed down through generations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {traditions.map((tradition, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-3">{tradition.name}</h3>
              <p className="text-primary-100 mb-4 leading-relaxed">{tradition.description}</p>
              <div className="flex justify-between text-sm text-primary-200">
                <span>Since {tradition.established}</span>
                <span>{tradition.participants}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legacy Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-6">Our Living Legacy</h2>
          <p className="text-secondary-600 text-lg leading-relaxed mb-8">
            The Gogte family story is not just about the past—it's a living, breathing legacy 
            that continues to evolve with each new generation. From humble beginnings in 1920 
            to our modern digital platform, we've maintained our core values while adapting 
            to changing times.
          </p>
          <p className="text-secondary-600 leading-relaxed mb-8">
            Today, our family spans across continents, yet we remain united by shared values, 
            traditions, and the vision of our ancestors. The Bal Krishna Nivas platform 
            represents the next chapter in our story—a bridge between our rich past and 
            promising future.
          </p>
          <div className="bg-secondary-50 rounded-lg p-6 inline-block">
            <div className="flex items-center justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600">100+</div>
                <div className="text-sm text-secondary-600">Years of Heritage</div>
              </div>
              <div className="w-px h-12 bg-secondary-300"></div>
              <div>
                <div className="text-3xl font-bold text-primary-600">4</div>
                <div className="text-sm text-secondary-600">Generations</div>
              </div>
              <div className="w-px h-12 bg-secondary-300"></div>
              <div>
                <div className="text-3xl font-bold text-primary-600">200+</div>
                <div className="text-sm text-secondary-600">Family Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-secondary-800 to-secondary-700 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Be Part of Our Story</h2>
        <p className="text-secondary-200 mb-6 max-w-2xl mx-auto">
          Every family member has a story to tell and a role to play in our continuing legacy. 
          Join us in preserving our heritage and building our future together.
        </p>
        <div className="space-x-4">
          <button className="bg-primary-500 text-white hover:bg-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors">
            Share Your Story
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-secondary-800 px-8 py-3 rounded-lg font-semibold transition-colors">
            Explore Family Tree
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;