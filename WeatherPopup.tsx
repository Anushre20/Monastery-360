import { X, Sun, Cloud, CloudRain, Snowflake } from "lucide-react";

interface WeatherPopupProps {
  onClose: () => void;
}

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: any;
  humidity: number;
  windSpeed: number;
}

export function WeatherPopup({ onClose }: WeatherPopupProps) {
  // Mock weather data for different cities in Sikkim
  const weatherData: WeatherData[] = [
    {
      city: "Gangtok",
      temperature: 15,
      condition: "Partly Cloudy",
      icon: Cloud,
      humidity: 68,
      windSpeed: 12
    },
    {
      city: "Pelling",
      temperature: 12,
      condition: "Light Rain",
      icon: CloudRain,
      humidity: 85,
      windSpeed: 8
    },
    {
      city: "Lachung",
      temperature: 3,
      condition: "Snow",
      icon: Snowflake,
      humidity: 90,
      windSpeed: 15
    },
    {
      city: "Namchi",
      temperature: 18,
      condition: "Sunny",
      icon: Sun,
      humidity: 55,
      windSpeed: 6
    },
    {
      city: "Yuksom",
      temperature: 14,
      condition: "Cloudy",
      icon: Cloud,
      humidity: 72,
      windSpeed: 10
    }
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">Sikkim Weather</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-accent transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {weatherData.map((weather, index) => {
          const IconComponent = weather.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <IconComponent className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">{weather.city}</h4>
                  <p className="text-sm text-muted-foreground">{weather.condition}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-medium text-foreground">
                  {weather.temperature}°C
                </div>
                <div className="text-xs text-muted-foreground">
                  {weather.humidity}% humidity
                </div>
                <div className="text-xs text-muted-foreground">
                  {weather.windSpeed} km/h wind
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-secondary rounded-lg">
        <p className="text-sm text-secondary-foreground">
          <strong>Travel Advisory:</strong> Check weather conditions before visiting high-altitude monasteries. Carry warm clothes for Lachung and northern regions.
        </p>
      </div>
    </div>
  );
}