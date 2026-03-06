import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-facility-padel',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white pt-24">
      <!-- Hero -->
      <div class="w-full h-[60vh] relative">
        <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1920&auto=format&fit=crop" alt="Pádel Premium" class="w-full h-full object-cover" referrerpolicy="no-referrer">
        <div class="absolute inset-0 bg-emerald-950/40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <span class="text-xs font-semibold tracking-[0.3em] uppercase mb-4">Instalaciones</span>
          <h1 class="text-6xl lg:text-8xl font-light tracking-tighter uppercase">Pádel</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-screen-xl mx-auto px-6 lg:px-12 py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 class="text-3xl font-light tracking-tight text-emerald-950 mb-6">El estándar profesional, a tu alcance.</h2>
            <p class="text-gray-500 font-light leading-relaxed mb-6">
              Nuestras instalaciones cuentan con 8 pistas panorámicas de cristal de última generación. Diseñadas para ofrecer la máxima visibilidad y un rebote perfecto, cumpliendo con las normativas del World Padel Tour.
            </p>
            <ul class="space-y-4 border-t border-black/5 pt-6">
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Césped Mondo Supercourt XN</li>
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Iluminación LED anti-deslumbramiento (1000 lux)</li>
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Techos de 12 metros de altura libre</li>
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Climatización inteligente</li>
            </ul>
            <div class="mt-10">
              <a routerLink="/reservar" class="inline-block bg-emerald-950 text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-emerald-900 transition-colors">Reservar Pista</a>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34d8?q=80&w=800&auto=format&fit=crop" alt="Detalle Pádel" class="w-full aspect-square object-cover" referrerpolicy="no-referrer">
            <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=800&auto=format&fit=crop" alt="Vestuarios" class="w-full aspect-square object-cover mt-8" referrerpolicy="no-referrer">
          </div>
        </div>
      </div>
    </div>
  `
})
export class FacilityPadelComponent {}
