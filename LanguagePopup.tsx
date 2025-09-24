import { motion } from "motion/react";
import { Check, Globe } from "lucide-react";
import { useLanguage, languages } from "./LanguageContext";

interface LanguagePopupProps {
  onClose: () => void;
}

export function LanguagePopup({ onClose }: LanguagePopupProps) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
    onClose();
  };

  return (
    <motion.div
      className="absolute top-12 right-0 bg-card border border-border rounded-lg shadow-lg py-2 min-w-48 z-50"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground">Language</span>
        </div>
      </div>
      
      <div className="py-1 max-h-64 overflow-y-auto">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-3 py-2 text-left hover:bg-accent transition-colors flex items-center justify-between ${
              language === lang.code ? 'bg-accent' : ''
            }`}
          >
            <div>
              <div className="font-medium text-foreground">{lang.nativeName}</div>
              <div className="text-xs text-muted-foreground">{lang.name}</div>
            </div>
            {language === lang.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}