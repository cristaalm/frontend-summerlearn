<script setup>
import { BarGraphModule, PieChartModule, HistoryModule, WelcomeModule } from './modules'
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-y-10 gap-x-6">
      <div class="col-span-12">
        <div class="flex flex-col gap-8">
          <!-- Contenedor de cards -->
          <div class="grid grid-cols-12 gap-5 mt-3">
            <WelcomeModule />
            <BarGraphModule />
            <PieChartModule />
            <HistoryModule />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
