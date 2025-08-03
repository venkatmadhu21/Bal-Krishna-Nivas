import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import deviImage from '../assets/images/devi.png';
import deviAudio from '../assets/images/devi-audio.mp3';

const YogeshwariDevi = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  // Content in both languages
  const content = {
    en: {
      title: "Yogeshwari Devi",
      location: "Marathwada",
      backButton: "Back to Home",
      content: `Yogeshwari Devi of Ambajogai in Marathwada is the family deity (Kuladevi) of most Chitpavan Kokanastha Brahmins. Therefore, devotees come from all parts of Maharashtra for the darshan of this goddess.

For the Atrigotri Chitpavan Jogalekar families, this Dantasurmardini, Rajrajeshwari Devi is their special powerful Kulaswamini. The establishment of this Shri Yogeshwari Devi temple is believed to be about one and a half thousand years old.

The north-facing temple of Shri Yogeshwari Devi, built in Hemadpanti architecture, is located on the western bank of the Jayanti river flowing through the center of Ambajogai city.

The annual festivals of Shri Yogeshwar Devi are celebrated in the months of Ashwin and Margashirsha. The Shatchandi Havan is completed at the confluence of Ashtami and Navami tithis. In the month of Margashirsha, Ghatasthapana takes place from Shuddha Saptami and the Shatchandi Yajna is completed on the full moon day.

Margashirsha Purnima is the incarnation day of Shri Yogeshwari Devi. On this day, bhog is offered to the goddess.

It is believed that Jogalekar family members must have darshan of their Kulaswamini at least once in their lifetime. There is a tradition that couples should have darshan of the Kulaswamini after marriage.

Those going to Ambajogai for darshan of Shri Yogeshwari Devi or for religious ceremonies should take help from the Kshetra Upadhyayas of this temple:

1. Kshetra Upadhyaya Bhikaji Kashinath Pathakshastri
2. Kshetra Upadhyaya Vasant Martand Ausekar-Pathak`,
      footerNote: "🙏 May Shri Yogeshwari Devi bless all devotees with peace, prosperity, and spiritual growth 🙏"
    },
    mr: {
      title: "योगेश्वरी देवी",
      location: "मराठवाडा",
      backButton: "मुख्यपृष्ठावर परत जा",
      content: `मराठवाड्यातील आंबेजोगाईची अंबापुरवासिनी श्री योगेश्वरी देवी ही बहतेक सर्वच चित्तपावन कोकणस्थ ब्राह्मणांची कुलदेवता आहे. त्यामुळे महाराष्ट्रातील सर्व भागांतून या देवीच्या दर्शनास भक्तगण येत असतात.

अत्रिगोत्रीय चित्पावन जोगळेकर कुटुंबीयांची तर ही दंतासुरमर्दिनी, राजराजेश्वरीदेवी, विशेष शक्ती असलेली कुलस्वामिनीच आहे. ह्या श्री योगेश्वरी देवीच्या देवस्थानाच्या स्थापनेचा काळ सुमारे दीड हजार वर्षांपूर्वींचा मानला जातो.

आंबेजोगाई शहराच्या मध्यभागातून वाहणाऱ्या जयंती नदीच्या पश्चिमकाठावर श्री योगेश्वरी देवीचे, हेमाडपंती रचनेचे, उत्तराभिमुख मंदिर वसलेले आहे.

श्री योगेश्वर देवीचे वार्षिक उत्सव, अश्विन व मार्गशीर्ष महिन्यात साजरे केले जातात. अष्टमी व नवमी तिथीच्या संधिकालावर शतचंडी हवनावर पूर्णाहती होते. मार्गशीर्ष महिन्यांत शुध्द सप्तमीपासून घटस्थापना होऊन पौर्णिमेच्या दिवशी शतचंडी यज्ञाची पूर्णाहती होते.

मार्गशीर्ष पौर्णिमा हा श्री योगेश्वरी देवीचा अवतारदिवस आहे. या दिवशी देवीला भोग चढवितात.

जोगळेकर कुटुंबीय व्यक्तींना, कुलस्वामिनीचे आयुष्यात एकदा तरी दर्शन घेणे आवश्यक आहे असे मानतात. लग्नानंतर जोडप्याने कुलस्वामिनीचे दर्शन घेण्याची प्रथा आहे.

ह्या आंबेजोगाईच्या श्री योगेश्वरी देवीच्या दर्शनाला किंवा धर्मकृत्यांकरिता आंबेजोगाईस जाणाऱ्यांनी ह्या देवस्थानाचे क्षेत्रउपाध्याय यांची मदत घ्यावी:

१. क्षेत्र उपाध्याय भिकाजी काशिनाथ पाठकशास्त्री
२. क्षेत्र उपाध्याय वसंत मार्तंड औसेकर-पाठक`,
      footerNote: "🙏 श्री योगेश्वरी देवी सर्व भक्तांना शांती, समृद्धी आणि आध्यात्मिक वाढीचा आशीर्वाद देवो 🙏"
    }
  };

  // Auto-play audio when component mounts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && audioLoaded) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play prevented by browser:', error);
          // Auto-play was prevented, user will need to click play
        }
      }
    };

    if (audioLoaded) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(playAudio, 200);
      return () => clearTimeout(timer);
    }
  }, [audioLoaded]);



  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Audio playback error:', error);
      }
    }
  };

  const handleAudioLoad = () => {
    setAudioLoaded(true);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const currentContent = content[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 relative overflow-hidden">
      {/* Simple Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-orange-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-slate-200/20 to-slate-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-slate-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-20 xs:pt-24 sm:pt-28">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
          
          {/* Simple Navigation Bar */}
          <div className="backdrop-blur-xl bg-white/80 border border-slate-200/50 rounded-2xl shadow-xl shadow-slate-900/5 p-4 mb-8">
            <div className="flex justify-between items-center">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>{currentContent.backButton}</span>
              </button>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Audio Control Button */}
                <button
                  onClick={toggleAudio}
                  className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 font-medium ${
                    isPlaying 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-500/50 shadow-orange-500/20' 
                      : 'bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 text-orange-700 hover:text-orange-800 border-orange-200/50'
                  }`}
                  disabled={!audioLoaded}
                >
                  {isPlaying ? (
                    <VolumeX size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <Volume2 size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  )}
                  <span className="hidden sm:inline">
                    {isPlaying ? 'Pause' : 'Play'} Audio
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={deviAudio}
            onLoadedData={handleAudioLoad}
            onEnded={handleAudioEnd}
            preload="auto"
          />

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            
            {/* Simple Header */}
            <div className="text-center mb-12 xs:mb-16 sm:mb-20">
              {/* Title */}
              <div className="space-y-4 xs:space-y-6">
                <h1 className={`text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight tracking-tight ${
                  currentLanguage === 'mr' ? 'font-marathi text-3xl xs:text-4xl sm:text-5xl lg:text-6xl' : ''
                }`}>
                  {currentContent.title}
                </h1>
              </div>

              {/* Decorative Line */}
              <div className="mt-8 xs:mt-10 flex items-center justify-center">
                <div className="h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent w-32 xs:w-48 sm:w-64"></div>
                <div className="mx-4 w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent w-32 xs:w-48 sm:w-64"></div>
              </div>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Left Side - Devi Image */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  {/* Image Card */}
                  <div className="group relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-orange-500/10 to-orange-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Main Card */}
                    <div className="relative backdrop-blur-xl bg-white/90 border border-white/50 rounded-3xl shadow-2xl shadow-slate-900/10 overflow-hidden">
                      {/* Image Container */}
                      <div className="p-6 xs:p-8">
                        <div className="relative group/image">
                          {/* Image Glow */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Image */}
                          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/20">
                            <img 
                              src={deviImage} 
                              alt="Yogeshwari Devi"
                              className="w-full h-auto transition-all duration-700 group-hover/image:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                            {/* Sacred Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                              <div className="text-white text-4xl filter drop-shadow-2xl animate-pulse">🕉️</div>
                            </div>
                          </div>
                        </div>

                        {/* Caption */}
                        <div className="mt-6 text-center space-y-3">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200/30 rounded-full">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse"></div>
                            <p className={`text-sm xs:text-base font-bold bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent ${
                              currentLanguage === 'mr' ? 'font-marathi text-base xs:text-lg' : ''
                            }`}>
                              {currentContent.title}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-center gap-2 text-orange-600/80">
                            <span className="text-lg">🙏</span>
                            <p className="text-xs xs:text-sm font-medium">Divine Blessings</p>
                            <span className="text-lg">🙏</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Border Glow */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
                  
                  {/* Content Body */}
                  <div className="p-6 xs:p-8 sm:p-10">
                    
                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                      <div className={`text-base xs:text-lg sm:text-xl leading-8 xs:leading-9 sm:leading-10 whitespace-pre-line ${
                        currentLanguage === 'mr' ? 'font-marathi text-lg xs:text-xl sm:text-2xl leading-9 xs:leading-10 sm:leading-11' : ''
                      }`}>
                        {currentContent.content}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8 xs:mt-10">
                  <p className="text-sm xs:text-base text-gray-600 italic">
                    {currentContent.footerNote}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default YogeshwariDevi;