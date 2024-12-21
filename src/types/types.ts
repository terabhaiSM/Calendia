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