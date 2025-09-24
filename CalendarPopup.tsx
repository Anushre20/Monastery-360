import { Calendar } from "./ui/calendar";
import { X } from "lucide-react";
import { useState } from "react";

interface CalendarPopupProps {
  onClose: () => void;
}

export function CalendarPopup({ onClose }: CalendarPopupProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Example events for highlighting
  const eventDates = [
    new Date(2024, 11, 25), // Christmas
    new Date(2025, 0, 1),   // New Year
    new Date(2025, 1, 14),  // Valentine's Day
    new Date(2025, 2, 21),  // Spring Festival
    new Date(2025, 3, 13),  // Buddha Jayanti
  ];

  const isEventDate = (day: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === day.getDate() &&
      eventDate.getMonth() === day.getMonth() &&
      eventDate.getFullYear() === day.getFullYear()
    );
  };

  const getEventForDate = (day: Date) => {
    const events = [
      { date: new Date(2024, 11, 25), name: "Christmas Celebration" },
      { date: new Date(2025, 0, 1), name: "New Year Prayer" },
      { date: new Date(2025, 1, 14), name: "Love & Compassion Day" },
      { date: new Date(2025, 2, 21), name: "Spring Festival" },
      { date: new Date(2025, 3, 13), name: "Buddha Jayanti" },
    ];

    return events.find(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">Monastery Events</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-accent transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border-0"
        modifiers={{
          event: eventDates,
        }}
        modifiersStyles={{
          event: {
            backgroundColor: '#f8bbd9',
            color: '#5d4037',
            fontWeight: 'bold',
          },
        }}
      />

      {date && getEventForDate(date) && (
        <div className="mt-4 p-3 bg-secondary rounded-lg">
          <h4 className="font-medium text-secondary-foreground">
            {getEventForDate(date)?.name}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Special monastery event on {date.toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-sm text-foreground">Upcoming Events:</h4>
        {eventDates.slice(0, 3).map((eventDate, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{eventDate.toLocaleDateString()}</span>
            <span className="text-foreground">{getEventForDate(eventDate)?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}