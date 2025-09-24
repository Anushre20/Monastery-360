import { useState } from "react";
import { Enhanced360Viewer } from "./Enhanced360Viewer";
import { useLanguage } from "./LanguageContext";

interface MonasteryViewerProps {
  selectedLocationId?: string;
}

export function MonasteryViewer({ selectedLocationId }: MonasteryViewerProps) {
  const { t } = useLanguage();
  const [isViewerActive, setIsViewerActive] = useState(true);

  const handleLocationChange = (locationId: string) => {
    console.log(`Switched to location: ${locationId}`);
    // You can add additional logic here when location changes
  };

  return (
    <div className="px-4 pb-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{t('view_360')}</h2>
            <div className="text-sm text-muted-foreground">
              Interactive Virtual Experience
            </div>
          </div>
        </div>

        {/* Enhanced 360° Viewer */}
        <Enhanced360Viewer 
          isActive={isViewerActive}
          onLocationChange={handleLocationChange}
          selectedLocationId={selectedLocationId}
        />
      </div>
    </div>
  );
}