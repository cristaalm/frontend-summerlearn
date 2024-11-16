import { ref, computed } from 'vue'

export function useFilter(items) {
  const searchQuery = ref('')
  const selectedStatus = ref(null)

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      const matchesQuery =
        item.activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (item.value?.toString() + '/10')
          .replace(/\s/g, '')
          .includes(searchQuery.value.replace(/\s/g, '')) ||
        (item.value == null && 'pendiente'.includes(searchQuery.value.toLowerCase())) ||
        item.child.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      return matchesQuery
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
