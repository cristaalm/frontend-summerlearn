import { ref, computed } from 'vue'

export function useFilter(items) {
  const searchQuery = ref('')
  const selectedStatus = ref(null)

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      const matchesQuery = item.activity.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      // const matchesStatus = selectedStatus.value === null || item.status === selectedStatus.value

      return matchesQuery // && matchesStatus
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
