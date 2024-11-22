<script setup>
import { inject, onMounted, computed } from 'vue'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-vue-next'

const { grades, loadingGrades, errorGrades, loadGrades } = inject('grades')
const { actividades, loadingActivities, errorActivities, loadActivities } = inject('actividades')
const { programs, loadingPrograms, errorPrograms, loadPrograms } = inject('programs')
const { areas, loadingAreas, errorAreas, loadAreas } = inject('areas')
const { childrens, loadingChildrens, errorChildrens, loadChildrens } = inject('childrens')

onMounted(() => {
  loadGrades()
  loadActivities()
  loadPrograms()
  loadAreas()
  loadChildrens()
})

const childrenData = computed(() => {
  return childrens.value.map((child) => {
    const childGrade = grades.value.find((grade) => grade.id === child.grade.id)
    const childAreas = programs.value
      .filter((program) => program.grade.id === child.grade.id)
      .reduce((acc, program) => {
        if (!acc[program.area.name]) {
          acc[program.area.name] = []
        }
        // Filtramos las actividades asociadas al programa usando el campo program_name
        acc[program.area.name].push({
          name: program.name,
          area: program.area.name,
          activities: actividades.value.filter((activity) => activity.program_name === program.name)
        })
        return acc
      }, {})

    return {
      ...child,
      grade: childGrade,
      areas: childAreas
    }
  })
})
</script>

<template>
  <div
    class="bg-white dark:bg-[#28334e] w-full min-h-screen p-8 rounded-xl flex flex-col items-center dark:text-slate-200 box box--stacked"
    id="containerProgramsActivities"
  >
    <h2 class="text-5xl text-black dark:text-slate-200 mb-8">Programas de actividades</h2>

    <div
      v-if="loadingChildrens || loadingGrades || loadingPrograms || loadingActivities"
      class="text-2xl"
    >
      Cargando...
    </div>

    <div
      v-else-if="errorChildrens || errorGrades || errorPrograms || errorActivities"
      class="text-2xl text-red-500"
    >
      Error al cargar los datos
    </div>

    <div v-else class="w-full max-w-4xl space-y-8">
      <div
        v-for="child in childrenData"
        :key="child.id"
        class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 class="text-3xl font-bold mb-4">{{ child.name }}</h3>
        <p class="text-lg mb-4">Grado: {{ child.grade.description }}</p>

        <template v-for="(programs, areaName) in child.areas" :key="areaName">
          <template
            v-if="
              !programs
                .filter((program) => program.area === areaName)
                .every((program) => program.activities.length === 0)
            "
          >
            <div class="mb-6">
              <details class="bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <summary class="flex justify-between items-center p-4 cursor-pointer">
                  <span class="text-xl font-semibold">{{ areaName }}</span>
                  <ChevronDownIcon class="h-6 w-6" />
                </summary>
                <div class="p-4 space-y-4">
                  <template v-for="program in programs" :key="program.name">
                    <template v-if="program.activities.length">
                      <div class="bg-gray-50 dark:bg-gray-600 p-4 rounded-md">
                        <details>
                          <summary class="flex justify-between items-center cursor-pointer">
                            <span class="text-lg font-medium">{{ program.name }}</span>
                            <ChevronRightIcon class="h-5 w-5" />
                          </summary>
                          <ul class="mt-2 ml-4 space-y-1">
                            <li
                              v-for="activity in program.activities"
                              :key="activity.id"
                              class="text-sm"
                            >
                              <div v-if="program.activities.length == 0">
                                No hay actividades disponibles
                              </div>
                              <div v-else>- {{ activity.name }}</div>
                            </li>
                          </ul>
                        </details>
                      </div>
                    </template>
                  </template>
                </div>
              </details>
            </div>
          </template>
        </template>
      </div>

      <!-- ? En caso de que no haya datos ? -->
      <div
        v-if="!childrenData.length"
        class="w-full h-[550px] flex flex-col justify-center items-center"
      >
        <div class="text-lg text-gray-700 dark:text-slate-400 text-center">
          No hay hijos registrados en el sistema
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
details > summary {
  list-style: none;
}

details > summary::-webkit-details-marker {
  display: none;
}
</style>
