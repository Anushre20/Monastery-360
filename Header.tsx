import { User, Calendar, Cloud, Archive, Globe } from "lucide-react";
import { useState } from "react";
import { CalendarPopup } from "./CalendarPopup";
import { WeatherPopup } from "./WeatherPopup";
import { DigitalArchivePopup } from "./DigitalArchivePopup";
import { LanguagePopup } from "./LanguagePopup";
import { useLanguage } from "./LanguageContext";

export function Header() {
  const { t } = useLanguage();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-foreground">{t('monastery_360')}</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Calendar className="w-6 h-6 text-foreground" />
            </button>
            {showCalendar && (
              <CalendarPopup onClose={() => setShowCalendar(false)} />
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowWeather(!showWeather)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Cloud className="w-6 h-6 text-foreground" />
            </button>
            {showWeather && (
              <WeatherPopup onClose={() => setShowWeather(false)} />
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowArchive(!showArchive)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              title={t('digital_archive')}
            >
              <Archive className="w-6 h-6 text-foreground" />
            </button>
            {showArchive && (
              <DigitalArchivePopup onClose={() => setShowArchive(false)} />
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowLanguage(!showLanguage)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              title="Language"
            >
              <Globe className="w-6 h-6 text-foreground" />
            </button>
            {showLanguage && (
              <LanguagePopup onClose={() => setShowLanguage(false)} />
            )}
          </div>
          
          <button className="p-2 rounded-full hover:bg-accent transition-colors">
            <User className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}