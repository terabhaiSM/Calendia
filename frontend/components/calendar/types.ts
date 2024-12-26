export interface Event {
    id: string;
    title: string;
    day: string;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
    attendees?: string[];
  }
  
  export interface TimeSlot {
    day: string;
    time: string;
    isAvailable: boolean;
  }