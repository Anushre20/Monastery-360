import { useState } from "react";
import { AlertTriangle, Phone, MapPin, Clock, X } from "lucide-react";

export function SOSButton() {
  const [showModal, setShowModal] = useState(false);

  const emergencyContacts = [
    {
      service: "Emergency Services",
      number: "108",
      description: "Police, Fire, Medical Emergency"
    },
    {
      service: "Tourist Helpline",
      number: "1363",
      description: "24/7 Tourist assistance"
    },
    {
      service: "Monastery Emergency",
      number: "+91-9876543210",
      description: "Monastery security and assistance"
    },
    {
      service: "Local Police",
      number: "100",
      description: "Gangtok Police Station"
    }
  ];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-6 z-40 bg-destructive text-destructive-foreground p-3 rounded-full shadow-lg hover:scale-105 transition-transform animate-pulse"
        title="Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h3 className="font-medium text-foreground">Emergency Assistance</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                In case of immediate danger, call 108 (Emergency Services)
              </p>
            </div>

            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{contact.service}</h4>
                    <p className="text-lg font-medium text-primary">{contact.number}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <button 
                    onClick={() => window.open(`tel:${contact.number}`)}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    Call
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Current Location: Monastery 360, Gangtok, Sikkim</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last Updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Safety Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stay on designated paths</li>
                <li>• Inform someone of your location</li>
                <li>• Keep emergency contacts handy</li>
                <li>• Follow monastery guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}