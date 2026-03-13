import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthStore } from '../../core/auth/auth.store';
import { GymApiService } from '../../core/services/gym-api.service';
import { RoutineDay, RoutineExercise } from '../../core/models/gym.models';

@Component({
  selector: 'app-gym',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './gym.page.html',
})
export class GymPageComponent implements OnInit {
  auth = inject(AuthStore);
  private authStore = inject(AuthStore);
  private gymApi = inject(GymApiService);

  isEditing = signal(false);
  daysCount = signal(1);
  selectedDayId = signal(1);
  routineDays = signal<RoutineDay[]>([]);

  currentDay = computed(() => {
    return this.routineDays().find((d) => d.dayOrder === this.selectedDayId());
  });

  ngOnInit() {
    const session = this.authStore.session();
    if (!session) {
      this.routineDays.set(this.defaultRoutine());
      this.daysCount.set(this.routineDays().length);
      return;
    }

    this.gymApi.getByClient(session.clientId).subscribe({
      next: (days) => {
        const routineToUse = days.length > 0 ? days : this.defaultRoutine();
        this.routineDays.set(routineToUse);
        this.daysCount.set(routineToUse.length);
        this.selectedDayId.set(routineToUse[0]?.dayOrder ?? 1);
      },
    });
  }

  toggleEdit() {
    const nextState = !this.isEditing();
    this.isEditing.set(nextState);

    if (!nextState) {
      this.persistRoutine();
    }
  }

  updateDays(change: number) {
    const newCount = this.daysCount() + change;
    if (newCount < 1 || newCount > 7) return;

    this.routineDays.update((days) => {
      if (change > 0) {
        const maxOrder = days.length > 0 ? Math.max(...days.map((d) => d.dayOrder ?? 0)) : 0;
        return [...days, { dayOrder: maxOrder + 1, name: '', exercises: [] }];
      }

      const updated = days.slice(0, newCount);
      if (!updated.some((d) => d.dayOrder === this.selectedDayId())) {
        this.selectedDayId.set(updated[updated.length - 1]?.dayOrder ?? 1);
      }
      return updated;
    });

    this.daysCount.set(newCount);
    this.persistRoutine();
  }

  removeCurrentDay() {
    const idToRemove = this.selectedDayId();

    this.routineDays.update((days) => {
      if (days.length <= 1) return days;
      const filtered = days.filter((d) => d.dayOrder !== idToRemove);
      const reindexed = filtered.map((day, index) => ({ ...day, dayOrder: index + 1 }));
      this.selectedDayId.set(reindexed[0]?.dayOrder ?? 1);
      this.daysCount.set(reindexed.length);
      return reindexed;
    });

    this.persistRoutine();
  }

  selectDay(dayOrder: number) {
    this.selectedDayId.set(dayOrder);
  }

  updateDayName(name: string) {
    this.routineDays.update((days) =>
      days.map((d) => (d.dayOrder === this.selectedDayId() ? { ...d, name } : d)),
    );
    this.persistRoutine();
  }

  addExercise() {
    this.routineDays.update((days) =>
      days.map((d) => {
        if (d.dayOrder === this.selectedDayId()) {
          const newExercise: RoutineExercise = {
            name: '',
            sets: 3,
            reps: '10',
            rest: '60s',
          };
          return { ...d, exercises: [...d.exercises, newExercise] };
        }
        return d;
      }),
    );
    this.persistRoutine();
  }

  updateExercise(exerciseId: string | undefined, field: keyof RoutineExercise, value: string | number) {
    this.routineDays.update((days) =>
      days.map((d) => {
        if (d.dayOrder === this.selectedDayId()) {
          return {
            ...d,
            exercises: d.exercises.map((e) => (e.id === exerciseId ? { ...e, [field]: value } : e)),
          };
        }
        return d;
      }),
    );
    this.persistRoutine();
  }

  removeExercise(exerciseId: string | undefined) {
    this.routineDays.update((days) =>
      days.map((d) => {
        if (d.dayOrder === this.selectedDayId()) {
          return { ...d, exercises: d.exercises.filter((e) => e.id !== exerciseId) };
        }
        return d;
      }),
    );
    this.persistRoutine();
  }

  private persistRoutine() {
    const session = this.authStore.session();
    if (!session) return;

    this.gymApi.update(session.clientId, { days: this.routineDays() }).subscribe();
  }

  private defaultRoutine(): RoutineDay[] {
    return [
      {
        dayOrder: 1,
        name: 'Fuerza',
        exercises: [
          { name: 'Sentadilla Libre', sets: 4, reps: '10', rest: '90s' },
          { name: 'Press de Banca', sets: 4, reps: '8', rest: '90s' },
          { name: 'Dominadas', sets: 3, reps: '10', rest: '60s' },
          { name: 'Plancha Abdominal', sets: 3, reps: '60s', rest: '45s' },
        ],
      },
      { dayOrder: 2, name: '', exercises: [] },
      { dayOrder: 3, name: '', exercises: [] },
    ];
  }
}
