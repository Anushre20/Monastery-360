import { Heart } from "lucide-react";

export function DonateButton() {
  return (
    <div className="px-8 py-8">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-center max-w-sm mx-auto">
        <Heart className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium text-primary-foreground mb-2">
          Support Our Monastery
        </h3>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Help preserve this sacred place and its rich history for future generations.
        </p>
        <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Donate Now
        </button>
      </div>
    </div>
  );
}