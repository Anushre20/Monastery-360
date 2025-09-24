import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface Location {
  id: string;
  name: string;
  description: string;
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);


  const locations: Location[] = [
    { id: "courtyard", name: "Courtyard", description: "Central garden area" },
    { id: "bell-tower", name: "Bell Tower", description: "Historic bell tower with panoramic views" },
    { id: "scriptorium", name: "Ancient Scriptorium", description: "Where monks copied manuscripts" },
    { id: "library", name: "Monastery Library", description: "Collection of ancient texts" },
    { id: "chapel", name: "Main Chapel", description: "Primary worship space" },
    { id: "cloister", name: "Cloister Walk", description: "Covered walkway around courtyard" }
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground p-3 rounded-r-lg shadow-lg"
      >
        <Filter className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Search & Explore</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>


        </div>

        {/* Available Views */}
        <div className="p-4">
          <h3 className="font-medium mb-3">Available Views</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <button
                key={location.id}
                className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors border border-border"
              >
                <div className="font-medium text-sm">{location.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {location.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        </div>
    </>
  );
}