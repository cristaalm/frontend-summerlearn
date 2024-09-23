import { ref, computed } from 'vue'

export function useFilter(items) {
  const searchQuery = ref('')

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      return matchesQuery
    })
  })

  return { searchQuery, filteredItems }
}
