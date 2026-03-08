import {Injectable} from '@angular/core';

export interface UserReservation {
  id: string;
  sport: string;
  court: string;
  date: string;
  time: string;
  status: 'Pendiente' | 'Completada' | 'Cancelada';
}

export interface RoutineExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface RoutineDay {
  id: number;
  name: string;
  exercises: RoutineExercise[];
}

interface UserStorageData {
  reservations: UserReservation[];
  routineDays: RoutineDay[];
}

const STORAGE_PREFIX = 'emily.userdata.';

@Injectable({providedIn: 'root'})
export class UserDataService {

  getReservations(userEmail: string): UserReservation[] {
    return this.read(userEmail).reservations;
  }

  addReservation(userEmail: string, reservation: UserReservation): UserReservation[] {
    const data = this.read(userEmail);
    data.reservations = [reservation, ...data.reservations];
    this.write(userEmail, data);
    return data.reservations;
  }

  deleteReservation(userEmail: string, reservationId: string): UserReservation[] {
    const data = this.read(userEmail);
    data.reservations = data.reservations.filter((r) => r.id !== reservationId);
    this.write(userEmail, data);
    return data.reservations;
  }

  getRoutine(userEmail: string): RoutineDay[] {
    return this.read(userEmail).routineDays;
  }

  saveRoutine(userEmail: string, routineDays: RoutineDay[]): RoutineDay[] {
    const data = this.read(userEmail);
    data.routineDays = routineDays;
    this.write(userEmail, data);
    return data.routineDays;
  }

  private read(userEmail: string): UserStorageData {
    const key = this.getKey(userEmail);
    const raw = localStorage.getItem(key);

    if (!raw) {
      return {reservations: [], routineDays: []};
    }

    try {
      const parsed = JSON.parse(raw) as UserStorageData;
      return {
        reservations: parsed.reservations ?? [],
        routineDays: parsed.routineDays ?? [],
      };
    } catch {
      return {reservations: [], routineDays: []};
    }
  }

  private write(userEmail: string, data: UserStorageData) {
    const key = this.getKey(userEmail);
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getKey(userEmail: string): string {
    return `${STORAGE_PREFIX}${userEmail.trim().toLowerCase()}`;
  }
}
