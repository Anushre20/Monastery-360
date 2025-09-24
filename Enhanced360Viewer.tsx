import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  RotateCw, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Fullscreen,
  Minimize,
  Info
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";

interface Location360 {
  id: string;
  name: string;
  image: string;
  audioDescription: string;
  hotspots: {
    x: number;
    y: number;
    title: string;
    description: string;
    targetLocation?: string;
  }[];
}

interface Enhanced360ViewerProps {
  isActive: boolean;
  onLocationChange?: (locationId: string) => void;
  selectedLocationId?: string;
}

export function Enhanced360Viewer({ isActive, onLocationChange, selectedLocationId }: Enhanced360ViewerProps) {
  const { t } = useLanguage();
  const [currentLocation, setCurrentLocation] = useState('main-hall');
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLocationSwitch = (targetLocation: string) => {
    setCurrentLocation(targetLocation);
    setRotation(0);
    setZoom(100);
    if (onLocationChange) {
      onLocationChange(targetLocation);
    }
  };

  const locations360: Location360[] = [
    {
      id: 'main-hall',
      name: t('main_hall'),
      image: 'https://res.cloudinary.com/dmeosvjnh/image/upload/v1758737794/Gemini_Generated_Image_n73fb8n73fb8n73f_-_Gemini_Generated_Image_zatnrozatnrozatn_1_lgkyyf.jpg',
      audioDescription: "Welcome to the magnificent Main Hall of the monastery. This sacred space, built in the 12th century, features stunning Gothic arches and serves as the heart of the monastic community. The intricate stone work you see took craftsmen over 30 years to complete.",
      hotspots: [
        { x: 25, y: 30, title: "Ancient Altar", description: "Sacred altar with 800-year-old religious artifacts" },
        { x: 70, y: 45, title: "Stone Pillars", description: "Hand-carved limestone pillars with intricate religious motifs", targetLocation: 'sacred-chapel' },
        { x: 50, y: 70, title: "Prayer Area", description: "Traditional prayer space where monks gather for daily worship" },
        { x: 80, y: 25, title: "Exit to Garden", description: "Pathway leading to the peaceful monastery gardens", targetLocation: 'peaceful-garden' }
      ]
    },
    {
      id: 'sacred-chapel',
      name: t('sacred_chapel'),
      image: 'https://images.unsplash.com/photo-1697112725101-bccbd824fd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjaGFwZWwlMjBzYWNyZWQlMjBhbHRhcnxlbnwxfHx8fDE3NTg3MDExMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      audioDescription: "You are now in the Sacred Chapel, the spiritual epicenter of our monastery. This holy sanctuary has witnessed centuries of prayer and meditation. The beautiful stained glass windows tell stories of faith and devotion.",
      hotspots: [
        { x: 50, y: 20, title: "Stained Glass", description: "Medieval stained glass depicting religious scenes" },
        { x: 30, y: 60, title: "Prayer Benches", description: "Traditional wooden benches for contemplation" },
        { x: 85, y: 40, title: "Back to Main Hall", description: "Return to the main monastery hall", targetLocation: 'main-hall' }
      ]
    },
    {
      id: 'ancient-library',
      name: t('ancient_library'),
      image: 'https://images.unsplash.com/photo-1542911077-46bd18a594f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbW9uYXN0ZXJ5JTIwbGlicmFyeSUyMHNjcmlwdG9yaXVtfGVufDF8fHx8MTc1ODcwMTEyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      audioDescription: "Welcome to the Ancient Library, where centuries of wisdom are preserved. These sacred texts and manuscripts have been carefully maintained by generations of monks. The collection includes rare Buddhist scriptures and philosophical works.",
      hotspots: [
        { x: 40, y: 30, title: "Ancient Manuscripts", description: "Rare Buddhist texts dating back 500 years" },
        { x: 60, y: 50, title: "Reading Desk", description: "Traditional desk where monks study sacred texts" },
        { x: 20, y: 70, title: "Scroll Collection", description: "Ancient scrolls with philosophical teachings" },
        { x: 80, y: 35, title: "Exit to Garden", description: "Path leading to the peaceful monastery gardens", targetLocation: 'peaceful-garden' }
      ]
    },
    {
      id: 'peaceful-garden',
      name: t('peaceful_garden'),
      image: 'https://images.unsplash.com/photo-1722466125822-3758166e3329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjb3VydHlhcmQlMjBnYXJkZW4lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTg3MDExMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      audioDescription: "You are now in the Peaceful Garden, a sanctuary of tranquility within the monastery walls. This sacred space has been a place of meditation and reflection for centuries. The carefully tended plants and flowing water create an atmosphere perfect for contemplation.",
      hotspots: [
        { x: 30, y: 40, title: "Meditation Stone", description: "Sacred stone where monks practice meditation" },
        { x: 70, y: 30, title: "Prayer Fountain", description: "Ancient fountain with blessed water" },
        { x: 50, y: 70, title: "Herb Garden", description: "Medicinal herbs grown by the monastery" },
        { x: 85, y: 60, title: "Back to Chapel", description: "Return to the sacred chapel", targetLocation: 'sacred-chapel' }
      ]
    }
  ];

  // Auto rotation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Handle selectedLocationId prop change
  useEffect(() => {
    if (selectedLocationId && selectedLocationId !== currentLocation) {
      const locationExists = locations360.find(loc => loc.id === selectedLocationId);
      if (locationExists) {
        handleLocationSwitch(selectedLocationId);
      }
    }
  }, [selectedLocationId]);

  // Voice synthesis for location descriptions
  const startVoiceNarration = () => {
    if ('speechSynthesis' in window) {
      const location = locations360.find(loc => loc.id === currentLocation);
      if (location) {
        const utterance = new SpeechSynthesisUtterance(location.audioDescription);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
        setIsVoiceActive(true);
        
        utterance.onend = () => {
          setIsVoiceActive(false);
        };
      }
    }
  };

  const stopVoiceNarration = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsVoiceActive(false);
    }
  };

  // Mouse drag controls for 360° rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      setRotation(prev => (prev + deltaX * 0.5) % 360);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      setRotation(prev => (prev + deltaX * 0.5) % 360);
      setDragStart({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          setRotation(prev => (prev - 5) % 360);
          break;
        case 'ArrowRight':
          setRotation(prev => (prev + 5) % 360);
          break;
        case 'ArrowUp':
          setZoom(prev => Math.min(prev + 10, 200));
          break;
        case 'ArrowDown':
          setZoom(prev => Math.max(prev - 10, 50));
          break;
        case ' ':
          e.preventDefault();
          setIsAutoRotating(prev => !prev);
          break;
        case 'v':
          if (isVoiceActive) {
            stopVoiceNarration();
          } else {
            startVoiceNarration();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isVoiceActive, currentLocation]);

  const currentLocationData = locations360.find(loc => loc.id === currentLocation);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'}`}
    >
      {/* 360° Image Container */}
      <div 
        className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentLocationData && (
          <motion.div
            className="absolute inset-0"
            animate={{ 
              transform: `translateX(${-rotation * 2}px) scale(${zoom / 25})`,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <ImageWithFallback
              src={currentLocationData.image}
              alt={currentLocationData.name}
              className="w-[200%] h-full object-cover"
              draggable={false}
            />
          </motion.div>
        )}

        {/* Hotspots */}
        {showHotspots && currentLocationData?.hotspots.map((hotspot, index) => (
          <motion.button
            key={index}
            className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ 
              left: `${hotspot.x}%`, 
              top: `${hotspot.y}%`,
              transform: `translateX(${-rotation * 0.5}px)`
            }}
            onClick={() => {
              if (hotspot.targetLocation) {
                handleLocationSwitch(hotspot.targetLocation);
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info className="w-4 h-4 text-primary-foreground" />
            
            {/* Hotspot Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              <div className="font-medium">{hotspot.title}</div>
              <div className="text-xs text-gray-300">{hotspot.description}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-auto">
          <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
            {currentLocationData?.name} - {t('current_view')}
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Fullscreen className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Voice Control */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <button
            onClick={isVoiceActive ? stopVoiceNarration : startVoiceNarration}
            className={`p-3 rounded-full transition-colors ${
              isVoiceActive 
                ? 'bg-primary text-primary-foreground animate-pulse' 
                : 'bg-black/70 text-white hover:bg-black/80'
            }`}
          >
            {isVoiceActive ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-auto">
          {/* Rotation Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setRotation(prev => (prev - 15) % 360)}
              className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-lg transition-colors ${
                isAutoRotating 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-black/70 text-white hover:bg-black/80'
              }`}
            >
              {isAutoRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setRotation(prev => (prev + 15) % 360)}
              className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setZoom(prev => Math.max(prev - 20, 50))}
              className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="px-3 py-2 bg-black/70 text-white rounded-lg text-sm">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 20, 200))}
              className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Direction Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
            {t('direction')}: {Math.round(rotation)}°
          </div>
        </div>
      </div>

      {/* Location Selector */}
      <div className="absolute bottom-16 left-4 pointer-events-auto">
        <select
          value={currentLocation}
          onChange={(e) => handleLocationSwitch(e.target.value)}
          className="bg-black/70 text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
        >
          {locations360.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {/* Help Text */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white text-sm pointer-events-none">
        <div className="flex flex-wrap gap-4 text-xs opacity-70">
          <span>Drag to rotate</span>
          <span>Arrow keys to navigate</span>
          <span>Space to auto-rotate</span>
          <span>V for voice guide</span>
        </div>
      </div>
    </div>
  );
}
