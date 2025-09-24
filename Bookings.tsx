import { useState } from "react";
import { motion } from "motion/react";
import { X, Car, User, MapPin, Star, Phone, Clock, CheckCircle, Calendar, Users } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookingOption {
  id: string;
  name: string;
  type: 'vehicle' | 'driver' | 'guide';
  price: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  experience?: string;
  languages?: string[];
  specialties?: string[];
  capacity?: number;
  fuelType?: string;
}

interface BookingsProps {
  onClose: () => void;
}

export function Bookings({ onClose }: BookingsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'vehicle' | 'driver' | 'guide'>('vehicle');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState('');

  const bookingOptions: BookingOption[] = [
    // Vehicles
    {
      id: 'suv-1',
      name: 'Mahindra Scorpio',
      type: 'vehicle',
      price: '₹3,500/day',
      rating: 4.8,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1549377374-6d46e1d58cc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx4LWNhciUyMHN1diUyMG1vdW50YWlufGVufDF8fHx8MTc1ODcxMjMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Comfortable SUV perfect for mountain roads',
      features: ['AC', 'GPS Navigation', 'First Aid Kit', 'Blankets'],
      capacity: 7,
      fuelType: 'Diesel'
    },
    {
      id: 'suv-2',
      name: 'Toyota Innova',
      type: 'vehicle',
      price: '₹4,200/day',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBpbm5vdmElMjBjYXJ8ZW58MXx8fHwxNzU4NzEyMzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Premium comfort for monastery tours',
      features: ['Premium AC', 'Music System', 'Reading Lights', 'USB Charging'],
      capacity: 8,
      fuelType: 'Diesel'
    },
    {
      id: 'tempo-1',
      name: 'Tempo Traveller',
      type: 'vehicle',
      price: '₹5,800/day',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbyUyMHRyYXZlbGxlciUyMGJ1c3xlbnwxfHx8fDE3NTg3MTIzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Ideal for large groups visiting monasteries',
      features: ['Air Conditioning', 'Comfortable Seating', 'Luggage Storage', 'Entertainment'],
      capacity: 12,
      fuelType: 'Diesel'
    },

    // Drivers
    {
      id: 'driver-1',
      name: 'Pemba Sherpa',
      type: 'driver',
      price: '₹1,200/day',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXIlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg3MTIzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Experienced local driver with 15+ years expertise',
      features: ['Safe Driving', 'Punctual', 'Local Knowledge', 'Emergency Trained'],
      experience: '15 years',
      languages: ['English', 'Hindi', 'Nepali', 'Bhutia']
    },
    {
      id: 'driver-2',
      name: 'Tenzin Norbu',
      type: 'driver',
      price: '₹1,000/day',
      rating: 4.8,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXIlMjBtYW4lMjBhc2lhbnxlbnwxfHx8fDE3NTg3MTIzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Friendly and knowledgeable about mountain routes',
      features: ['Mountain Expert', 'Cultural Knowledge', 'Patient', 'First Aid Certified'],
      experience: '12 years',
      languages: ['English', 'Hindi', 'Lepcha', 'Tibetan']
    },
    {
      id: 'driver-3',
      name: 'Karma Lama',
      type: 'driver',
      price: '₹1,350/day',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXIlMjBtYW4lMjBpbmRpYW58ZW58MXx8fHwxNzU4NzEyMzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Premium driver service with monastery expertise',
      features: ['Premium Service', 'Monastery Expert', 'Storyteller', 'Multi-lingual'],
      experience: '18 years',
      languages: ['English', 'Hindi', 'Tibetan', 'Sherpa', 'Bengali']
    },

    // Guides
    {
      id: 'guide-1',
      name: 'Lama Sonam',
      type: 'guide',
      price: '₹2,500/day',
      rating: 4.9,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWlkZSUyMG1hbiUyMGFzaWFufGVufDF8fXx8MTc1ODcxMjMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Former monk with deep spiritual knowledge',
      features: ['Spiritual Guide', 'History Expert', 'Meditation Teacher', 'Cultural Ambassador'],
      experience: '20 years',
      languages: ['English', 'Hindi', 'Tibetan', 'Sanskrit'],
      specialties: ['Buddhist Philosophy', 'Monastery History', 'Meditation', 'Art & Architecture']
    },
    {
      id: 'guide-2',
      name: 'Dr. Pema Wangchuk',
      type: 'guide',
      price: '₹3,200/day',
      rating: 5.0,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWlkZSUyMG1hbiUyMHByb2Zlc3NvcnxlbnwxfHx8fDE3NTg3MTIzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Buddhist scholar and university professor',
      features: ['PhD in Buddhist Studies', 'Author', 'Research Expert', 'International Speaker'],
      experience: '25 years',
      languages: ['English', 'Hindi', 'Tibetan', 'Dzongkha', 'Sanskrit'],
      specialties: ['Buddhist Manuscripts', 'Monastery Architecture', 'Religious Practices', 'Academic Research']
    },
    {
      id: 'guide-3',
      name: 'Yangchen Dolma',
      type: 'guide',
      price: '₹2,200/day',
      rating: 4.8,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9fce2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWlkZSUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzU4NzEyMzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Local historian and cultural preservation expert',
      features: ['Cultural Expert', 'Local Historian', 'Art Specialist', 'Women Empowerment'],
      experience: '14 years',
      languages: ['English', 'Hindi', 'Lepcha', 'Bhutia', 'Nepali'],
      specialties: ['Local Culture', 'Women in Buddhism', 'Traditional Arts', 'Folk Stories']
    }
  ];

  const filteredOptions = bookingOptions.filter(option => option.type === activeTab);

  const handleBooking = (itemId: string) => {
    setSelectedItem(itemId);
    // Here you would normally integrate with a booking system
    alert(`Booking confirmed for ${bookingOptions.find(o => o.id === itemId)?.name}!`);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-card rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-medium text-foreground">Book Your Monastery Tour</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('vehicle')}
            className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'vehicle' 
                ? 'border-b-2 border-primary text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Car className="w-5 h-5" />
            <span className="font-medium">Vehicles</span>
          </button>
          <button
            onClick={() => setActiveTab('driver')}
            className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'driver' 
                ? 'border-b-2 border-primary text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Drivers</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'guide' 
                ? 'border-b-2 border-primary text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Guides</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Booking Date & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div>
              <label className="block font-medium text-foreground mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Booking Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-medium text-foreground mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select duration</option>
                <option value="half-day">Half Day (4 hours)</option>
                <option value="full-day">Full Day (8 hours)</option>
                <option value="2-days">2 Days</option>
                <option value="3-days">3 Days</option>
                <option value="custom">Custom Duration</option>
              </select>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOptions.map((option) => (
              <motion.div
                key={option.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: filteredOptions.indexOf(option) * 0.1 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={option.image}
                    alt={option.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary">{option.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{option.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">{option.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{option.description}</p>

                  {/* Features/Details */}
                  <div className="space-y-2 mb-4">
                    {option.experience && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Experience: {option.experience}</span>
                      </div>
                    )}
                    {option.capacity && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Capacity: {option.capacity} people</span>
                      </div>
                    )}
                    {option.languages && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-primary">Languages:</span>
                        <span className="text-muted-foreground">{option.languages.slice(0, 2).join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {option.features.slice(0, 3).map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{option.reviews} reviews</span>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>Instant Contact</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleBooking(option.id)}
                    disabled={!bookingDate || !duration}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 bg-accent/20 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Booking Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All prices include basic insurance and emergency support</li>
              <li>• Free cancellation up to 24 hours before booking date</li>
              <li>• Advance payment of 30% required to confirm booking</li>
              <li>• Local permits and entrance fees included for monastery visits</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}