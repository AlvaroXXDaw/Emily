import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="min-h-screen bg-[#f8f9fa] pt-24">
      <div class="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <div class="mb-16 border-b border-black/10 pb-8">
          <h2 class="text-5xl lg:text-7xl font-light tracking-tighter text-emerald-950 uppercase">
            Mi Área
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <!-- Suscripciones -->
          <div class="lg:col-span-4">
            <div class="bg-white p-8 border border-black/5">
              <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">Mi Suscripción</h3>
              
              <div class="mb-8">
                <span class="block text-3xl font-light tracking-tight text-emerald-950 mb-2">Premium Mensual</span>
                <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wider uppercase rounded-full">Activa</span>
              </div>
              
              <div class="space-y-4 pt-8 border-t border-black/5">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-light text-gray-500">Próximo cobro</span>
                  <span class="text-sm font-medium text-emerald-950">15 Abr 2026</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-light text-gray-500">Importe</span>
                  <span class="text-sm font-medium text-emerald-950">59,99 €</span>
                </div>
              </div>
              
              <button class="mt-8 w-full border border-emerald-950 text-emerald-950 px-6 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-emerald-950 hover:text-white transition-colors">
                Gestionar Plan
              </button>
            </div>
          </div>

          <!-- Historial -->
          <div class="lg:col-span-8">
            <div class="bg-white p-8 lg:p-12 border border-black/5">
              <div class="flex justify-between items-end mb-12">
                <h3 class="text-2xl font-light tracking-tight text-emerald-950">Historial de Reservas</h3>
              </div>

              <div class="space-y-0">
                <!-- Reserva 1 -->
                <div class="flex flex-col md:flex-row md:items-center py-6 border-b border-black/5 gap-4">
                  <div class="w-16 text-xs font-semibold tracking-[0.2em] text-gray-400">HOY</div>
                  <div class="flex-1">
                    <h4 class="text-lg font-medium text-emerald-950">Pádel - Pista 3 (Panorámica)</h4>
                    <p class="text-sm font-light text-gray-500">18:00 - 19:30</p>
                  </div>
                  <div class="text-left md:text-right">
                    <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold tracking-wider uppercase rounded-full">Pendiente</span>
                  </div>
                </div>

                <!-- Reserva 2 -->
                <div class="flex flex-col md:flex-row md:items-center py-6 border-b border-black/5 gap-4">
                  <div class="w-16 text-xs font-semibold tracking-[0.2em] text-gray-400">10 MAR</div>
                  <div class="flex-1">
                    <h4 class="text-lg font-medium text-emerald-950">Fútbol - Campo 1 (Indoor)</h4>
                    <p class="text-sm font-light text-gray-500">20:00 - 21:00</p>
                  </div>
                  <div class="text-left md:text-right">
                    <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wider uppercase rounded-full">Completada</span>
                  </div>
                </div>

                <!-- Reserva 3 -->
                <div class="flex flex-col md:flex-row md:items-center py-6 border-b border-black/5 gap-4">
                  <div class="w-16 text-xs font-semibold tracking-[0.2em] text-gray-400">05 MAR</div>
                  <div class="flex-1">
                    <h4 class="text-lg font-medium text-emerald-950">Pádel - Pista 1 (Panorámica)</h4>
                    <p class="text-sm font-light text-gray-500">19:30 - 21:00</p>
                  </div>
                  <div class="text-left md:text-right">
                    <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wider uppercase rounded-full">Completada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {}
