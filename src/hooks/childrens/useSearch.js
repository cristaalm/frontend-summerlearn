import { ref, computed } from 'vue'
import { calculateAge } from '@/logic/'

export function useSearch(childrens) {
  const searchQuery = ref('')

  // Computed que filtra los usuarios en base al nombre/email, estado y rol
  const filteredChildrens = computed(() => {
    return childrens.value.filter((children) => {
      const matchesQuery =
        children.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        children.curp.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        children.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        calculateAge(children.birthdate) == searchQuery.value

      return matchesQuery
    })
  })

  return { searchQuery, filteredChildrens }
}
