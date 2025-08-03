import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="text-center bg-white rounded-xl shadow-lg p-6 xs:p-8 sm:p-10 lg:p-12 max-w-2xl mx-auto w-full">
        <div className="mb-4 xs:mb-6">
          <Info size={60} className="xs:w-[70px] xs:h-[70px] sm:w-[80px] sm:h-[80px] mx-auto text-primary-600 mb-3 xs:mb-4" />
        </div>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
          {t('about.title')}
        </h1>
        <p className="text-lg xs:text-xl text-gray-600 mb-6 xs:mb-8">
          {t('about.subtitle')}
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 xs:p-5 sm:p-6">
          <p className="text-base xs:text-lg text-primary-700 font-medium">
            ℹ️ {t('about.title')}
          </p>
          <p className="text-sm text-primary-600 mt-2">
            {t('about.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;