import { useState } from "react";
import { motion } from "motion/react";
import { X, MapPin, Calendar, Users, DollarSign, Clock, Edit, Download, Star, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface TripPreferences {
  destination: string;
  duration: string;
  budget: string;
  groupSize: string;
  interests: string[];
  travelStyle: string;
  accommodation: string;
  transportation: string;
  specialRequests: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    duration: string;
    cost: string;
    description: string;
  }[];
  totalCost: string;
}

interface AITripPlannerProps {
  onClose: () => void;
}

export function AITripPlanner({ onClose }: AITripPlannerProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'form' | 'planning' | 'itinerary'>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    duration: '',
    budget: '',
    groupSize: '',
    interests: [],
    travelStyle: '',
    accommodation: '',
    transportation: '',
    specialRequests: ''
  });

  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[]>([]);

  const interestOptions = [
    'Spiritual/Religious Sites',
    'Historical Architecture', 
    'Cultural Heritage',
    'Art & Manuscripts',
    'Nature & Gardens',
    'Photography',
    'Meditation & Mindfulness',
    'Local Cuisine',
    'Museums',
    'Archaeological Sites'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    setStep('planning');
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleItinerary: ItineraryDay[] = [
        {
          day: 1,
          title: "Arrival & Sacred Introduction",
          activities: [
            {
              time: "09:00",
              activity: "Airport Transfer & Check-in",
              location: "Hotel Near Monastery",
              duration: "2 hours",
              cost: "$45",
              description: "Comfortable transfer and hotel check-in with monastery orientation"
            },
            {
              time: "11:30",
              activity: "Welcome Tour - Main Entrance",
              location: "Monastery Main Gate",
              duration: "1.5 hours",
              cost: "$15",
              description: "Guided introduction to monastery history and architectural overview"
            },
            {
              time: "14:00",
              activity: "Sacred Chapel 360° Experience",
              location: "Sacred Chapel",
              duration: "2 hours",
              cost: "$25",
              description: "Immersive virtual reality tour with historical narratives"
            },
            {
              time: "16:30",
              activity: "Traditional Tea Ceremony",
              location: "Monastery Tea Garden",
              duration: "1 hour",
              cost: "$12",
              description: "Experience traditional monastic tea ceremony with local herbs"
            },
            {
              time: "19:00",
              activity: "Evening Meditation Session",
              location: "Peaceful Garden",
              duration: "45 minutes",
              cost: "Free",
              description: "Guided meditation session in the monastery's serene gardens"
            }
          ],
          totalCost: "$97"
        },
        {
          day: 2,
          title: "Deep Exploration & Heritage",
          activities: [
            {
              time: "08:00",
              activity: "Morning Prayer Service (Optional)",
              location: "Sacred Chapel",
              duration: "1 hour",
              cost: "Free",
              description: "Participate in traditional morning prayers with the monastic community"
            },
            {
              time: "10:00",
              activity: "Ancient Library & Manuscript Tour",
              location: "Ancient Library",
              duration: "2.5 hours",
              cost: "$35",
              description: "Explore rare manuscripts and participate in calligraphy workshop"
            },
            {
              time: "13:30",
              activity: "Traditional Monastery Lunch",
              location: "Monastery Dining Hall",
              duration: "1 hour",
              cost: "$18",
              description: "Authentic vegetarian meal prepared by monastery kitchen"
            },
            {
              time: "15:00",
              activity: "Bell Tower Panoramic Experience",
              location: "Bell Tower",
              duration: "1.5 hours",
              cost: "$20",
              description: "Climb the historic bell tower for panoramic views and bell ceremony"
            },
            {
              time: "17:00",
              activity: "Digital Archive Workshop",
              location: "Digital Archive Center",
              duration: "2 hours",
              cost: "$30",
              description: "Learn about digital preservation and contribute to monastery archives"
            }
          ],
          totalCost: "$103"
        },
        {
          day: 3,
          title: "Reflection & Departure",
          activities: [
            {
              time: "09:00",
              activity: "Personal Reflection Time",
              location: "Peaceful Garden",
              duration: "1 hour",
              cost: "Free",
              description: "Private time for reflection and journaling in the monastery gardens"
            },
            {
              time: "10:30",
              activity: "Souvenir Shopping",
              location: "Monastery Gift Shop",
              duration: "1 hour",
              cost: "$25-50",
              description: "Browse handcrafted items and monastery-made products"
            },
            {
              time: "12:00",
              activity: "Farewell Ceremony",
              location: "Main Hall",
              duration: "30 minutes",
              cost: "Free",
              description: "Traditional blessing ceremony before departure"
            },
            {
              time: "13:00",
              activity: "Checkout & Departure Transfer",
              location: "Hotel to Airport",
              duration: "2 hours",
              cost: "$45",
              description: "Hotel checkout and comfortable transfer to airport"
            }
          ],
          totalCost: "$70-95"
        }
      ];
      
      setGeneratedItinerary(sampleItinerary);
      setIsGenerating(false);
      setStep('itinerary');
    }, 3000);
  };

  const renderForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-foreground mb-2">Preferred Destination</label>
          <select
            value={preferences.destination}
            onChange={(e) => setPreferences(prev => ({ ...prev, destination: e.target.value }))}
            className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select destination</option>
            <option value="rumtek">Rumtek Monastery</option>
            <option value="pemayangtse">Pemayangtse Monastery</option>
            <option value="enchey">Enchey Monastery</option>
            <option value="tashiding">Tashiding Monastery</option>
            <option value="yuksom">Yuksom Sacred Sites</option>
            <option value="lachung">Lachung Valley Monasteries</option>
            <option value="namchi">Namchi Monastery Complex</option>
            <option value="ravangla">Ravangla Buddha Park</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-foreground mb-2">Trip Duration</label>
          <select
            value={preferences.duration}
            onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select duration</option>
            <option value="1-day">1 Day</option>
            <option value="2-3days">2-3 Days</option>
            <option value="1-week">1 Week</option>
            <option value="2-weeks">2 Weeks</option>
            <option value="custom">Custom Duration</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-foreground mb-2">Budget Range</label>
          <select
            value={preferences.budget}
            onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
            className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select budget</option>
            <option value="budget">Budget ($100-300)</option>
            <option value="mid-range">Mid-Range ($300-800)</option>
            <option value="luxury">Luxury ($800-2000)</option>
            <option value="premium">Premium ($2000+)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-foreground mb-2">Group Size</label>
          <select
            value={preferences.groupSize}
            onChange={(e) => setPreferences(prev => ({ ...prev, groupSize: e.target.value }))}
            className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select group size</option>
            <option value="solo">Solo Traveler</option>
            <option value="couple">Couple (2 people)</option>
            <option value="small-group">Small Group (3-5)</option>
            <option value="large-group">Large Group (6+)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium text-foreground mb-3">Interests (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`p-2 rounded-lg border text-sm transition-colors ${
                preferences.interests.includes(interest)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-input-background border-border hover:bg-accent'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-foreground mb-2">Travel Style</label>
          <select
            value={preferences.travelStyle}
            onChange={(e) => setPreferences(prev => ({ ...prev, travelStyle: e.target.value }))}
            className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select style</option>
            <option value="relaxed">Relaxed & Contemplative</option>
            <option value="adventure">Adventure Seeking</option>
            <option value="cultural">Cultural Immersion</option>
            <option value="spiritual">Spiritual Journey</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-foreground mb-2">Accommodation</label>
          <select
            value={preferences.accommodation}
            onChange={(e) => setPreferences(prev => ({ ...prev, accommodation: e.target.value }))}
            className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select accommodation</option>
            <option value="monastery">Monastery Guesthouse</option>
            <option value="hotel">Local Hotel</option>
            <option value="heritage">Heritage Property</option>
            <option value="camping">Camping/Retreat</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium text-foreground mb-2">Special Requests</label>
        <textarea
          value={preferences.specialRequests}
          onChange={(e) => setPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
          className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
          placeholder="Any dietary restrictions, accessibility needs, or special interests..."
        />
      </div>

      <button
        onClick={generateItinerary}
        disabled={!preferences.destination || !preferences.duration || !preferences.budget}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate My Trip Plan
      </button>
    </div>
  );

  const renderPlanning = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
        <MapPin className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-medium text-foreground mb-2">Creating Your Perfect Journey</h3>
        <p className="text-muted-foreground">Our AI is crafting a personalized itinerary based on your preferences...</p>
      </div>
      <div className="space-y-2">
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
        </div>
        <p className="text-sm text-muted-foreground">Analyzing your preferences and creating custom experiences</p>
      </div>
    </div>
  );

  const renderItinerary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-foreground">Your Personalized Itinerary</h3>
          <p className="text-sm text-muted-foreground">
            {preferences.destination} • {preferences.duration} • {preferences.budget} budget
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-muted hover:bg-accent rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 bg-muted hover:bg-accent rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {generatedItinerary.map((day) => (
          <motion.div
            key={day.day}
            className="bg-card border border-border rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: day.day * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-foreground">Day {day.day}: {day.title}</h4>
                <p className="text-sm text-muted-foreground">Total estimated cost: {day.totalCost}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-muted-foreground">4.8</span>
              </div>
            </div>

            <div className="space-y-3">
              {day.activities.map((activity, index) => (
                <div key={index} className="flex gap-4 p-3 bg-muted rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-foreground">{activity.activity}</h5>
                        <p className="text-sm text-muted-foreground">{activity.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium text-foreground">{activity.time}</div>
                        <div className="text-muted-foreground">{activity.duration}</div>
                        <div className="text-primary font-medium">{activity.cost}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setStep('form')}
          className="flex-1 bg-muted text-foreground py-3 rounded-lg hover:bg-accent transition-colors font-medium"
        >
          Modify Preferences
        </button>
        <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
          Book This Trip
        </button>
      </div>
    </div>
  );

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-card rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-medium text-foreground">{t('ai_trip_planner')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {step === 'form' && renderForm()}
          {step === 'planning' && renderPlanning()}
          {step === 'itinerary' && renderItinerary()}
        </div>
      </motion.div>
    </motion.div>
  );
}