import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { RoutineDay, UserDataService, UserReservation } from '../../core/services/user-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.page.html',
})
export class ProfilePageComponent {
  auth = inject(AuthService);
  private userData = inject(UserDataService);

  myReservations = signal<UserReservation[]>([]);
  myRoutine = signal<RoutineDay[]>([]);

  constructor() {
    effect(() => {
      const email = this.auth.currentUser()?.email;

      if (!email) {
        this.myReservations.set([]);
        this.myRoutine.set([]);
        return;
      }

      this.myReservations.set(this.userData.getReservations(email));
      this.myRoutine.set(this.userData.getRoutine(email));
    });
  }

  deleteReservation(reservationId: string) {
    const email = this.auth.currentUser()?.email;
    if (!email) {
      return;
    }

    const updated = this.userData.deleteReservation(email, reservationId);
    this.myReservations.set(updated);
  }

  deleteExercise(dayId: number, exerciseId: string) {
    const email = this.auth.currentUser()?.email;
    if (!email) {
      return;
    }

    const updatedRoutine = this.myRoutine().map((day) => {
      if (day.id !== dayId) {
        return day;
      }

      return {
        ...day,
        exercises: day.exercises.filter((exercise) => exercise.id !== exerciseId),
      };
    });

    this.userData.saveRoutine(email, updatedRoutine);
    this.myRoutine.set(updatedRoutine);
  }

  deleteDay(dayId: number) {
    const email = this.auth.currentUser()?.email;
    if (!email) {
      return;
    }

    const updatedRoutine = this.myRoutine()
      .filter((day) => day.id !== dayId)
      .map((day, index) => ({ ...day, id: index + 1 }));

    this.userData.saveRoutine(email, updatedRoutine);
    this.myRoutine.set(updatedRoutine);
  }
}
