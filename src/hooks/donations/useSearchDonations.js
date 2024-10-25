import { ref, computed } from 'vue'

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return '' // Verifica si dateString es undefined, null o vacío.
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function useDonationSearch(donations) {
  const searchQuery = ref('') // Término de búsqueda para el concepto

  // Computed que filtra las donaciones en base al concepto, estado y categoría
  const filteredItems = computed(() => {
    return donations.value.filter((donation) => {
      const date = formatDateToDDMMYYYY(donation.date)
      const quenty = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
        donation.quanty
      )
      const matchesQuery =
        donation.concept.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        quenty.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        donation.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        date.toLowerCase().includes(searchQuery.value.toLowerCase())

      return matchesQuery
    })
  })

  return { searchQuery, filteredItems }
}
