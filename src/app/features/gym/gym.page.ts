import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { RoutineDay, RoutineExercise, UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-gym',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './gym.page.html',
})
export class GymPageComponent {
  auth = inject(AuthService);
  private userData = inject(UserDataService);

  isEditing = signal(false);
  daysCount = signal(1);
  selectedDayId = signal(1);

  routineDays = signal<RoutineDay[]>([]);

  currentDay = computed(() => {
    return this.routineDays().find((d) => d.id === this.selectedDayId());
  });

  constructor() {
    effect(() => {
      const email = this.auth.currentUser()?.email;
      if (!email) {
        this.routineDays.set(this.defaultRoutine());
        this.daysCount.set(this.routineDays().length);
        this.selectedDayId.set(this.routineDays()[0]?.id ?? 1);
        return;
      }

      const savedRoutine = this.userData.getRoutine(email);
      const routineToUse = savedRoutine.length > 0 ? savedRoutine : this.defaultRoutine();

      if (savedRoutine.length === 0) {
        this.userData.saveRoutine(email, routineToUse);
      }

      this.routineDays.set(routineToUse);
      this.daysCount.set(routineToUse.length);
      this.selectedDayId.set(routineToUse[0]?.id ?? 1);
      this.isEditing.set(false);
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
    if (newCount < 1 || newCount > 7) {
      return;
    }

    this.routineDays.update((days) => {
      if (change > 0) {
        const maxId = days.length > 0 ? Math.max(...days.map((d) => d.id)) : 0;
        return [...days, { id: maxId + 1, name: '', exercises: [] }];
      }

      const updated = days.slice(0, newCount);
      if (!updated.some((d) => d.id === this.selectedDayId())) {
        this.selectedDayId.set(updated[updated.length - 1]?.id ?? 1);
      }
      return updated;
    });

    this.daysCount.set(newCount);
    this.persistRoutine();
  }

  removeCurrentDay() {
    const idToRemove = this.selectedDayId();

    this.routineDays.update((days) => {
      if (days.length <= 1) {
        return days;
      }

      const filtered = days.filter((d) => d.id !== idToRemove);
      const reindexed = filtered.map((day, index) => ({ ...day, id: index + 1 }));
      this.selectedDayId.set(reindexed[0].id);
      this.daysCount.set(reindexed.length);
      return reindexed;
    });

    this.persistRoutine();
  }

  selectDay(id: number) {
    this.selectedDayId.set(id);
  }

  updateDayName(name: string) {
    this.routineDays.update((days) =>
      days.map((d) => (d.id === this.selectedDayId() ? { ...d, name } : d)),
    );
    this.persistRoutine();
  }

  addExercise() {
    this.routineDays.update((days) =>
      days.map((d) => {
        if (d.id === this.selectedDayId()) {
          const newExercise: RoutineExercise = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: '',
            sets: 3,
            reps: '10',
            rest: '60s',
          };

          return {
            ...d,
            exercises: [...d.exercises, newExercise],
          };
        }
        return d;
      }),
    );
    this.persistRoutine();
  }

  updateExercise(exerciseId: string, field: keyof RoutineExercise, value: string | number) {
    this.routineDays.update((days) =>
      days.map((d) => {
        if (d.id === this.selectedDayId()) {
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

  removeExercise(exerciseId: string) {
    this.routineDays.update((days) =>
      days.map((d) => {
        if (d.id === this.selectedDayId()) {
          return { ...d, exercises: d.exercises.filter((e) => e.id !== exerciseId) };
        }
        return d;
      }),
    );
    this.persistRoutine();
  }

  private persistRoutine() {
    const email = this.auth.currentUser()?.email;
    if (!email) {
      return;
    }

    this.userData.saveRoutine(email, this.routineDays());
  }

  private defaultRoutine(): RoutineDay[] {
    return [
      {
        id: 1,
        name: 'Fuerza',
        exercises: [
          { id: '1', name: 'Sentadilla Libre', sets: 4, reps: '10', rest: '90s' },
          { id: '2', name: 'Press de Banca', sets: 4, reps: '8', rest: '90s' },
          { id: '3', name: 'Dominadas', sets: 3, reps: '10', rest: '60s' },
          { id: '4', name: 'Plancha Abdominal', sets: 3, reps: '60s', rest: '45s' },
        ],
      },
      { id: 2, name: '', exercises: [] },
      { id: 3, name: '', exercises: [] },
    ];
  }
}
