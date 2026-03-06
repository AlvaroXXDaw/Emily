import { Component, signal, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

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
  template: `
    <div class="min-h-screen bg-white pt-24">
      @if (!auth.isLoggedIn()) {
        <div class="h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center px-6 bg-[#f8f9fa]">
          <div class="w-20 h-20 rounded-full bg-white border border-black/5 flex items-center justify-center mb-8 shadow-sm">
            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 class="text-4xl font-light tracking-tighter text-emerald-950 uppercase mb-4">Acceso Restringido</h2>
          <p class="text-gray-500 font-light mb-10 max-w-md text-lg">
            Para reservar pistas y ver la disponibilidad en tiempo real, necesitas iniciar sesión en tu cuenta de socio.
          </p>
          <a routerLink="/login" class="bg-emerald-950 text-white px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-emerald-900 transition-colors">
            Iniciar Sesión
          </a>
        </div>
      } @else {
        @if (!selectedSport()) {
          <div class="flex flex-col lg:flex-row h-[calc(100vh-6rem)]">
            <!-- Futbol -->
            <button (click)="selectSport('futbol')" class="relative flex-1 group cursor-pointer overflow-hidden border-none p-0 text-left focus:outline-none focus:ring-4 focus:ring-emerald-950/50">
              <img src="https://images.unsplash.com/photo-1518605368461-1ee7c532066d?q=80&w=2070&auto=format&fit=crop" alt="Fútbol" class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" referrerpolicy="no-referrer">
              <div class="absolute inset-0 bg-emerald-950/40 group-hover:bg-emerald-950/20 transition-colors duration-700"></div>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <span class="text-xs font-semibold tracking-[0.3em] uppercase mb-4 opacity-80">01 // Deporte</span>
                <h2 class="text-6xl lg:text-8xl font-light tracking-tighter uppercase">Fútbol</h2>
              </div>
            </button>
            
            <!-- Padel -->
            <button (click)="selectSport('padel')" class="relative flex-1 group cursor-pointer overflow-hidden border-none p-0 text-left focus:outline-none focus:ring-4 focus:ring-emerald-950/50">
              <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop" alt="Pádel" class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" referrerpolicy="no-referrer">
              <div class="absolute inset-0 bg-emerald-950/40 group-hover:bg-emerald-950/20 transition-colors duration-700"></div>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <span class="text-xs font-semibold tracking-[0.3em] uppercase mb-4 opacity-80">02 // Deporte</span>
                <h2 class="text-6xl lg:text-8xl font-light tracking-tighter uppercase">Pádel</h2>
              </div>
            </button>
          </div>
        } @else {
          <div class="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-black/10 pb-8">
              <div>
                <button (click)="selectSport(null)" class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 hover:text-emerald-950 transition-colors mb-6 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Volver
                </button>
                <h2 class="text-5xl lg:text-7xl font-light tracking-tighter text-emerald-950 uppercase">
                  {{ selectedSport() }}
                </h2>
              </div>
              <div class="mt-8 md:mt-0 text-right">
                <p class="text-3xl font-light text-emerald-950">{{ today | date:'dd' }}</p>
                <p class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">{{ today | date:'MMMM yyyy':'':'es' }}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <!-- Legend -->
              <div class="lg:col-span-3">
                <h4 class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">Disponibilidad</h4>
                <ul class="space-y-4">
                  <li class="flex items-center text-sm font-light text-gray-600">
                    <span class="w-3 h-3 rounded-full border border-emerald-950 mr-4"></span>
                    Libre
                  </li>
                  <li class="flex items-center text-sm font-light text-gray-600">
                    <span class="w-3 h-3 rounded-full bg-gray-200 mr-4"></span>
                    Ocupado
                  </li>
                  <li class="flex items-center text-sm font-light text-gray-600">
                    <span class="w-3 h-3 rounded-full bg-emerald-950 mr-4"></span>
                    Seleccionado
                  </li>
                </ul>
              </div>

              <!-- Slots -->
              <div class="lg:col-span-9">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  @for (slot of timeSlots(); track slot.time) {
                    <button 
                      (click)="selectSlot(slot)"
                      [disabled]="!slot.available"
                      [ngClass]="{
                        'border-emerald-950 text-emerald-950 hover:bg-emerald-950 hover:text-white': slot.available && !slot.selected,
                        'border-transparent bg-gray-50 text-gray-300 cursor-not-allowed': !slot.available,
                        'bg-emerald-950 text-white border-emerald-950': slot.selected
                      }"
                      class="py-6 border rounded-none text-lg font-light transition-all duration-300 focus:outline-none">
                      {{ slot.time }}
                    </button>
                  }
                </div>
                
                <div class="mt-16 text-right">
                  <button 
                    [disabled]="!hasSelectedSlot()"
                    [ngClass]="{
                      'bg-emerald-950 text-white hover:bg-emerald-900': hasSelectedSlot(),
                      'bg-gray-200 text-gray-400 cursor-not-allowed': !hasSelectedSlot()
                    }"
                    class="w-full md:w-auto px-12 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-colors">
                    Confirmar Reserva
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `
})
export class BookComponent {
  auth = inject(AuthService);
  selectedSport = signal<Sport>(null);
  today = new Date();

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

  selectSport(sport: Sport) {
    this.selectedSport.set(sport);
    if (sport) {
      // Reset slots and randomize availability when selecting a sport
      this.timeSlots.update(slots => 
        slots.map(slot => ({ ...slot, available: Math.random() > 0.4, selected: false }))
      );
    }
  }

  selectSlot(selectedSlot: TimeSlot) {
    if (!selectedSlot.available) return;
    
    this.timeSlots.update(slots => 
      slots.map(slot => ({
        ...slot,
        selected: slot.time === selectedSlot.time ? !slot.selected : false
      }))
    );
  }

  hasSelectedSlot(): boolean {
    return this.timeSlots().some(slot => slot.selected);
  }
}
