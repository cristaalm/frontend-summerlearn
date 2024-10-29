import { ref, computed } from 'vue'
import { formatPhone } from '@/logic/formatNumber'
import { calculateAge } from '@/logic/'

export function useSearch(users) {
  const searchQuery = ref('')
  const selectedStatus = ref(null) // Estado seleccionado (activo/inactivo)
  const selectedRole = ref(null) // Rol seleccionado

  // Computed que filtra los usuarios en base al nombre/email, estado y rol
  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      const birthdate = calculateAge(user.birthdate)
      const phone = formatPhone(user.phone)
      const rol =
        user.rol === 1
          ? 'Administrador'
          : user.rol === 2
            ? 'Coordinador'
            : user.rol === 3
              ? 'Donador'
              : user.rol == 4
                ? 'Voluntario'
                : user.rol == 5
                  ? 'Beneficiario'
                  : ''
      const status = user.status === 1 ? 'Activo' : 'Inactivo'
      const matchesQuery =
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        birthdate.toString().includes(searchQuery.value.toLowerCase()) ||
        phone.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        rol.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        status.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesStatus =
        selectedStatus.value === null || user.status === parseInt(selectedStatus.value)
      const matchesRole = selectedRole.value === null || user.rol === selectedRole.value
      return matchesQuery && matchesStatus && matchesRole
    })
  })

  // contador de filtros aplicados

  const filtersCount = computed(() => {
    let count = 0
    if (selectedStatus.value !== null) count++
    if (selectedRole.value !== null) count++
    return count
  })

  return { searchQuery, selectedStatus, selectedRole, filteredUsers, filtersCount }
}
