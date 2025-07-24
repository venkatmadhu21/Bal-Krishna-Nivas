import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Users, Newspaper, Calendar, TreePine } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('home.featuresSection.familyTree.title'),
      description: t('home.featuresSection.familyTree.description'),
      color: 'text-green-600'
    },
    {
      icon: Newspaper,
      title: t('home.featuresSection.familyNews.title'),
      description: t('home.featuresSection.familyNews.description'),
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: t('home.featuresSection.events.title'),
      description: t('home.featuresSection.events.description'),
      color: 'text-purple-600'
    },
    {
      icon: TreePine,
      title: t('home.featuresSection.heritage.title'),
      description: t('home.featuresSection.heritage.description'),
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen pt-28 relative">
      {/* Hero Section */}
      <div id="main-content" className="relative bg-white text-secondary-800 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="lg:text-left text-center relative order-2 lg:order-1">
              
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
                🏠 {t('home.subtitle')}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight text-secondary-800">
                {t('home.welcomeTitle')}<br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {t('home.title')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-secondary-600 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                {t('home.description')}
              </p>
              
              {/* Features highlights */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center lg:justify-start justify-center space-x-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                  <span className="text-secondary-600 group-hover:text-secondary-800 transition-colors">{t('home.features.familyTree')}</span>
                </div>
                <div className="flex items-center lg:justify-start justify-center space-x-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                  <span className="text-secondary-600 group-hover:text-secondary-800 transition-colors">{t('home.features.culturalEvents')}</span>
                </div>
                <div className="flex items-center lg:justify-start justify-center space-x-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                  <span className="text-secondary-600 group-hover:text-secondary-800 transition-colors">{t('home.features.heritage')}</span>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:items-center">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                      style={{ backgroundColor: '#6B8E23' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#5A7A1F'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#6B8E23'}
                    >
                      {t('home.joinOurFamily')}
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-block hover:shadow-lg"
                      style={{ 
                        borderColor: '#6B8E23', 
                        backgroundColor: '#6B8E23'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#5A7A1F';
                        e.target.style.borderColor = '#5A7A1F';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#6B8E23';
                        e.target.style.borderColor = '#6B8E23';
                      }}
                    >
                      {t('home.signIn')}
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                  >
                    {t('home.goToDashboard')}
                  </Link>
                )}
              </div>
            </div>

            {/* Right side - Hero Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/hero.jpg" 
                    alt="Bal Krishna Nivas - Family Heritage" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback content when image doesn't load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hidden">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold">Family Heritage Image</p>
                      <p className="text-sm opacity-80">Add hero.jpg to public folder</p>
                    </div>
                  </div>
                </div>

                {/* Decorative border */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-3xl -z-10"></div>
                
                {/* Floating elements around image */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-orange-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 bg-orange-500 rounded-full opacity-70"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-800 mb-4">
              {t('home.featuresSection.title')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {t('home.featuresSection.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4 ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-secondary-800 mb-8">
              {t('home.about.title')}
            </h2>
            <div className="text-lg text-secondary-700 space-y-6">
              <p>
                {t('home.about.paragraph1')}
              </p>
              <p>
                {t('home.about.paragraph2')}
              </p>
              <p>
                {t('home.about.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('home.cta.description')}
            </p>
            <Link
              to="/register"
              className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ backgroundColor: '#6B8E23' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5A7A1F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6B8E23'}
            >
              {t('home.cta.createAccount')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;