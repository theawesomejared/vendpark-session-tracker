export type ParkingSessionData = {
  id?: string;
  phoneNumber: string;
  licensePlate: string;
  startTime: number;
  endTime: number | null;
};

export type SessionPropValidation = {
  valid: boolean;
  message: string;
};

export type SessionDataValidation = Record<
  "licensePlate" | "phoneNumber",
  SessionPropValidation
>;
