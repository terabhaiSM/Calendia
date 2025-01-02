export interface RegisterUserRequest {
    name: string;
    email: string;
    id: string;
    createdAt: Date;
  }
  
  export interface AvailabilitySetupRequest {
    ownerId: string;
    availability: {
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }[];
  }

  export interface SearchAvailableSlotsRequest {
    ownerId: string;
    date: string; // Format: YYYY-MM-DD
  }
  
  export interface AvailableSlot {
    startTime: string; // Format: HH:mm
    endTime: string; // Format: HH:mm
  }