import { ref, computed } from 'vue'

export function useFilterObjective(items) {
  const searchQueryObjective = ref('')
  const selectedStatusObjective = ref(null)

  const filteredItemsObjective = computed(() => {
    if (selectedStatusObjective.value !== null) {
      selectedStatusObjective.value = selectedStatusObjective.value == '1' ? true : false
    }
    return items.value.filter((item) => {
      const matchesQuery = item.name
        .toLowerCase()
        .includes(searchQueryObjective.value.toLowerCase())
      const matchesStatus =
        selectedStatusObjective.value === null || item.status === !!selectedStatusObjective.value

      return matchesQuery && matchesStatus
    })
  })

  const activeFiltersObjective = computed(() => {
    let count = 0
    if (searchQueryObjective.value) count++
    if (selectedStatusObjective.value !== null) count++
    return count
  })

  return {
    searchQueryObjective,
    selectedStatusObjective,
    filteredItemsObjective,
    activeFiltersObjective
  }
}
