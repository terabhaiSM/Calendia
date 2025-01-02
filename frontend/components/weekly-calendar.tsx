"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { EventDetailsModal } from "./calendar/event-details-modal";
import { CreateEventModal } from "@/components/calendar/create-event-modal";
import { useEvents } from "@/hooks/use-events";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, "0")}:00`
);

interface CalendarEvent {
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  id: string;
}

interface TimeSlot {
  day: string;
  time: string;
}

export function WeeklyCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const { events, isTimeAvailable, addEvent } = useEvents();

  const getEventForSlot = (day: string, time: string) => {
    return events.find(event => 
      event.day === day && 
      event.startTime <= time && 
      event.endTime > time
    );
  };

  const handleSlotClick = (day: string, time: string) => {
    const event = getEventForSlot(day, time);
    if (event) {
      setSelectedEvent(event);
    } else if (isTimeAvailable(day, time)) {
      setSelectedSlot({ day, time });
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[auto_repeat(7,_minmax(120px,_1fr))] gap-1 min-w-[800px]">
          {/* Time labels */}
          <div className="sticky left-0 bg-background">
            <div className="h-10" />
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-12 flex items-center justify-end pr-2 text-sm text-muted-foreground"
              >
                {time}
              </div>
            ))}
          </div>

          {/* Days columns */}
          {weekDays.map((day) => (
            <div key={day} className="space-y-1">
              <div className="h-10 flex items-center justify-center font-medium">
                {day}
              </div>
              {timeSlots.map((time) => {
                const event = getEventForSlot(day, time);
                const available = isTimeAvailable(day, time);
                return (
                  <div
                    key={`${day}-${time}`}
                    className={cn(
                      "h-12 border rounded-md transition-colors relative",
                      event ? "bg-primary/10 border-primary cursor-pointer" : 
                      available ? "border-dashed hover:bg-accent hover:border-solid cursor-pointer" : 
                      "bg-muted border-muted cursor-not-allowed",
                      !available && !event && "after:content-[''] after:absolute after:inset-0 after:bg-background/80 after:border-muted after:border after:rounded-md",
                      "group"
                    )}
                    onClick={() => handleSlotClick(day, time)}
                  >
                    {event && time === event.startTime && (
                      <div className="p-1 text-xs truncate">
                        {event.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <EventDetailsModal
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <CreateEventModal
        open={!!selectedSlot}
        onClose={() => setSelectedSlot(null)}
        selectedSlot={selectedSlot}
        onCreateEvent={addEvent}
      />
    </>
  );
}