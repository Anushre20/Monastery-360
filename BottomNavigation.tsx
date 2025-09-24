import { motion } from "motion/react";
import { Home, Map, Calendar, MessageSquare, User } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'map', icon: Map, label: t('interactive_map') },
    { id: 'schedule', icon: Calendar, label: t('schedule') },
    { id: 'profile', icon: User, label: t('profile') }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border px-4 py-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              <span className="text-xs font-medium">{tab.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}