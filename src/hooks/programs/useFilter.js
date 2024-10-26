import { ref, computed } from 'vue'

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return '' // Verifica si dateString es undefined, null o vacío.
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function useFilter(items) {
  const searchQuery = ref('')
  const selectedStatus = ref(null)

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      const duration = `${formatDateToDDMMYYYY(item.start)} - ${formatDateToDDMMYYYY(item.end)}`
      const status = item.status === 1 ? 'Activo' : 'Inactivo'
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        duration.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.grade.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        status.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.area.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesStatus = selectedStatus.value === null || item.status === selectedStatus.value

      return matchesQuery && matchesStatus
    })
  })

  const activeFilters = computed(() => {
    let count = 0
    if (searchQuery.value) count++
    if (selectedStatus.value !== null) count++
    return count
  })

  return { searchQuery, selectedStatus, filteredItems, activeFilters }
}
