import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface ScheduleEvent {
  time: string;
  title: string;
  location: string;
  status: string;
  isPublic: boolean;
}

interface DaySchedule {
  date: string;
  dayName: string;
  events: ScheduleEvent[];
}

export function DailySchedule() {
  const scheduleData: DaySchedule[] = [
    {
      date: "Sep 23",
      dayName: "Today",
      events: [
        {
          time: "6:00 AM",
          title: "Morning Prayer",
          location: "Main Chapel",
          status: "Private Service",
          isPublic: false
        },
        {
          time: "9:00 AM",
          title: "Guided Monastery Tour",
          location: "Courtyard",
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "11:00 AM",
          title: "Chapel Hall Prayer",
          location: "Chapel Hall", 
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "2:00 PM",
          title: "Manuscript Exhibition",
          location: "Ancient Scriptorium",
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "4:30 PM",
          title: "Bell Tower Visit",
          location: "Bell Tower",
          status: "Guided Tours Only",
          isPublic: true
        },
        {
          time: "6:00 PM",
          title: "Evening Vespers",
          location: "Main Chapel",
          status: "Open to All",
          isPublic: true
        }
      ]
    },
    {
      date: "Sep 24",
      dayName: "Tomorrow", 
      events: [
        {
          time: "6:00 AM",
          title: "Morning Prayer",
          location: "Main Chapel",
          status: "Private Service",
          isPublic: false
        },
        {
          time: "8:30 AM",
          title: "Historical Lecture",
          location: "Library",
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "10:00 AM",
          title: "Garden Meditation",
          location: "Cloister Walk",
          status: "Open to Public", 
          isPublic: true
        },
        {
          time: "1:00 PM",
          title: "Calligraphy Workshop",
          location: "Ancient Scriptorium",
          status: "Registration Required",
          isPublic: true
        },
        {
          time: "3:00 PM",
          title: "Architectural Tour",
          location: "Throughout Monastery",
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "6:00 PM",
          title: "Evening Vespers",
          location: "Main Chapel", 
          status: "Open to All",
          isPublic: true
        }
      ]
    },
    {
      date: "Sep 25",
      dayName: "Wednesday",
      events: [
        {
          time: "6:00 AM",
          title: "Morning Prayer",
          location: "Main Chapel",
          status: "Private Service",
          isPublic: false
        },
        {
          time: "9:30 AM",
          title: "Monastery History Tour",
          location: "Courtyard",
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "11:30 AM",
          title: "Silent Reflection",
          location: "Chapel Hall",
          status: "Open to All",
          isPublic: true
        },
        {
          time: "2:30 PM",
          title: "Illuminated Manuscript Display",
          location: "Library",
          status: "Open to Public",
          isPublic: true
        },
        {
          time: "5:00 PM",
          title: "Choral Practice",
          location: "Main Chapel",
          status: "Observation Welcome",
          isPublic: true
        },
        {
          time: "6:00 PM",
          title: "Evening Vespers",
          location: "Main Chapel",
          status: "Open to All",
          isPublic: true
        }
      ]
    }
  ];

  return (
    <div className="px-4 py-6">
      <div className="mb-4">
        <h2 className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Today's Schedule
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Daily events and services at the monastery
        </p>
      </div>

      {/* Horizontally Scrollable Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {scheduleData.map((day, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-4 snap-start"
          >
            {/* Day Header */}
            <div className="mb-4 pb-3 border-b border-border">
              <h3 className="text-primary">{day.dayName}</h3>
              <p className="text-sm text-muted-foreground">{day.date}</p>
            </div>

            {/* Events List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {day.events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`p-3 rounded-lg border transition-colors ${
                    event.isPublic 
                      ? 'bg-accent/50 border-accent hover:bg-accent' 
                      : 'bg-muted/50 border-muted hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                    {event.isPublic && (
                      <Users className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  
                  <h4 className="font-medium text-foreground mb-1">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {event.location}
                    </span>
                  </div>
                  
                  <div className={`text-xs px-2 py-1 rounded-full w-fit ${
                    event.isPublic
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted-foreground/10 text-muted-foreground'
                  }`}>
                    {event.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-3">
        <div className="flex gap-1">
          {scheduleData.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}