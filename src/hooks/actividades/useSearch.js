import { ref, computed } from 'vue'

export function useSearch(actividades) {
  const searchQuery = ref('')
  const selectedArea = ref(null) // área seleccionada

  const filteredActividades = computed(() => {
    return actividades.value.filter((actividad) => {
      const matchesQuery = actividad.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesArea =
        selectedArea.value === null ||
        actividad.area_name.toLowerCase() === selectedArea.value.toLowerCase()

      return matchesQuery && matchesArea
    })
  })

  // Contador de filtros aplicados
  const filtersCount = computed(() => {
    let count = 0
    if (selectedArea.value !== null) count++
    return count
  })

  return { searchQuery, selectedArea, filteredActividades, filtersCount }
}
