import { DatePipe, NgClass } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { UserDataService, UserReservation } from '../../core/services/user-data.service';

type Sport = 'futbol' | 'padel' | null;

interface TimeSlot {
  time: string;
  available: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './booking.page.html',
})
export class BookingPageComponent {
  auth = inject(AuthService);
  private userData = inject(UserDataService);

  selectedSport = signal<Sport>(null);
  today = new Date();
  myReservations = signal<UserReservation[]>([]);

  timeSlots = signal<TimeSlot[]>([
    { time: '09:00', available: true, selected: false },
    { time: '10:30', available: false, selected: false },
    { time: '12:00', available: true, selected: false },
    { time: '13:30', available: true, selected: false },
    { time: '15:00', available: false, selected: false },
    { time: '16:30', available: false, selected: false },
    { time: '18:00', available: true, selected: false },
    { time: '19:30', available: true, selected: false },
    { time: '21:00', available: true, selected: false },
  ]);

  constructor() {
    effect(() => {
      const email = this.auth.currentUser()?.email;
      if (!email) {
        this.myReservations.set([]);
        return;
      }

      this.myReservations.set(this.userData.getReservations(email));
    });
  }

  selectSport(sport: Sport) {
    this.selectedSport.set(sport);
    if (sport) {
      this.timeSlots.update((slots) =>
        slots.map((slot) => ({ ...slot, available: Math.random() > 0.4, selected: false })),
      );
    }
  }

  selectSlot(selectedSlot: TimeSlot) {
    if (!selectedSlot.available) return;

    this.timeSlots.update((slots) =>
      slots.map((slot) => ({
        ...slot,
        selected: slot.time === selectedSlot.time ? !slot.selected : false,
      })),
    );
  }

  hasSelectedSlot(): boolean {
    return this.timeSlots().some((slot) => slot.selected);
  }

  confirmReservation() {
    const email = this.auth.currentUser()?.email;
    const sport = this.selectedSport();
    const selected = this.timeSlots().find((slot) => slot.selected);

    if (!email || !sport || !selected) {
      return;
    }

    const reservation: UserReservation = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      sport: sport === 'futbol' ? 'Fútbol' : 'Pádel',
      court: this.buildCourtName(sport),
      date: this.formatDate(this.today),
      time: selected.time,
      status: 'Pendiente',
    };

    const updated = this.userData.addReservation(email, reservation);
    this.myReservations.set(updated);

    this.timeSlots.update((slots) =>
      slots.map((slot) =>
        slot.time === selected.time
          ? { ...slot, available: false, selected: false }
          : { ...slot, selected: false },
      ),
    );
  }

  deleteReservation(reservationId: string) {
    const email = this.auth.currentUser()?.email;
    if (!email) {
      return;
    }

    const updated = this.userData.deleteReservation(email, reservationId);
    this.myReservations.set(updated);
  }

  private buildCourtName(sport: Exclude<Sport, null>): string {
    if (sport === 'futbol') {
      return Math.random() > 0.5 ? 'Pista 1 (F11)' : 'Pista 2 (F7)';
    }

    const padelCourts = ['Pista Cristal 1', 'Pista Cristal 2', 'Pista Muro'];
    return padelCourts[Math.floor(Math.random() * padelCourts.length)];
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`;
  }
}
