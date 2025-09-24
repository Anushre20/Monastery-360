import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'ml' | 'kn' | 'gu' | 'mr' | 'or' | 'pa' | 'as' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'monastery_360': 'Monastery 360',
    'welcome_back': 'Welcome Back',
    'monastery_explorer': 'Monastery Explorer',
    
    // Navigation
    'home': 'Home',
    'interactive_map': 'Interactive Map',
    'schedule': 'Schedule',
    'assistant': 'Assistant',
    'profile': 'Profile',
    
    // Dashboard
    'welcome_to_monastery': 'Welcome to Monastery 360',
    'explore_sacred_spaces': 'Explore sacred spaces through immersive 360° experiences and discover centuries of spiritual heritage',
    'virtual_tour_demo': 'Virtual Tour Demo',
    'ai_trip_planner': 'AI Trip Planner',
    'featured_locations': 'Featured Locations',
    
    // Archive
    'digital_archive': 'Digital Archive',
    'browse_archive': 'Browse the Archive',
    'upload_archive': 'Upload to Archive',
    'recent_manuscripts': 'Recent Manuscripts',
    'recent_murals': 'Recent Murals',
    'archaeological_finds': 'Archaeological Finds',
    'upload_photo': 'Upload Photo',
    'drag_drop_files': 'Drag and drop files here, or click to select',
    'supported_formats': 'Supported formats: JPG, PNG, TIFF, PDF',
    'max_file_size': 'Maximum file size: 50MB',
    
    // Map
    'discover_nearby': 'Discover Nearby',
    'ai_route_active': 'AI Route Active',
    'your_location': 'Your Location',
    'all_locations': 'All Locations',
    'nearby_locations': 'Nearby Locations',
    
    // Common
    'close': 'Close',
    'view_360': '360° View',
    'live_360_view': 'Live 360° View',
    'current_view': 'Current View',
    'direction': 'Direction',
    
    // Profile
    'profile_settings': 'Profile Settings',
    'tour_preferences': 'Tour Preferences',
    'download_history': 'Download History',
    'accessibility_settings': 'Accessibility Settings',
    'language_region': 'Language & Region',
    
    // Locations
    'sacred_chapel': 'Sacred Chapel',
    'ancient_library': 'Ancient Library',
    'peaceful_garden': 'Peaceful Garden',
    'bell_tower': 'Bell Tower',
    'main_hall': 'Main Hall',
    'main_entrance': 'Main Entrance',
  },
  hi: {
    // Header
    'monastery_360': 'मठ 360',
    'welcome_back': 'वापसी पर स्वागत',
    'monastery_explorer': 'मठ अन्वेषक',
    
    // Navigation
    'home': 'घर',
    'interactive_map': 'इंटरएक्टिव मैप',
    'schedule': 'कार्यक्रम',
    'assistant': 'सहायक',
    'profile': 'प्रोफ़ाइल',
    
    // Dashboard
    'welcome_to_monastery': 'मठ 360 में आपका स्वागत है',
    'explore_sacred_spaces': 'इमर्सिव 360° अनुभवों के माध्यम से पवित्र स्थानों का अन्वेषण करें और सदियों की आध्यात्मिक विरासत की खोज करें',
    'virtual_tour_demo': 'वर्चुअल टूर डेमो',
    'ai_trip_planner': 'AI यात्रा योजनाकार',
    'featured_locations': 'विशेष स्थान',
    
    // Archive
    'digital_archive': 'डिजिटल संग्रह',
    'browse_archive': 'संग्रह ब्राउज़ करें',
    'upload_archive': 'संग्रह में अपलोड करें',
    'recent_manuscripts': 'हाल की पांडुलिपियां',
    'recent_murals': 'हाल की भित्ति चित्र',
    'archaeological_finds': 'पुरातत्व खोजें',
    'upload_photo': 'फोटो अपलोड करें',
    'drag_drop_files': 'फाइलों को यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
    'supported_formats': 'समर्थित प्रारूप: JPG, PNG, TIFF, PDF',
    'max_file_size': 'अधिकतम फाइल साइज: 50MB',
    
    // Map
    'discover_nearby': 'पास खोजें',
    'ai_route_active': 'AI रूट सक्रिय',
    'your_location': 'आपका स्थान',
    'all_locations': 'सभी स्थान',
    'nearby_locations': 'पास के स्थान',
    
    // Common
    'close': 'बंद करें',
    'view_360': '360° दृश्य',
    'live_360_view': 'लाइव 360° दृश्य',
    'current_view': 'वर्तमान दृश्य',
    'direction': 'दिशा',
    
    // Profile
    'profile_settings': 'प्रोफ़ाइल सेटिंग्स',
    'tour_preferences': 'टूर प्राथमिकताएं',
    'download_history': 'डाउनलोड इतिहास',
    'accessibility_settings': 'पहुंच सेटिंग्स',
    'language_region': 'भाषा और क्षेत्र',
    
    // Locations
    'sacred_chapel': 'पवित्र चैपल',
    'ancient_library': 'प्राचीन पुस्तकालय',
    'peaceful_garden': 'शांत बगीचा',
    'bell_tower': 'घंटी मीनार',
    'main_hall': 'मुख्य हॉल',
    'main_entrance': 'मुख्य प्रवेश',
  },
  bn: {
    // Header
    'monastery_360': 'মঠ ৩৬০',
    'welcome_back': 'ফিরে আসার স্বাগতম',
    'monastery_explorer': 'মঠ অন্বেষক',
    
    // Navigation
    'home': 'বাড়ি',
    'interactive_map': 'ইন্টারঅ্যাকটিভ মানচিত্র',
    'schedule': 'সময়সূচী',
    'assistant': 'সহায়ক',
    'profile': 'প্রোফাইল',
    
    // Dashboard
    'welcome_to_monastery': 'মঠ ৩৬০-এ আপনাকে স্বাগতম',
    'explore_sacred_spaces': 'নিমজ্জিত ৩৬০° অভিজ্ঞতার মাধ্যমে পবিত্র স্থানগুলি অন্বেষণ করুন এবং শতাব্দীর আধ্যাত্মিক ঐতিহ্য আবিষ্কার করুন',
    'virtual_tour_demo': 'ভার্চুয়াল ট্যুর ডেমো',
    'ai_trip_planner': 'AI ভ্রমণ পরিকল্পনাকারী',
    'featured_locations': 'বিশেষ স্থানসমূহ',
    
    // Archive
    'digital_archive': 'ডিজিটাল সংরক্ষণাগার',
    'browse_archive': 'সংরক্ষণাগার ব্রাউজ করুন',
    'upload_archive': 'সংরক্ষণাগারে আপলোড করুন',
    'recent_manuscripts': 'সাম্প্রতিক পাণ্ডুলিপি',
    'recent_murals': 'সাম্প্রতিক দেয়ালচিত্র',
    'archaeological_finds': 'প্রত্নতাত্ত্বিক আবিষ্কার',
    'upload_photo': 'ফটো আপলোড করুন',
    'drag_drop_files': 'ফাইলগুলি এখানে টেনে আনুন এবং ছেড়ে দিন, বা নির্বাচন করতে ক্লিক করুন',
    'supported_formats': 'সমর্থিত ফরম্যাট: JPG, PNG, TIFF, PDF',
    'max_file_size': 'সর্বোচ্চ ফাইল সাইজ: ৫০MB',
    
    // Map
    'discover_nearby': 'কাছাকাছি আবিষ্কার করুন',
    'ai_route_active': 'AI রুট সক্রিয়',
    'your_location': 'আপনার অবস্থান',
    'all_locations': 'সব অবস্থান',
    'nearby_locations': 'কাছাকাছি অবস্থান',
    
    // Common
    'close': 'বন্ধ করুন',
    'view_360': '৩৬০° দৃশ্য',
    'live_360_view': 'লাইভ ৩৬০° দৃশ���য',
    'current_view': 'বর্তমান দৃশ্য',
    'direction': 'দিক',
    
    // Profile
    'profile_settings': 'প্রোফাইল সেটিংস',
    'tour_preferences': 'ট্যুর পছন্দসমূহ',
    'download_history': 'ডাউনলোড ইতিহাস',
    'accessibility_settings': 'অ্যাক্সেসিবিলিটি সেটিংস',
    'language_region': 'ভাষা এবং অঞ্চল',
    
    // Locations
    'sacred_chapel': 'পবিত্র চ্যাপেল',
    'ancient_library': 'প্রাচীন গ্রন্থাগার',
    'peaceful_garden': 'শান্ত বাগান',
    'bell_tower': 'ঘণ্টা মিনার',
    'main_hall': 'প্রধান হল',
    'main_entrance': 'প্রধান প্রবেশদ্বার',
  },
  ta: {
    // Header
    'monastery_360': 'மடாலயம் 360',
    'welcome_back': 'மீண்டும் வரவேற்கிறோம்',
    'monastery_explorer': 'மடாலய ஆய்வாளர்',
    
    // Navigation
    'home': 'வீடு',
    'interactive_map': 'ஊடாடும் வரைபடம்',
    'schedule': 'அட்டவணை',
    'assistant': 'உதவியாளர்',
    'profile': 'சுயவிவரம்',
    
    // Dashboard
    'welcome_to_monastery': 'மடாலயம் 360 க்கு வரவேற்கிறோம்',
    'explore_sacred_spaces': 'மூழ்கும் 360° அனுபவங்கள் மூலம் புனித இடங்களை ஆராயுங்கள் மற்றும் நூற்றாண்டுகளின் ஆன்மீக பாரம்பரியத்தை கண்டறியுங்கள்',
    'virtual_tour_demo': 'மெய்நிகர் சுற்றுலா டெமோ',
    'ai_trip_planner': 'AI பயண திட்டமிடுபவர்',
    'featured_locations': 'சிறப்பு இடங்கள்',
    
    // Archive
    'digital_archive': 'டிஜிட்டல் காப்பகம்',
    'browse_archive': 'காப்பகத்தை உலாவுங்கள்',
    'upload_archive': 'காப்பகத்தில் பதிவேற்றுங்கள்',
    'recent_manuscripts': 'சமீபத்திய கையெழுத்துப் பிரதிகள்',
    'recent_murals': 'சமீபத்திய சுவர் ஓவியங்கள்',
    'archaeological_finds': 'தொல்லியல் கண்டுபிடிப்புகள்',
    'upload_photo': 'புகைப்படம் பதிவேற்றுங்கள்',
    'drag_drop_files': 'கோப்புகளை இங்கே இழுத்து விடுங்கள், அல்லது தேர்ந்தெடுக்க கிளிக் செய்யுங்கள்',
    'supported_formats': 'ஆதரிக்கப்படும் வடிவங்கள்: JPG, PNG, TIFF, PDF',
    'max_file_size': 'அதிகபட்ச கோப்பு அளவு: 50MB',
    
    // Map
    'discover_nearby': 'அருகில் கண்டறியுங்கள்',
    'ai_route_active': 'AI வழித்தடம் செயலில்',
    'your_location': 'உங்கள் இடம்',
    'all_locations': 'அனைத்து இடங்கள்',
    'nearby_locations': 'அருகிலுள்ள இடங்கள்',
    
    // Common
    'close': 'மூடுங்கள்',
    'view_360': '360° காட்சி',
    'live_360_view': 'நேரடி 360° காட்சி',
    'current_view': 'தற்போதைய காட்சி',
    'direction': 'திசை',
    
    // Profile
    'profile_settings': 'சுயவிவர அமைப்புகள்',
    'tour_preferences': 'சுற்றுலா விருப்பத்தேர்வுகள்',
    'download_history': 'பதிவிறக்க வரலாறு',
    'accessibility_settings': 'அணுகல் அமைப்புகள்',
    'language_region': 'மொழி மற்றும் பகுதி',
    
    // Locations
    'sacred_chapel': 'புனித தேவாலயம்',
    'ancient_library': 'பண்டைய நூலகம்',
    'peaceful_garden': 'அமைதியான தோட்டம்',
    'bell_tower': 'மணி கோபுரம்',
    'main_hall': 'பிரதான மண்டபம்',
    'main_entrance': 'பிரதான நுழைவு',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
] as const;