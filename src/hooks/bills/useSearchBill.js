import { ref, computed } from 'vue'

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return '' // Verifica si dateString es undefined, null o vacío.
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function useBillSearch(bills) {
  const searchQuery = ref('') // Término de búsqueda para el concepto
  const selectedStatus = ref(null) // Estado seleccionado (ej. pagada/no pagada)
  const selectedCategory = ref(null) // Categoría seleccionada (ej. servicios, productos)

  // Computed que filtra las facturas en base al concepto, estado y categoría
  const filteredBills = computed(() => {
    return bills.value.filter((bill) => {
      const date = formatDateToDDMMYYYY(bill.date)
      const amount = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
        bill.amount
      )

      const matchesQuery =
        bill.concept.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        date.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        amount.toString().includes(searchQuery.value) ||
        bill.donation.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesStatus =
        selectedStatus.value === null || bill.status === parseInt(selectedStatus.value)

      const matchesCategory =
        selectedCategory.value === null || bill.category === parseInt(selectedCategory.value)

      return matchesQuery && matchesStatus && matchesCategory
    })
  })

  // Contador de filtros aplicados
  const filtersCount = computed(() => {
    let count = 0
    if (selectedStatus.value !== null) count++
    if (selectedCategory.value !== null) count++
    return count
  })

  return { searchQuery, selectedStatus, selectedCategory, filteredBills, filtersCount }
}
