import { ref, computed } from 'vue'

export function useSearch(users) {
  const searchQuery = ref('')
  const selectedStatus = ref(null) // Estado seleccionado (activo/inactivo)
  const selectedRole = ref(null) // Rol seleccionado

  // Computed que filtra los usuarios en base al nombre/email, estado y rol
  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesStatus =
        selectedStatus.value === null || user.status === parseInt(selectedStatus.value)
      const matchesRole = selectedRole.value === null || user.rol === parseInt(selectedRole.value)

      return matchesQuery && matchesStatus && matchesRole
    })
  })

  // contador de fuiltros aplicados

  const filtersCount = computed(() => {
    let count = 0
    if (selectedStatus.value !== null) count++
    if (selectedRole.value !== null) count++
    return count
  })

  return { searchQuery, selectedStatus, selectedRole, filteredUsers, filtersCount }
}
