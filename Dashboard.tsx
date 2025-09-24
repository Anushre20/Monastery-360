import { motion } from "motion/react";
import { Play, MapPin, ChevronRight, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";


interface DashboardProps {
  onStartTour: () => void;
  onOpenAIPlannar: () => void;
  onOpenBookings: () => void;
}

export function Dashboard({ onStartTour, onOpenAIPlannar, onOpenBookings }: DashboardProps) {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      {/* Hero Section with Dynamic Background */}
      <motion.div 
        className="relative h-80 overflow-hidden rounded-lg mx-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Dynamic 360° Panorama Background */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBiZWF1dGlmdWx8ZW58MXx8fHwxNzU4NzEyMzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Beautiful Sikkim Monastery"
            className="w-full h-full object-cover"
          />
          {/* Subtle animation overlay for movement effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"
            animate={{ 
              background: [
                "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
                "linear-gradient(95deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
                "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h1 
            className="text-3xl font-medium text-white mb-3 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t('welcome_to_monastery')}
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 mb-8 max-w-md drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t('explore_sacred_spaces')}
          </motion.p>

          {/* Action Cards */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
            <motion.button
              onClick={onStartTour}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Play className="w-5 h-5" />
              <span className="font-medium">{t('virtual_tour_demo')}</span>
            </motion.button>

            <motion.button
              onClick={onOpenAIPlannar}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{t('ai_trip_planner')}</span>
            </motion.button>

            <motion.button
              onClick={onOpenBookings}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Bookings</span>
            </motion.button>
          </div>
        </div>

        {/* 360° Indicator */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {t('live_360_view')}
        </div>
      </motion.div>


    </div>
  );
}