import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white pt-24">
      <!-- Hero -->
      <div class="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-12 pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-[12vw] lg:text-[8rem] leading-[0.85] font-light tracking-tighter text-emerald-950 uppercase">
              El deporte,<br>
              <span class="font-bold">Elevado.</span>
            </h1>
          </div>
          <div class="lg:col-span-4 pb-4">
            <p class="text-lg text-gray-500 font-light leading-relaxed mb-8">
              Instalaciones de vanguardia. Diseño minimalista. Un espacio creado exclusivamente para quienes buscan la excelencia en cada entrenamiento.
            </p>
            <a routerLink="/reservar" class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950 text-white hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Full bleed image -->
      <div class="w-full h-[60vh] lg:h-[80vh] relative">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Club" class="w-full h-full object-cover grayscale opacity-90" referrerpolicy="no-referrer">
        <div class="absolute inset-0 bg-emerald-950/10 mix-blend-multiply"></div>
      </div>

      <!-- Facilities -->
      <div class="max-w-screen-2xl mx-auto px-6 lg:px-12 py-32">
        <div class="flex justify-between items-end mb-16 border-b border-black/10 pb-8">
          <h2 class="text-4xl lg:text-5xl font-light tracking-tighter text-emerald-950">ESPACIOS</h2>
          <span class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">01 // Instalaciones</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          <a routerLink="/instalaciones/padel" class="group cursor-pointer block">
            <div class="overflow-hidden aspect-[3/4] mb-6">
              <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop" alt="Pádel" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer">
            </div>
            <h3 class="text-2xl font-medium tracking-tight text-emerald-950 mb-2">Pádel</h3>
            <p class="text-sm text-gray-500 font-light">Pistas panorámicas de cristal.</p>
          </a>
          <a routerLink="/instalaciones/futbol" class="group cursor-pointer block md:mt-16">
            <div class="overflow-hidden aspect-[3/4] mb-6">
              <img src="https://images.unsplash.com/photo-1518605368461-1ee7c532066d?q=80&w=800&auto=format&fit=crop" alt="Fútbol" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale" referrerpolicy="no-referrer">
            </div>
            <h3 class="text-2xl font-medium tracking-tight text-emerald-950 mb-2">Fútbol</h3>
            <p class="text-sm text-gray-500 font-light">Césped artificial de última generación.</p>
          </a>
          <a routerLink="/instalaciones/gimnasio" class="group cursor-pointer block md:mt-32">
            <div class="overflow-hidden aspect-[3/4] mb-6">
              <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" alt="Gimnasio" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer">
            </div>
            <h3 class="text-2xl font-medium tracking-tight text-emerald-950 mb-2">Gimnasio</h3>
            <p class="text-sm text-gray-500 font-light">Equipamiento premium y peso libre.</p>
          </a>
        </div>
      </div>

      <!-- Gallery -->
      <div class="max-w-screen-2xl mx-auto px-6 lg:px-12 pb-32">
        <div class="flex justify-between items-end mb-16 border-b border-black/10 pb-8">
          <h2 class="text-4xl lg:text-5xl font-light tracking-tighter text-emerald-950">EL COMPLEJO</h2>
          <span class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">02 // Galería</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          <!-- Large image spanning 2 columns -->
          <div class="lg:col-span-2 overflow-hidden aspect-video relative group">
            <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop" alt="Pista Principal" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer">
            <div class="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p class="text-sm font-semibold tracking-widest uppercase">Pista Principal</p>
            </div>
          </div>
          
          <!-- Standard image -->
          <div class="overflow-hidden aspect-square md:aspect-auto md:h-full relative group">
            <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=800&auto=format&fit=crop" alt="Vestuarios Premium" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer">
            <div class="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p class="text-sm font-semibold tracking-widest uppercase">Vestuarios Premium</p>
            </div>
          </div>

          <!-- Standard image -->
          <div class="overflow-hidden aspect-square relative group">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop" alt="Cafetería y Zona Social" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer">
            <div class="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p class="text-sm font-semibold tracking-widest uppercase">Zona Social</p>
            </div>
          </div>

          <!-- Large image spanning 2 columns -->
          <div class="lg:col-span-2 overflow-hidden aspect-video relative group">
            <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2070&auto=format&fit=crop" alt="Zona de Musculación" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0" referrerpolicy="no-referrer">
            <div class="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p class="text-sm font-semibold tracking-widest uppercase">Zona de Musculación</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}
