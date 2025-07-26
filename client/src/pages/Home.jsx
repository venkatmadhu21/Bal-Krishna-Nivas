import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [deviAudio, setDeviAudio] = useState(null);
  const [isDeviAudioPlaying, setIsDeviAudioPlaying] = useState(false);
  
  const texts = ['BalKrishna Nivas', 'बालकृष्ण निवास'];
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 100 : 150;
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Initialize audio for devi image
  useEffect(() => {
    console.log('Initializing Devi audio...');
    
    // Function to create a simple beep sound as fallback
    const createFallbackAudio = () => {
      console.log('Creating fallback audio...');
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const fallbackAudio = {
          play: () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            return Promise.resolve();
          },
          pause: () => {},
          currentTime: 0
        };
        setDeviAudio(fallbackAudio);
        console.log('✅ Fallback audio created');
      } catch (error) {
        console.log('❌ Could not create fallback audio:', error);
      }
    };
    
    // Try to load local audio file first
    const audio = new Audio('/devi-audio.mp3');
    
    let audioLoaded = false;
    
    // Add a timeout to trigger fallback if file doesn't load within 3 seconds
    const fallbackTimeout = setTimeout(() => {
      if (!audioLoaded) {
        console.log('⏰ Audio loading timeout, creating fallback...');
        createFallbackAudio();
      }
    }, 3000);
    
    audio.preload = 'metadata';
    audio.loop = false;
    audio.volume = 0.7;
    
    // Handle audio load success/failure
    audio.addEventListener('canplaythrough', () => {
      console.log('✅ Devi audio loaded successfully');
      console.log('Audio duration:', audio.duration);
      console.log('Audio ready state:', audio.readyState);
      audioLoaded = true;
      setDeviAudio(audio);
      clearTimeout(fallbackTimeout);
    });
    
    audio.addEventListener('loadstart', () => {
      console.log('🔄 Audio loading started...');
    });
    
    audio.addEventListener('loadeddata', () => {
      console.log('📊 Audio data loaded');
    });
    
    audio.addEventListener('loadedmetadata', () => {
      console.log('📋 Audio metadata loaded');
    });
    
    audio.addEventListener('error', (e) => {
      console.log('❌ Audio file error:', e);
      console.log('Error code:', e.target?.error?.code);
      console.log('Error message:', e.target?.error?.message);
      console.log('Audio src:', audio.src);
      
      // Create a fallback notification sound using Web Audio API
      createFallbackAudio();
    });

    return () => {
      clearTimeout(fallbackTimeout);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  // Simple audio initialization to prevent infinite loops
  useEffect(() => {
    let isMounted = true;
    
    const initAudio = () => {
      console.log('🎵 Setting up audio...');
      
      // Create a simple fallback audio object
      const audioObj = {
        play: async () => {
          console.log('🔊 Playing audio');
          try {
            // Try to play real audio first
            const realAudio = new Audio('/devi-audio.mp3');
            realAudio.volume = 0.7;
            await realAudio.play();
          } catch (error) {
            // Fallback to beep sound
            console.log('Using fallback beep');
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 440;
              gain.gain.value = 0.1;
              osc.start();
              osc.stop(ctx.currentTime + 0.3);
            } catch (fallbackError) {
              console.log('All audio failed');
            }
          }
        },
        pause: () => {},
        currentTime: 0,
        paused: true
      };
      
      if (isMounted) {
        setDeviAudio(audioObj);
        console.log('✅ Audio object ready');
      }
    };
    
    initAudio();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .typewriter-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.02em;
        }
        
        @keyframes typewriter-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(249, 115, 22, 0.3); }
          50% { text-shadow: 0 0 20px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3); }
        }
        
        .typewriter-text {
          animation: typewriter-glow 3s ease-in-out infinite;
        }
        
        .cursor-blink {
          animation: cursor-blink 1s infinite;
        }
        
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      
      <div className="min-h-screen pt-28 relative bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Three Images */}
      <div id="main-content" className="relative overflow-hidden">
        {/* Enhanced Background with Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #6b7280 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Hero Title Section */}
        <div className="relative z-10 text-center py-16">
          <div className="container mx-auto px-4">
            <div className="h-24 lg:h-32 flex items-center justify-center mb-6">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent tracking-tight min-h-[1.2em] flex items-center">
                <span className="typewriter-text">
                  {displayText}
                </span>
                <span className={`inline-block w-1 bg-orange-600 ml-2 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{height: '0.8em'}}>
                </span>
              </h1>
            </div>
          
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-64"></div>
              <div className="mx-4 w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-64"></div>
            </div>
            
            {/* Family Tree */}
            <div className="mb-12 w-full max-w-6xl mx-auto px-4">
              <div className="flex flex-col items-center">
                {/* Ganesh Gogte */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg px-8 py-4 shadow-md">
                    <span className="text-lg font-semibold text-gray-800">{t('familyNames.ganeshGogte')}</span>
                  </div>
                  {/* Vertical line */}
                  <div className="w-0.5 h-8 bg-orange-400"></div>
                </div>
                
                {/* Balard Gogte */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg px-8 py-4 shadow-md">
                    <span className="text-lg font-semibold text-gray-800">{t('familyNames.balardGogte')}</span>
                  </div>
                  {/* Vertical line */}
                  <div className="w-0.5 h-8 bg-orange-400"></div>
                </div>
                
                {/* Ramakrishna Gogte */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg px-8 py-4 shadow-md">
                    <span className="text-lg font-semibold text-gray-800">{t('familyNames.ramakrishnaGogte')}</span>
                  </div>
                  {/* Vertical line */}
                  <div className="w-0.5 h-8 bg-orange-400"></div>
                </div>
                
                {/* Three branches */}
                <div className="relative flex items-start justify-between w-full max-w-4xl mx-auto">
                  {/* Horizontal connecting line - spans full width */}
                  <div className="absolute w-full h-0.5 bg-orange-400 top-0"></div>
                  
                  {/* Balwant */}
                  <div className="flex flex-col items-center relative">
                    <div className="w-0.5 h-8 bg-orange-400"></div>
                    <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg px-7 py-4 shadow-md">
                      <span className="text-lg font-semibold text-gray-800">{t('familyNames.balwantGogte')}</span>
                    </div>
                  </div>
                  
                  {/* Ganesh */}
                  <div className="flex flex-col items-center relative">
                    <div className="w-0.5 h-8 bg-orange-400"></div>
                    <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg px-7 py-4 shadow-md">
                      <span className="text-lg font-semibold text-gray-800">{t('familyNames.ganeshGogte2')}</span>
                    </div>
                  </div>
                  
                  {/* Hari */}
                  <div className="flex flex-col items-center relative">
                    <div className="w-0.5 h-8 bg-orange-400"></div>
                    <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg px-7 py-4 shadow-md">
                      <span className="text-lg font-semibold text-gray-800">{t('familyNames.hariGogte')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center justify-center">
            
            {/* Left Image - para.jpg */}
            <div className="flex flex-col items-center group relative">
              <div className="relative w-full max-w-sm transform transition-all duration-500 hover:scale-105">
                <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src="/para.jpg" 
                      alt="Para" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hidden rounded-2xl">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-lg font-semibold">Sacred Image</p>
                      </div>
                    </div>
                    
                    {/* Text Overlay on Image - Parashurama Information */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl flex items-center justify-center p-4">
                      <div className="text-center text-white max-h-full overflow-y-auto">
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-xl lg:text-2xl font-bold text-orange-300 mb-2">परशुराम</h3>
                          <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto"></div>
                        </div>
                        
                        {/* Main Text */}
                        <div className="text-xs lg:text-sm leading-relaxed font-medium text-gray-100 max-w-full">
                          <p className="text-justify">
                            परशुराम हा जमदग्नी आणि रेणुकेचा मुलगा होता. जमदग्नी ब्राह्मण होता तर रेणुका क्षत्रिय अर्थात योद्धा कुळातील होती. परशुराम हा शिवाचा महान उपासक होता. शस्त्रविद्येत पारंगत असलेला परशुराम गुरु द्रोणाचार्य, कर्ण आणि अर्जुन या महापुरुषांचा तो शिक्षक होता असे मानले जाते. त्याने चित्पावन ब्राह्मण नावाच्या एका लहान समुदायाची चौदा गोत्र निर्माण केली. परशुरामाने चित्पावन ब्राह्मणांना वेद, युद्धनीती आणि युद्ध कला शिकवली. चित्पावन ब्राह्मण परशुरामांना "आदिपुरुष" किंवा मूळ पुरुष म्हणून संबोधतात
                          </p>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-orange-400/30">
                          <p className="text-xs text-orange-300 font-semibold">विष्णूचा षष्ठ अवतार</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute -inset-6 bg-gradient-to-r from-orange-400/10 via-orange-500/15 to-orange-600/10 rounded-3xl -z-10 blur-xl"></div>
                <div className="absolute -inset-3 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-3xl -z-20"></div>
              </div>
              
              {/* Image Label */}
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">परशुराम</h3>
                <p className="text-sm text-gray-600 max-w-xs">विष्णूचा षष्ठ अवतार - योद्धा ब्राह्मण</p>
              </div>
            </div>

            {/* Center Image - hero.jpg (Building) */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-6xl transform transition-all duration-700 hover:scale-[1.02]">
                <div className="relative w-full h-[300px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white p-3">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src="/hero.jpg" 
                      alt="BalKrishna Nivas - Building" 
                      className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent"></div>
                    
                    {/* Fallback content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hidden rounded-2xl">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-lg font-semibold">Sacred Architecture</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute -inset-8 bg-gradient-to-r from-orange-400/5 via-orange-500/10 to-orange-600/5 rounded-3xl -z-10 blur-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-200/30 to-gray-300/30 rounded-3xl -z-20"></div>
                
                {/* Floating Orbs with Enhanced Animation */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-70 animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full opacity-50 animate-bounce shadow-md"></div>
                <div className="absolute top-1/2 -left-10 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-60 animate-ping shadow-sm"></div>
                <div className="absolute top-1/4 -right-6 w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-40 animate-pulse"></div>
              </div>
              
              {/* Building Label */}
              <div className="mt-8 text-center max-w-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('home.buildingName')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('home.architecturalMarvel')}</p>
              </div>
            </div>

            {/* Right Column - shivv.webp and devi.png */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Shivv Image */}
              <div className="flex flex-col items-center group relative">
                <div className="relative w-full max-w-[220px] transform transition-all duration-500 hover:scale-110">
                  <div className="relative w-full h-44 lg:h-52 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src="/shivv.webp" 
                        alt="Shivv" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback content */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hidden rounded-xl">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-1 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold">Lord Shiva</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-2 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  
                  {/* Enhanced Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/15 to-orange-600/15 rounded-2xl -z-10 blur-lg"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-gray-200/40 to-gray-300/40 rounded-2xl -z-20"></div>
                </div>
                
                {/* Temple Popup - appears on hover */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 pointer-events-none z-[9999]">
                  <div className="relative w-[500px] h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border-6 border-orange-300">
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src="/temple.jpg" 
                        alt="Temple" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback content for temple */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hidden rounded-xl">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-2xl font-bold">Vyadeshwar Temple</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Temple label */}
                    <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-lg px-4 py-3 rounded-xl text-center font-bold shadow-lg">
                      🕉️ Vyadeshwar Temple, Guhagar 🕉️
                    </div>
                    
                    {/* Enhanced Glowing border effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl opacity-75 blur-lg -z-10"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-2xl opacity-50 blur-xl -z-20"></div>
                  </div>
                </div>
                
                {/* Image Label */}
                <div className="mt-4 text-center">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-2 border border-gray-200">
                    <p className="text-xs font-medium text-gray-700">Vyadeshwar, Guhagar</p>
                  </div>
                </div>
              </div>

              {/* Devi Image */}
              <div className="flex flex-col items-center group">
                <div className="relative w-full max-w-[220px] transform transition-all duration-500 hover:scale-110">
                  <div className="relative w-full h-44 lg:h-52 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      {/* Audio indicator */}
                      <div className={`absolute top-2 right-2 z-10 rounded-full p-1.5 transition-all duration-300 ${
                        isDeviAudioPlaying 
                          ? 'bg-green-500/80 opacity-100 scale-110' 
                          : 'bg-black/50 opacity-0 group-hover:opacity-100'
                      }`}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                          <path d="M14.657 2.757a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.243 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                      
                      {/* Debug test button */}
                      <button 
                        className="absolute bottom-2 left-2 z-10 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-50 hover:opacity-100"
                        onClick={async () => {
                          console.log('🧪 Test button clicked');
                          if (deviAudio) {
                            if (!deviAudio.paused) {
                              // Audio is playing, stop it
                              deviAudio.pause();
                              deviAudio.currentTime = 0;
                              setIsDeviAudioPlaying(false);
                              console.log('⏹️ Test audio stopped');
                            } else {
                              // Audio is not playing, start it
                              try {
                                deviAudio.currentTime = 0;
                                await deviAudio.play();
                                setIsDeviAudioPlaying(true);
                                console.log('✅ Test audio played successfully');
                              } catch (error) {
                                console.log('❌ Test audio failed:', error);
                              }
                            }
                          } else {
                            console.log('❌ No audio object for test');
                          }
                        }}
                      >
                        {deviAudio && !deviAudio.paused ? t('home.stopButton') : t('home.testButton')}
                      </button>
                      <img 
                        src="/devi.png" 
                        alt="Devi" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                        onMouseEnter={async () => {
                          console.log('🖱️ Hovering over Devi image');
                          console.log('Audio object:', deviAudio);
                          console.log('Audio type:', typeof deviAudio);
                          
                          if (deviAudio) {
                            console.log('🎵 Attempting to play audio...');
                            console.log('Audio src:', deviAudio.src || 'No src');
                            console.log('Audio ready state:', deviAudio.readyState);
                            console.log('Audio paused:', deviAudio.paused);
                            console.log('Audio volume:', deviAudio.volume);
                            
                            if (deviAudio.currentTime !== undefined) {
                              deviAudio.currentTime = 0;
                              console.log('Reset audio to beginning');
                            }
                            setIsDeviAudioPlaying(true);
                            
                            try {
                              const playPromise = deviAudio.play();
                              if (playPromise && playPromise.then) {
                                await playPromise;
                                console.log('✅ Audio playing successfully');
                              } else {
                                console.log('✅ Audio play method called (no promise)');
                              }
                            } catch (error) {
                              console.log('❌ Audio play failed:', error);
                              console.log('Error name:', error.name);
                              console.log('Error message:', error.message);
                              setIsDeviAudioPlaying(false);
                              
                              // Try to enable audio context if needed
                              if (error.name === 'NotAllowedError') {
                                console.log('🔒 Audio blocked by browser. User interaction may be required.');
                              }
                            }
                          } else {
                            console.log('❌ No audio loaded. Audio object is null.');
                          }
                        }}
                        onMouseLeave={() => {
                          console.log('🖱️ Mouse left Devi image');
                          if (deviAudio) {
                            console.log('🔇 Stopping audio...');
                            if (deviAudio.pause) {
                              deviAudio.pause();
                            }
                            if (deviAudio.currentTime !== undefined) {
                              deviAudio.currentTime = 0;
                            }
                            setIsDeviAudioPlaying(false);
                            console.log('✅ Audio stopped');
                          }
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback content */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hidden rounded-xl">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-1 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-2 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  
                  {/* Enhanced Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/15 to-orange-600/15 rounded-2xl -z-10 blur-lg"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-gray-200/40 to-gray-300/40 rounded-2xl -z-20"></div>
                </div>
                
                {/* Image Label */}
                <div className="mt-4 text-center">
                   <div className="bg-gradient-to-r from-orange-50 to-orange-25 rounded-lg p-2 border border-orange-200">
                    <p className="text-xs font-medium text-orange-700">Yogeshwari Devi, Ambajogai</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
             </div>
            
            {/* Animated Welcome Video-like Section */}
            <div className="relative w-full max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 rounded-3xl p-12 shadow-2xl overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-20 left-20 w-12 h-12 bg-orange-300 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-200 rounded-full animate-bounce"></div>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-orange-300 rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-200 rounded-full animate-ping"></div>
                </div>
                
                {/* Main Content */}
                <div className="relative z-10 text-center">
                  {/* Decorative Top Border */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32 animate-pulse"></div>
                    <div className="mx-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32 animate-pulse"></div>
                  </div>
                  
                  {/* Main Animated Text */}
                  <div className="mb-8">
                    <h2 className="text-4xl lg:text-6xl font-bold text-yellow-300 mb-4 animate-pulse drop-shadow-2xl">
                      स्वागत आहे
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-bold text-white animate-bounce drop-shadow-2xl">
                      बाळकृष्ण निवास
                    </h3>
                  </div>
                  
                  {/* Animated Subtitle */}
                  <div className="text-lg lg:text-xl text-yellow-200 font-medium">
                    <p className="animate-pulse drop-shadow-lg">{t('home.heartfeltWelcome')}</p>
                  </div>
                  
                  {/* Decorative Bottom Border */}
                  <div className="flex items-center justify-center mt-8">
                    <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32 animate-pulse"></div>
                    <div className="mx-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Enhanced Glowing Border Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-3xl opacity-50 blur-xl animate-pulse"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-3xl opacity-30 blur-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="relative z-10 py-20 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">{t('home.welcome')}</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
              >
                {t('home.joinUs')}
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-orange-300"
              >
                {t('home.learnMore')}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-50 to-transparent"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-10 w-24 h-24 bg-gray-300/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300/15 rounded-full blur-xl animate-ping"></div>
      </div>
      </div>
    </>
  );
};

export default Home;