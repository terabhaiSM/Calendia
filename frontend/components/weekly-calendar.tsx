"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);

export function WeeklyCalendar() {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-[auto_repeat(7,_minmax(120px,_1fr))] gap-1 min-w-[800px]">
        {/* Time labels */}
        <div className="sticky left-0 bg-background">
          <div className="h-10" /> {/* Header spacer */}
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
            {timeSlots.map((time) => (
              <div
                key={`${day}-${time}`}
                className={cn(
                  "h-12 border border-dashed rounded-md cursor-pointer hover:bg-accent hover:border-solid transition-colors",
                  "group"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}