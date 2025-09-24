import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Note: changed from "motion/react" to "framer-motion" for standard usage
import { Navigation, MapPin, X, Route, Clock, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Define the geographical coordinates for the points of interest
interface POI {
  id: string;
  name: string;
  coords: [number, number]; // [latitude, longitude]
  description: string;
  type: "chapel" | "library" | "garden" | "tower" | "entrance" | "hall";
  estimatedTime: string;
  image: string;
}

interface InteractiveMapProps {
  onClose: () => void;
  aiRoute?: string[];
}

// A custom component to handle the fly-to animation for selected POIs
const MapEventHandlers = ({ selectedPOI, userLocation }: { selectedPOI: POI | null, userLocation: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPOI) {
      map.flyTo(selectedPOI.coords, 18, {
        animate: true,
        duration: 1.5,
      });
    } else {
      // Optional: Fly back to a default view (e.g., user's location) when no POI is selected
      map.flyTo(userLocation, 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedPOI, map, userLocation]);

  return null;
};

// Define a custom icon for POIs
const poiIcon = (color: string) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A custom component to create the AI route polyline
const AIRoutePolyline = ({ aiRoute, poisData }: { aiRoute: string[], poisData: POI[] }) => {
  const routeCoords = aiRoute.map(poiId => {
    const poi = poisData.find(p => p.id === poiId);
    return poi ? poi.coords : null;
  }).filter(Boolean) as [number, number][];

  return routeCoords.length > 1 ? (
    <Polyline 
      pathOptions={{ color: '#8d6e63', weight: 4, dashArray: '8, 4' }} 
      positions={routeCoords} 
    />
  ) : null;
};

export function InteractiveMap({ onClose, aiRoute = [] }: InteractiveMapProps) {
  const { t } = useLanguage();
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [showNearby, setShowNearby] = useState(false);

  // Use a simulated location near a well-known place in Sikkim, like Rumtek Monastery
  const [userLocation, setUserLocation] = useState<[number, number]>([27.3195, 88.5910]); // Example coordinates near Rumtek Monastery

  // Define POI data with real-world geographical coordinates
  const poisData: POI[] = [
    {
      id: "entrance",
      name: t('main_entrance'),
      coords: [27.3190, 88.5905],
      description: "Historic entrance gate with intricate stone carvings from the 12th century",
      type: "entrance",
      estimatedTime: "5 min",
      image: "https://images.unsplash.com/photo-1692366340362-337ce06a321c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBwYW5vcmFtaWMlMjBpbnRlcmlvciUyMHN0b25lJTIwYXJjaGVzfGVufDF8fHx8MTc1ODcwMTEyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "sacred-chapel",
      name: t('sacred_chapel'),
      coords: [27.3200, 88.5915],
      description: "The spiritual heart of the monastery with stunning Gothic architecture and sacred artifacts",
      type: "chapel",
      estimatedTime: "15 min",
      image: "https://images.unsplash.com/photo-1697112725101-bccbd824fd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjaGFwZWwlMjBzYWNyZWQlMjBhbHRhcnxlbnwxfHx8fDE3NTg3MDExMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "ancient-library",
      name: t('ancient_library'),
      coords: [27.3185, 88.5925],
      description: "Repository of rare manuscripts and centuries-old texts",
      type: "library",
      estimatedTime: "20 min",
      image: "https://images.unsplash.com/photo-1542911077-46bd18a594f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhbmNpZW50JTIwbW9uYXN0ZXJ5JTIwbGlicmFyeSUyMHNjcmlwdG9yaXVtfGVufDF8fHx8MTc1ODcwMTEyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "peaceful-garden",
      name: t('peaceful_garden'),
      coords: [27.3198, 88.5908],
      description: "Serene gardens perfect for meditation and contemplation",
      type: "garden",
      estimatedTime: "10 min",
      image: "https://images.unsplash.com/photo-1722466125822-3758166e3329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjb3VydHlhcmQlMjBnYXJkZW4lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTg3MDExMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "bell-tower",
      name: t('bell_tower'),
      coords: [27.3205, 88.5920],
      description: "Historic bell tower offering panoramic views of the monastery grounds",
      type: "tower",
      estimatedTime: "12 min",
      image: "https://images.unsplash.com/photo-1692366340362-337ce06a321c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBwYW5vcmFtaWMlMjBpbnRlcmlvciUyMHN0b25lJTIwYXJjaGVzfGVufDF8fHx8MTc1ODcwMTEyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "main-hall",
      name: t('main_hall'),
      coords: [27.3195, 88.5910],
      description: "Central gathering space with magnificent vaulted ceilings",
      type: "hall",
      estimatedTime: "18 min",
      image: "https://images.unsplash.com/photo-1692366340362-337ce06a321c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBwYW5vcmFtaWMlMjBpbnRlcmlvciUyMHN0b25lJTIwYXJjaGVzfGVufDF8fHx8MTc1ODcwMTEyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "chapel": return "red";
      case "library": return "blue";
      case "garden": return "green";
      case "tower": return "orange";
      case "entrance": return "grey";
      case "hall": return "gold";
      default: return "blue";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-medium text-foreground">{t('interactive_map')}</h2>
            <p className="text-sm text-muted-foreground">Discover points of interest and navigate the grounds</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Map Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowNearby(!showNearby)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              showNearby ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'
            }`}
          >
            <Navigation className="w-4 h-4" />
            {t('discover_nearby')}
          </button>

          {aiRoute.length > 0 && (
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2">
              <Route className="w-4 h-4" />
              {t('ai_route_active')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="rounded-lg p-0 aspect-square relative overflow-hidden">
              {/* MapContainer from react-leaflet */}
              <MapContainer 
                center={userLocation} 
                zoom={15} 
                scrollWheelZoom={true} 
                className="w-full h-full rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Markers for Points of Interest */}
                {poisData.map((poi) => (
                  <Marker 
                    key={poi.id} 
                    position={poi.coords} 
                    icon={poiIcon(getTypeColor(poi.type))} 
                    eventHandlers={{ click: () => setSelectedPOI(poi) }}
                  >
                    <Popup>
                      <h3 className="font-bold">{poi.name}</h3>
                      <p>{poi.description}</p>
                    </Popup>
                  </Marker>
                ))}

                {/* User Location Marker */}
                <Marker position={userLocation} icon={poiIcon('blue')}>
                  <Popup>
                    You are here.
                  </Popup>
                </Marker>

                {/* AI Route Path */}
                {aiRoute.length > 0 && (
                  <AIRoutePolyline aiRoute={aiRoute} poisData={poisData} />
                )}

                {/* Custom component to handle fly-to animation */}
                <MapEventHandlers selectedPOI={selectedPOI} userLocation={userLocation} />
              </MapContainer>
            </div>
          </div>

          {/* Sidebar Information (no change here) */}
          <div className="space-y-4">
            {/* Nearby POIs */}
            {showNearby && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Nearby Locations
                </h3>
                <div className="space-y-2">
                  {poisData.filter(poi => {
                    const distance = L.latLng(poi.coords).distanceTo(L.latLng(userLocation));
                    return distance < 500; // Within 500 meters
                  }).map((poi) => (
                    <button
                      key={poi.id}
                      onClick={() => setSelectedPOI(poi)}
                      className="w-full p-3 bg-card hover:bg-accent rounded-lg text-left transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{poi.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {poi.estimatedTime}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Locations */}
            <div>
              <h3 className="font-medium text-foreground mb-3">All Locations</h3>
              <div className="space-y-2">
                {poisData.map((poi) => (
                  <button
                    key={poi.id}
                    onClick={() => setSelectedPOI(poi)}
                    className="w-full p-3 bg-card hover:bg-accent rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${getTypeColor(poi.type)} rounded-full`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{poi.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {poi.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* POI Detail Modal */}
        {selectedPOI && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-card rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                  src={selectedPOI.image}
                  alt={selectedPOI.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-foreground">{selectedPOI.name}</h3>
                <button
                  onClick={() => setSelectedPOI(null)}
                  className="p-1 hover:bg-accent rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {selectedPOI.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedPOI.estimatedTime}
                </span>

                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  360° View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}