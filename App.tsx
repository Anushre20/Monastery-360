import { useState } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { MonasteryViewer } from "./components/MonasteryViewer";
import { Dashboard } from "./components/Dashboard";
import { FeaturedLocations } from "./components/FeaturedLocations";
import { InteractiveMap } from "./components/InteractiveMap";
import { BottomNavigation } from "./components/BottomNavigation";
import { DailySchedule } from "./components/DailySchedule";
import { DonateButton } from "./components/DonateButton";
import { Chatbot } from "./components/Chatbot";
import { SOSButton } from "./components/SOSButton";
import { AITripPlanner } from "./components/AITripPlanner";
import { Bookings } from "./components/Bookings";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import 'leaflet/dist/leaflet.css';

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAITripPlanner, setShowAITripPlanner] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();
  const [aiRoute, setAiRoute] = useState<string[]>([]);

  const handleStartTour = () => {
    // This would start the virtual tour demo
    setActiveTab("home");
    // Scroll to MonasteryViewer
    setTimeout(() => {
      const viewer = document.querySelector('[data-component="monastery-viewer"]');
      viewer?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenAIPlanner = () => {
    setShowAITripPlanner(true);
  };

  const handleOpenBookings = () => {
    setShowBookings(true);
  };

  const handleLocationSelect = (locationId: string) => {
    // Navigate to specific location in 360° viewer and pass the location ID
    setSelectedLocationId(locationId);
    setActiveTab("home");
    setTimeout(() => {
      const viewer = document.querySelector('[data-component="monastery-viewer"]');
      viewer?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === "map") {
      setShowInteractiveMap(true);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            {/* Enhanced Dashboard with Hero Section */}
            <Dashboard 
              onStartTour={handleStartTour}
              onOpenAIPlannar={handleOpenAIPlanner}
              onOpenBookings={handleOpenBookings}
            />
            
            {/* Featured Locations Carousel */}
            <FeaturedLocations onLocationSelect={handleLocationSelect} />
            
            {/* Search Bar */}
            <SearchBar />
            
            {/* 360° Viewer */}
            <div data-component="monastery-viewer">
              <MonasteryViewer selectedLocationId={selectedLocationId} />
            </div>
            
            {/* Donate Section */}
            <div className="mt-8">
              <DonateButton />
            </div>
          </>
        );
      
      case "schedule":
        return (
          <div className="pt-4">
            <DailySchedule />
          </div>
        );
      
      case "profile":
        return (
          <div className="px-4 pt-8 pb-20">
            <div className="bg-card rounded-xl p-6">
              <h2 className="text-xl font-medium text-foreground mb-4">{t('profile_settings')}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-medium text-primary-foreground">U</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t('welcome_back')}</h3>
                    <p className="text-sm text-muted-foreground">{t('monastery_explorer')}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-border">
                  <button className="w-full p-3 bg-muted hover:bg-accent rounded-lg text-left transition-colors">
                    <span className="font-medium">{t('tour_preferences')}</span>
                  </button>
                  <button className="w-full p-3 bg-muted hover:bg-accent rounded-lg text-left transition-colors">
                    <span className="font-medium">{t('download_history')}</span>
                  </button>
                  <button className="w-full p-3 bg-muted hover:bg-accent rounded-lg text-left transition-colors">
                    <span className="font-medium">{t('accessibility_settings')}</span>
                  </button>
                  <button className="w-full p-3 bg-muted hover:bg-accent rounded-lg text-left transition-colors">
                    <span className="font-medium">{t('language_region')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <Dashboard 
              onStartTour={handleStartTour}
              onOpenAIPlannar={handleOpenAIPlanner}
              onOpenBookings={handleOpenBookings}
            />
            <FeaturedLocations onLocationSelect={handleLocationSelect} />
            <SearchBar />
            <div data-component="monastery-viewer">
              <MonasteryViewer selectedLocationId={selectedLocationId} />
            </div>
            
            {/* Donate Section */}
            <div className="mt-8">
              <DonateButton />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-4">
        {renderContent()}
      </main>
      
      {/* Interactive Map Modal */}
      {showInteractiveMap && (
        <InteractiveMap
          onClose={() => {
            setShowInteractiveMap(false);
            setActiveTab("home");
          }}
          aiRoute={aiRoute}
        />
      )}
      
      {/* Emergency SOS Button */}
      <SOSButton />
      
      {/* Floating Chatbot - Always visible */}
      <Chatbot />
      
      {/* AI Trip Planner Modal */}
      {showAITripPlanner && (
        <AITripPlanner onClose={() => setShowAITripPlanner(false)} />
      )}
      
      {/* Bookings Modal */}
      {showBookings && (
        <Bookings onClose={() => setShowBookings(false)} />
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}