import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import shivvImage from '../assets/images/shivv.webp';
import templeImage from '../assets/images/temple.jpg';

const VyadeshwarTemple = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Shree Vyadeshwar Temple, Guhagar",
      subtitle: "Ancient Temple of Lord Shiva in Ratnagiri District",
      location: "Guhagar, Ratnagiri District, Maharashtra",
      distance: "45 km from Chiplun",
      established: "Around 1200 AD (Temple: 200-250 years old)",
      description: `Shree Vyadeshwar Temple in Guhagar is located very close to the bus stand, and the Guhagar market is situated around it. Guhagar is a village in Ratnagiri district and is the headquarters of a taluka. Guhagar is about 45 kilometers away from Chiplun.

Although Guhagar was founded around 1200 AD, Shri Vyadeshwar Temple is about 200/250 years old. The Shivalinga in the Vyadeshwar Temple is very ancient and self-sufficient.

After Jamadagniputra Parashurama created Konkanbhoomi, many sages came and stayed in that area. Among them, Vyad Rishi founded it, hence it was called Vyadeshwar.

This temple has walls on all four sides and has entrances on the north, south and east. Although the temple faces east, the entrance facing south is mainly used.

Shri Vyadeshwar is the family head of most of the Chitpavan Konkanstha Brahmin families. This Vyadeshwar is the family head of many Joglekar families.

There is a Gak lake near the temple and there is also a temple of Vitthal-Rakhumai. There is open space in the temple premises and the temple is of the Panchayat system.

Small temples like Shri Surya, Shri Ganapati, Shri Ambika and Shri Lakshmi-Vishnu are located on all four sides of Shri Vyadeshwar temple. The temple's Upadhyaya helps the devotees in religious activities.

A special festival is held here on Kartiki Gakdashila. There is a five-day Vyadeshwar festival in the month of Magh. Katha-kirtan programs are held during the festival. There is a palanquin procession.

Rudrabhishek is continuously performed on the Vyadeshwar temple during Chaturmas. A silver idol of Shiva is kept in the temple on the days of Ashadhi, Kartiki Gakdashi and Mahashivratri.

Many devotees come to have darshan of Shri Vyadeshwar on Mahashivratri, Shravan and Kartik Mondays.`,
      sections: {
        history: "History & Origin",
        architecture: "Temple Architecture",
        significance: "Religious Significance",
        festivals: "Festivals & Celebrations",
        visiting: "Visiting Information"
      },
      historyText: "Founded by Vyad Rishi after Parashurama created Konkanbhoomi. The ancient self-sufficient Shivalinga makes this temple spiritually significant.",
      architectureText: "The temple has walls on all four sides with entrances on north, south, and east. Though east-facing, the south entrance is primarily used. Surrounded by smaller temples of various deities.",
      significanceText: "Shri Vyadeshwar serves as the family deity (Kuladevata) for most Chitpavan Konkanstha Brahmin families, especially many Joglekar families.",
      festivalsText: "Major celebrations include Kartiki Gakdashila festival, five-day Vyadeshwar festival in Magh month with Katha-kirtan programs and palanquin processions.",
      visitingText: "Located near Guhagar bus stand and market. Best visited during Mahashivratri, Shravan Mondays, and Kartik Mondays for special darshan."
    },
    mr: {
      title: "श्री व्याडेश्वर मंदिर, गुहागर",
      subtitle: "रत्नागिरी जिल्ह्यातील भगवान शिवाचे प्राचीन मंदिर",
      location: "गुहागर, रत्नागिरी जिल्हा, महाराष्ट्र",
      distance: "चिपळूणपासून ४५ किमी",
      established: "सुमारे १२०० इ.स. (मंदिर: २००-२५० वर्षे जुने)",
      description: `गुहागरमधील श्री व्याडेश्वर मंदिर बस स्थानकाच्या अगदी जवळ आहे आणि गुहागर बाजार त्याच्या आजूबाजूला वसलेला आहे. गुहागर हे रत्नागिरी जिल्ह्यातील एक गाव आहे आणि तालुक्याचे मुख्यालय आहे. गुहागर चिपळूणपासून सुमारे ४५ किलोमीटर अंतरावर आहे.

गुहागरची स्थापना सुमारे १२०० इ.स.च्या आसपास झाली असली तरी श्री व्याडेश्वर मंदिर सुमारे २००/२५० वर्षे जुने आहे. व्याडेश्वर मंदिरातील शिवलिंग अतिशय प्राचीन आणि स्वयंभू आहे.

जमदग्निपुत्र परशुरामाने कोकणभूमी निर्माण केल्यानंतर अनेक ऋषी आले आणि त्या भागात राहिले. त्यापैकी व्याड ऋषींनी त्याची स्थापना केली, म्हणून त्याला व्याडेश्वर म्हटले गेले.

या मंदिराला चारही बाजूंना भिंती आहेत आणि उत्तर, दक्षिण आणि पूर्वेला प्रवेशद्वार आहेत. मंदिराचे तोंड पूर्वेकडे असले तरी दक्षिणेकडील प्रवेशद्वाराचा मुख्यतः वापर केला जातो.

श्री व्याडेश्वर हे बहुतेक चितपावन कोकणस्थ ब्राह्मण कुटुंबांचे कुलदैवत आहेत. हे व्याडेश्वर अनेक जोगळेकर कुटुंबांचे कुलदैवत आहेत.

मंदिराजवळ गाक तलाव आहे आणि विठ्ठल-रखुमाईचे मंदिरही आहे. मंदिराच्या आवारात मोकळी जागा आहे आणि मंदिर पंचायत प्रणालीचे आहे.

श्री व्याडेश्वर मंदिराच्या चारही बाजूंना श्री सूर्य, श्री गणपती, श्री अंबिका आणि श्री लक्ष्मी-विष्णू यांसारखी छोटी मंदिरे आहेत. मंदिराचे उपाध्याय भक्तांना धार्मिक कार्यात मदत करतात.

कार्तिकी गकदशीला येथे विशेष उत्सव होतो. माघ महिन्यात पाच दिवसांचा व्याडेश्वर उत्सव होतो. उत्सवात कथा-कीर्तन कार्यक्रम होतात. पालखी मिरवणूक काढली जाते.

चातुर्मास्यात व्याडेश्वर मंदिरावर सतत रुद्राभिषेक केला जातो. आषाढी, कार्तिकी गकदशी आणि महाशिवरात्रीच्या दिवशी मंदिरात शिवाची चांदीची मूर्ती ठेवली जाते.

महाशिवरात्री, श्रावण आणि कार्तिक सोमवारी श्री व्याडेश्वराचे दर्शन घेण्यासाठी अनेक भक्त येतात.`,
      sections: {
        history: "इतिहास आणि उत्पत्ति",
        architecture: "मंदिर वास्तुकला",
        significance: "धार्मिक महत्त्व",
        festivals: "उत्सव आणि समारंभ",
        visiting: "भेट देण्याची माहिती"
      },
      historyText: "परशुरामाने कोकणभूमी निर्माण केल्यानंतर व्याड ऋषींनी स्थापना केली. प्राचीन स्वयंभू शिवलिंगामुळे हे मंदिर आध्यात्मिकदृष्ट्या महत्त्वपूर्ण आहे.",
      architectureText: "मंदिराला चारही बाजूंना भिंती आहेत आणि उत्तर, दक्षिण आणि पूर्वेला प्रवेशद्वार आहेत. पूर्वमुखी असले तरी दक्षिण प्रवेशद्वाराचा मुख्य वापर होतो. विविध देवतांच्या छोट्या मंदिरांनी वेढलेले.",
      significanceText: "श्री व्याडेश्वर हे बहुतेक चितपावन कोकणस्थ ब्राह्मण कुटुंबांचे, विशेषतः अनेक जोगळेकर कुटुंबांचे कुलदैवत आहेत.",
      festivalsText: "मुख्य उत्सवांमध्ये कार्तिकी गकदशी उत्सव, माघ महिन्यातील पाच दिवसांचा व्याडेश्वर उत्सव कथा-कीर्तन कार्यक्रम आणि पालखी मिरवणुकीसह.",
      visitingText: "गुहागर बस स्थानक आणि बाजाराजवळ स्थित. महाशिवरात्री, श्रावण सोमवार आणि कार्तिक सोमवारी विशेष दर्शनासाठी भेट देणे योग्य."
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-6">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-orange-100 hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'mr' ? 'मुख्य पृष्ठावर परत' : 'Back to Home'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentContent.title}</h1>
          <p className="text-orange-100 text-lg">{currentContent.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Shivv Image */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src={shivvImage} 
                    alt="Lord Shiva" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold">Lord Shiva</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'mr' ? 'भगवान शिव' : 'Lord Shiva'}
                  </h3>
                </div>
              </div>

              {/* Temple Image */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={templeImage} 
                    alt="Vyadeshwar Temple" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold">Vyadeshwar Temple</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'mr' ? 'व्याडेश्वर मंदिर' : 'Vyadeshwar Temple'}
                  </h3>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {language === 'mr' ? 'त्वरित माहिती' : 'Quick Information'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">{language === 'mr' ? 'स्थान' : 'Location'}</p>
                      <p className="font-medium text-gray-800">{currentContent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">{language === 'mr' ? 'अंतर' : 'Distance'}</p>
                      <p className="font-medium text-gray-800">{currentContent.distance}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">{language === 'mr' ? 'स्थापना' : 'Established'}</p>
                      <p className="font-medium text-gray-800">{currentContent.established}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Main Description */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {language === 'mr' ? 'मंदिराचे वर्णन' : 'Temple Description'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {currentContent.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* History */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    {currentContent.sections.history}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{currentContent.historyText}</p>
                </div>

                {/* Architecture */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h8v8H6V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {currentContent.sections.architecture}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{currentContent.architectureText}</p>
                </div>

                {/* Significance */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    {currentContent.sections.significance}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{currentContent.significanceText}</p>
                </div>

                {/* Festivals */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {currentContent.sections.festivals}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{currentContent.festivalsText}</p>
                </div>
              </div>

              {/* Visiting Information */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 text-orange-700" />
                  </div>
                  {currentContent.sections.visiting}
                </h3>
                <p className="text-gray-700 leading-relaxed">{currentContent.visitingText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VyadeshwarTemple;