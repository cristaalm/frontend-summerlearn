<script setup>
import Lucide from '@/components/base/Lucide'
import LoadingIcon from '@/components/base/LoadingIcon'
import formatDate from '@/logic/formatDate'
import Tippy from '@/components/base/Tippy'
import { useRouter } from 'vue-router'
import { inject, onMounted } from 'vue'

const router = useRouter()

const {
  lastProgramsUnasigned,
  loadingLastProgramsUnasigned,
  loadLastProgramsUnasigned,
  errorLastProgramsUnasigned
} = inject('lastProgramsUnasigned')

onMounted(() => {
  if (loadingLastProgramsUnasigned.value) return
  loadLastProgramsUnasigned()
})
</script>

<template>
  <div class="col-span-12 md:col-span-4 box box--stacked h-fit" id="programList">
    <div class="flex flex-col gap-5 p-2 leading-relaxed">
      <div
        class="flex items-center w-full px-3 py-3 font-medium border rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-200 dark:border-slate-800/50 shadow-lg dark:shadow-slate-600/40"
      >
        <Lucide icon="Album" class="w-5 h-5 mr-2 stroke-[1.3] text-green-500" />
        Programas recientes
      </div>
      <div class="grid w-full grid-cols-1 gap-5">
        <!-- En caso de que esté cargando los programas -->
        <div
          v-if="loadingLastProgramsUnasigned"
          class="col-span-1 w-full flex flex-col gap-2 p-3 border-l-4 border-green-400 dark:border-green-600 shadow-md dark:shadow-slate-700/40 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-200 rounded-md overflow-hidden"
        >
          <div class="text-xs text-slate-500 dark:text-slate-200 flex items-center gap-5 truncate">
            <LoadingIcon v-if="loadingLastProgramsUnasigned" icon="tail-spin" class="w-8 h-8" />
            Cargando programas recientes...
          </div>
        </div>

        <!-- En caso de que no haya programas recientes -->
        <div
          v-if="lastProgramsUnasigned.length === 0 && !loadingLastProgramsUnasigned"
          class="col-span-1 w-full flex flex-col gap-2 p-3 border-l-4 border-green-400 dark:border-green-600 shadow-md dark:shadow-slate-700/40 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 rounded-md overflow-hidden"
        >
          <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
            <Lucide icon="Briefcase" class="w-3 h-3" />
            No hay programas recientes
          </div>
        </div>

        <template
          v-if="lastProgramsUnasigned.length > 0 && !loadingLastProgramsUnasigned"
          v-for="(program, index) in lastProgramsUnasigned.slice(0, 5)"
          :key="program.programs_id"
        >
          <div
            class="col-span-1 w-full flex flex-col gap-2 p-3 border-l-4 border-green-400 dark:border-green-600 shadow-md dark:shadow-slate-700/40 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 rounded-md overflow-hidden"
          >
            <!-- Nombre del programa con Tippy tooltip -->
            <div class="text-base font-semibold flex items-center gap-1">
              <Lucide icon="Bookmark" class="w-4 h-4 text-green-500 dark:text-green-400" />
              <Tippy :content="program.programs_name" class="truncate">
                {{ program.programs_name }}
              </Tippy>
            </div>

            <!-- Área del programa con Tippy tooltip -->
            <div
              class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate"
            >
              <Lucide icon="Briefcase" class="w-3 h-3" />
              {{ program.programs_area.name }}
            </div>

            <!-- Descripción del grado con Tippy tooltip -->
            <div
              class="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 truncate"
            >
              <Lucide icon="Award" class="w-3 h-3" />
              {{ program.programs_grade.description }}
            </div>

            <!-- Fechas del programa -->
            <div class="text-xs flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Lucide icon="Calendar" class="w-3 h-3" />
              {{ formatDate(program.programs_start) }} - {{ formatDate(program.programs_end) }} •
              {{ calculateDays(program.programs_start, program.programs_end) }} Días
            </div>

            <!-- Usuario responsable del programa -->
            <div class="text-xs flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Lucide icon="User" class="w-3 h-3" />
              {{ program.programs_user.name }}
            </div>
          </div>
        </template>
      </div>
      <div
        class="text-slate-400/80 dark:text-slate-200 flex justify-center items-center p-5 rounded-[0.6rem]"
        v-if="lastProgramsUnasigned.length > 0 && !loadingLastProgramsUnasigned"
      >
        <div
          class="flex flex-row gap-2 justify-center items-center transform scale-100 hover:scale-110 transition-all cursor-pointer text-green-500"
          @click="router.push({ name: 'programs' })"
        >
          <Lucide icon="ExternalLink" class="w-6 h-6" />
          Ver todos los programas
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Calcular los días entre dos fechas
function calculateDays(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = Math.abs(endDate - startDate)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
</script>
