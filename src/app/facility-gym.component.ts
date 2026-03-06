import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-facility-gym',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white pt-24">
      <!-- Hero -->
      <div class="w-full h-[60vh] relative">
        <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1920&auto=format&fit=crop" alt="Gimnasio Premium" class="w-full h-full object-cover" referrerpolicy="no-referrer">
        <div class="absolute inset-0 bg-emerald-950/40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <span class="text-xs font-semibold tracking-[0.3em] uppercase mb-4">Instalaciones</span>
          <h1 class="text-6xl lg:text-8xl font-light tracking-tighter uppercase">Gimnasio</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-screen-xl mx-auto px-6 lg:px-12 py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 class="text-3xl font-light tracking-tight text-emerald-950 mb-6">Máximo rendimiento. Cero distracciones.</h2>
            <p class="text-gray-500 font-light leading-relaxed mb-6">
              Un espacio de 1.500m² dedicado al culto del cuerpo y la mente. Equipado íntegramente con maquinaria de alta gama, zonas de peso libre expansivas y un ambiente acústico y lumínico diseñado para el enfoque total.
            </p>
            <ul class="space-y-4 border-t border-black/5 pt-6">
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Maquinaria conectada Technogym Artis</li>
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Zona de peso libre con equipamiento Eleiko</li>
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Área de recuperación con crioterapia y sauna</li>
              <li class="flex items-center text-sm text-emerald-950"><span class="w-1.5 h-1.5 bg-emerald-950 rounded-full mr-3"></span> Iluminación circadiana para optimizar la energía</li>
            </ul>
            <div class="mt-10">
              <a routerLink="/gimnasio" class="inline-block bg-emerald-950 text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-emerald-900 transition-colors">Ver mi rutina</a>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="Detalle Gimnasio" class="w-full aspect-square object-cover" referrerpolicy="no-referrer">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" alt="Zona Cardio" class="w-full aspect-square object-cover mt-8" referrerpolicy="no-referrer">
          </div>
        </div>
      </div>
    </div>
  `
})
export class FacilityGymComponent {}
