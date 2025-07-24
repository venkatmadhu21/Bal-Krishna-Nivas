import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import BalKrishnaIcon from '../../assets/icons/BalKrishnaIcon';
import { 
  Home, 
  Users, 
  Newspaper, 
  Calendar, 
  User, 
  LogOut, 
  Menu,
  X,
  BookOpen,
  Info,
  Globe,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { currentLanguage, languages, changeLanguage, getCurrentLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  // Public navigation links (always visible)
  const publicNavLinks = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/about', label: t('nav.family'), icon: Info },
    { path: '/history', label: 'History', icon: BookOpen },
    { path: '/news', label: t('nav.news'), icon: Newspaper },
    { path: '/events', label: t('nav.events'), icon: Calendar },
  ];

  // Private navigation links (only when authenticated)
  const privateNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/family-tree', label: 'Family Tree', icon: Users },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[96%] max-w-8xl">
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 rounded-full shadow-2xl backdrop-blur-lg border border-orange-200/40 px-8 py-1">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-white to-orange-50 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 p-1 overflow-hidden">
              <img 
                src="/ion-bal.jpg" 
                alt="Bal Krishna Nivas Icon" 
                className="w-10 h-10 rounded-full object-cover drop-shadow-sm"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-white font-serif group-hover:text-orange-100 transition-colors">
                {t('home.title')}
              </h1>
              <p className="text-sm text-orange-100 font-medium">{t('home.subtitle')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {/* Public Links */}
            {publicNavLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  // Force navigation for home page
                  if (path === '/') {
                    e.preventDefault();
                    navigate('/', { replace: true });
                  }
                }}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-1.5 rounded-full text-base font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-white text-orange-600 shadow-lg transform scale-105'
                    : 'text-white hover:text-orange-100 hover:bg-white/25 hover:shadow-md hover:scale-105'
                }`}
              >
                <Icon size={18} />
                <span className="hidden lg:block">{label}</span>
                <span className="lg:hidden text-sm">{label.split(' ')[0]}</span>
              </Link>
            ))}

            {/* Private Links (when authenticated) */}
            {isAuthenticated && privateNavLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-1.5 rounded-full text-base font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-white text-orange-600 shadow-lg transform scale-105'
                    : 'text-white hover:text-orange-100 hover:bg-white/25 hover:shadow-md hover:scale-105'
                }`}
              >
                <Icon size={18} />
                <span className="hidden lg:block">{label}</span>
                <span className="lg:hidden text-sm">{label.split(' ')[0]}</span>
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative group ml-2" ref={languageDropdownRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 lg:px-4 py-1.5 rounded-full text-base font-medium text-white hover:bg-white/25 transition-all duration-300 hover:scale-105"
              >
                <Globe size={18} />
                <span className="hidden lg:block">
                  {getCurrentLanguage()?.name}
                </span>
                <span className="lg:hidden">
                  {getCurrentLanguage()?.flag}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-2 border border-orange-200 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-orange-50 ${
                        currentLanguage === language.code 
                          ? 'text-orange-600 bg-orange-50' 
                          : 'text-gray-700 hover:text-orange-600'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="font-medium">{language.name}</span>
                      {currentLanguage === language.code && (
                        <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Section */}
            <div className="ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-white/30">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 lg:px-4 py-1.5 rounded-full text-sm font-medium text-white hover:bg-white/25 transition-all duration-300 hover:scale-105">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <User size={14} className="text-orange-600" />
                    </div>
                    <span className="hidden lg:block">{user?.firstName}</span>
                    <div className="w-2 h-2 bg-orange-200 rounded-full animate-pulse"></div>
                  </button>
                  
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-orange-200">
                    <div className="px-4 py-3 border-b border-orange-100">
                      <p className="text-sm font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors rounded-lg mx-2"
                    >
                      <User size={16} />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-2"
                    >
                      <LogOut size={16} />
                      <span>{t('nav.signOut')}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-1 lg:space-x-2">
                  <Link
                    to="/login"
                    className="px-3 lg:px-4 py-1.5 text-sm font-medium text-white hover:text-orange-100 hover:bg-white/25 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    <span className="hidden lg:block">{t('nav.signIn')}</span>
                    <span className="lg:hidden">{t('nav.signIn')}</span>
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 lg:px-5 py-1.5 bg-white text-orange-600 text-sm font-medium rounded-full hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="hidden lg:block">{t('nav.joinFamily')}</span>
                    <span className="lg:hidden">{t('nav.joinFamily')}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/25 transition-all duration-300 hover:scale-110"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 p-4 space-y-2">
              {/* Public Links */}
              {publicNavLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    // Force navigation for home page
                    if (path === '/') {
                      e.preventDefault();
                      navigate('/', { replace: true });
                    }
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive(path)
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Private Links (when authenticated) */}
              {isAuthenticated && (
                <>
                  <div className="border-t border-orange-200 pt-2 mt-2">
                    {privateNavLinks.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive(path)
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t border-orange-200 pt-2 mt-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-300"
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}

              {/* Language Selector for Mobile */}
              <div className="border-t border-orange-200 pt-4 mt-4">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-gray-600 mb-2">{t('nav.language')} / भाषा</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          currentLanguage === language.code
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'bg-orange-100 text-gray-700 hover:bg-orange-200'
                        }`}
                      >
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Auth Section for Mobile */}
              {!isAuthenticated && (
                <div className="border-t border-orange-200 pt-4 mt-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-300"
                  >
                    {t('nav.signIn')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg"
                  >
                    {t('nav.joinFamily')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;