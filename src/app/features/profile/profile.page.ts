import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthStore } from '../../core/auth/auth.store';
import { ProfileApiService } from '../../core/services/profile-api.service';
import { ProfileReservation, ProfileSummary } from '../../core/models/profile.models';
import { ReservationsApiService } from '../../core/services/reservations-api.service';
import { GymApiService } from '../../core/services/gym-api.service';
import { RoutineDay } from '../../core/models/gym.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.page.html',
})
export class ProfilePageComponent implements OnInit {
  auth = inject(AuthStore);
  private authStore = inject(AuthStore);
  private profileApi = inject(ProfileApiService);
  private reservationsApi = inject(ReservationsApiService);
  private gymApi = inject(GymApiService);

  profile = signal<ProfileSummary | null>(null);
  myReservations = signal<ProfileReservation[]>([]);
  myRoutine = signal<RoutineDay[]>([]);
  loading = signal(true);

  ngOnInit() {
    const session = this.authStore.session();
    if (!session) return;

    this.profileApi.getByClient(session.clientId).subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.myReservations.set(profile.reservations);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    this.gymApi.getByClient(session.clientId).subscribe({
      next: (routine) => this.myRoutine.set(routine),
    });
  }

  deleteReservation(reservationId: string) {
    this.reservationsApi.delete(reservationId).subscribe({
      next: () => {
        this.myReservations.update((res) => res.filter((r) => r.id !== reservationId));
      },
    });
  }

  deleteExercise(dayId: number, exerciseId: string) {
    // Note: This would need a specific API endpoint for deleting exercises
    // For now, remove locally and update the full routine
    const session = this.authStore.session();
    if (!session) return;

    const updatedRoutine = this.myRoutine().map((day) => {
      if (day.dayOrder !== dayId) return day;
      return {
        ...day,
        exercises: day.exercises.filter((e) => e.id !== exerciseId),
      };
    });

    this.myRoutine.set(updatedRoutine);
    this.gymApi.update(session.clientId, { days: updatedRoutine }).subscribe();
  }

  deleteDay(dayId: number) {
    const session = this.authStore.session();
    if (!session) return;

    const updatedRoutine = this.myRoutine().filter((day) => day.dayOrder !== dayId);
    this.myRoutine.set(updatedRoutine);
    this.gymApi.update(session.clientId, { days: updatedRoutine }).subscribe();
  }
}
