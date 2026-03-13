import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthStore } from '../../core/auth/auth.store';
import { ReservationsApiService } from '../../core/services/reservations-api.service';
import {
  AvailabilitySlot,
  CreateReservationRequest,
  Reservation,
  SportType,
} from '../../core/models/reservation.models';

type Sport = 'FUTBOL' | 'PADEL' | null;

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './booking.page.html',
})
export class BookingPageComponent {
  auth = inject(AuthStore);
  private authStore = inject(AuthStore);
  private reservationsApi = inject(ReservationsApiService);

  selectedSport = signal<Sport>(null);
  today = new Date();
  myReservations = signal<Reservation[]>([]);
  timeSlots = signal<AvailabilitySlot[]>([]);

  selectSport(sport: Sport) {
    this.selectedSport.set(sport);
    if (!sport) return;

    const dateStr = this.formatDate(this.today);
    this.reservationsApi.getAvailability(sport, dateStr).subscribe({
      next: (slots) => this.timeSlots.set(slots),
    });

    this.loadMyReservations();
  }

  private loadMyReservations() {
    const sport = this.selectedSport();
    if (!sport) return;

    const session = this.authStore.session();
    if (!session) return;

    this.reservationsApi.getAll({ sport }).subscribe({
      next: (reservations) => {
        const mine = reservations.filter((r) => r.clientId === session.clientId);
        this.myReservations.set(mine);
      },
    });
  }

  selectSlot(selectedSlot: AvailabilitySlot) {
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
    const session = this.authStore.session();
    const sport = this.selectedSport();
    const selected = this.timeSlots().find((slot) => slot.selected);

    if (!session || !sport || !selected) return;

    const courts: Record<string, string[]> = {
      FUTBOL: ['Pista 1 (F11)', 'Pista 2 (F7)'],
      PADEL: ['Pista Cristal 1', 'Pista Cristal 2', 'Pista Muro'],
    };
    const sportCourts = courts[sport];
    const court = sportCourts[Math.floor(Math.random() * sportCourts.length)];

    const request: CreateReservationRequest = {
      clientId: session.clientId,
      userName: session.name,
      sport,
      court,
      date: this.formatDate(this.today),
      time: selected.time + ':00',
    };

    this.reservationsApi.create(request).subscribe({
      next: (reservation) => {
        this.myReservations.update((res) => [reservation, ...res]);

        this.timeSlots.update((slots) =>
          slots.map((slot) =>
            slot.time === selected.time
              ? { ...slot, available: false, selected: false }
              : { ...slot, selected: false },
          ),
        );
      },
    });
  }

  deleteReservation(reservationId: string) {
    this.reservationsApi.delete(reservationId).subscribe({
      next: () => {
        this.myReservations.update((res) => res.filter((r) => r.id !== reservationId));
        // Reload availability
        const sport = this.selectedSport();
        if (sport) {
          this.reservationsApi.getAvailability(sport, this.formatDate(this.today)).subscribe({
            next: (slots) => this.timeSlots.set(slots),
          });
        }
      },
    });
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`;
  }
}
