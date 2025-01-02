"use client";

import { useState } from "react";
import { Event } from "@/components/calendar/types";

// Mock data for demonstration
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    day: "Mon",
    startTime: "10:00",
    endTime: "11:00",
    description: "Weekly team sync",
    location: "Conference Room A",
    attendees: ["John Doe", "Jane Smith"],
  },
  {
    id: "2",
    title: "Client Call",
    day: "Wed",
    startTime: "14:00",
    endTime: "15:00",
    description: "Project review with client",
    location: "Virtual",
    attendees: ["Client A", "Project Manager"],
  },
];

// Non-available time slots (e.g., outside working hours)
const nonAvailableHours = {
  beforeWork: Array.from({ length: 9 }, (_, i) => `${i.toString().padStart(2, "0")}:00`),
  afterWork: Array.from({ length: 6 }, (_, i) => `${(i + 18).toString().padStart(2, "0")}:00`),
};

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const isTimeAvailable = (day: string, time: string) => {
    const hour = parseInt(time.split(":")[0]);
    
    // Check if time is within working hours (9 AM - 6 PM)
    if (hour < 9 || hour >= 18) {
      return false;
    }

    // Check if time slot is not already booked
    return !events.some(
      (event) =>
        event.day === day &&
        event.startTime <= time &&
        event.endTime > time
    );
  };

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  return {
    events,
    addEvent,
    isTimeAvailable,
    nonAvailableHours,
  };
}