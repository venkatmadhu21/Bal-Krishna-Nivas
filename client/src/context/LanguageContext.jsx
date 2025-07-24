import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇺🇸',
      nativeName: 'English'
    },
    { 
      code: 'mr', 
      name: 'मराठी', 
      flag: '🇮🇳',
      nativeName: 'मराठी'
    }
  ];

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Sync with i18n language changes
  useEffect(() => {
    const handleLanguageChange = (language) => {
      setCurrentLanguage(language);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  const changeLanguage = (languageCode) => {
    if (languages.find(lang => lang.code === languageCode)) {
      setCurrentLanguage(languageCode);
      i18n.changeLanguage(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const value = {
    currentLanguage,
    languages,
    changeLanguage,
    getCurrentLanguage,
    t, // This is now the i18next translation function
    isMarathi: currentLanguage === 'mr',
    isEnglish: currentLanguage === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;