import { motion } from "motion/react";
import { ChevronRight, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";

interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  visitors: string;
  tags: string[];
}

interface FeaturedLocationsProps {
  onLocationSelect: (locationId: string) => void;
}

export function FeaturedLocations({ onLocationSelect }: FeaturedLocationsProps) {
  const { t } = useLanguage();
  const locations: Location[] = [
    {
      id: "sacred-chapel",
      name: t('sacred_chapel'),
      description: "Experience the spiritual heart of the monastery with stunning Gothic architecture",
      image: "https://images.unsplash.com/photo-1697112725101-bccbd824fd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjaGFwZWwlMjBzYWNyZWQlMjBhbHRhcnxlbnwxfHx8fDE3NTg3MDExMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "15 min",
      visitors: "4.8k",
      tags: ["Sacred", "Architecture", "History"]
    },
    {
      id: "ancient-library",
      name: t('ancient_library'),
      description: "Discover rare manuscripts and centuries-old texts in this scholarly sanctuary",
      image: "https://images.unsplash.com/photo-1542911077-46bd18a594f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbW9uYXN0ZXJ5JTIwbGlicmFyeSUyMHNjcmlwdG9yaXVtfGVufDF8fHx8MTc1ODcwMTEyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "20 min",
      visitors: "3.2k",
      tags: ["Knowledge", "Books", "Manuscripts"]
    },
    {
      id: "peaceful-garden",
      name: t('peaceful_garden'),
      description: "Find tranquility in the monastery's serene gardens and meditation spaces",
      image: "https://images.unsplash.com/photo-1722466125822-3758166e3329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjb3VydHlhcmQlMjBnYXJkZW4lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTg3MDExMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "10 min",
      visitors: "2.9k",
      tags: ["Nature", "Peace", "Meditation"]
    }
  ];

  return (
    <div className="px-4 mb-6">
      <motion.h2 
        className="text-xl font-medium text-foreground mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('featured_locations')}
      </motion.h2>
      
      {/* Horizontal Scrollable Carousel */}
      <div 
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            className="flex-shrink-0 w-72 bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={() => onLocationSelect(location.id)}
          >
            {/* Location Image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Tags */}
              <div className="absolute top-3 left-3 flex gap-2">
                {location.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag}
                    className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="absolute bottom-3 left-3 flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{location.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{location.visitors}</span>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{location.name}</h3>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <p 
                className="text-sm text-muted-foreground"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {location.description}
              </p>
            </div>
          </motion.div>
        ))}
        
        {/* Hide scrollbar using CSS */}
        <style>
          {`
            .flex.gap-4.overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
    </div>
  );
}