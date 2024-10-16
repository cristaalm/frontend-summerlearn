import { ref, computed } from 'vue'

export function useSearch(childrens) {
  const searchQuery = ref('')

  // Computed que filtra los usuarios en base al nombre/email, estado y rol
  const filteredChildrens = computed(() => {
    return childrens.value.filter((children) => {
      const matchesQuery =
        children.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        children.email.toLowerCase().includes(searchQuery.value.toLowerCase())

        return matchesQuery
    })
  })

  return { searchQuery, filteredChildrens}
}
