export interface RegisterUserRequest {
    name: string;
    email: string;
    id: number;
    createdAt: Date;
  }
  
  export interface AvailabilitySetupRequest {
    ownerId: number;
    availability: {
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }[];
  }

  export interface SearchAvailableSlotsRequest {
    ownerId: number;
    date: string; // Format: YYYY-MM-DD
  }
  
  export interface AvailableSlot {
    startTime: string; // Format: HH:mm
    endTime: string; // Format: HH:mm
  }