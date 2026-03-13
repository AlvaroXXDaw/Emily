export type SportType = 'FUTBOL' | 'PADEL';
export type ReservationStatus = 'ACTIVE' | 'MAINTENANCE' | 'PENDING' | 'COMPLETED';

export interface Reservation {
  id: string;
  clientId: string | null;
  userName: string;
  sport: SportType;
  court: string;
  date: string;
  time: string;
  status: ReservationStatus;
}

export interface CreateReservationRequest {
  clientId?: string;
  userName: string;
  sport: SportType;
  court: string;
  date: string;
  time: string;
}

export interface CreateMaintenanceBlockRequest {
  sport: SportType;
  court: string;
  date: string;
  time: string;
}

export interface AvailabilitySlot {
  time: string;
  available: boolean;
  selected?: boolean;
}
