// src/hooks/usePagination.ts
import { ref, computed, watch } from 'vue'

export function usePagination(filteredUsers) {
  const pageSize = ref(10)
  const currentPage = ref(1)

  // Calcular el número total de páginas basadas en los usuarios filtrados
  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize.value))

  // Cambiar la página
  const changePage = (page) => {
    if (page < 1) page = 1
    if (page > totalPages.value) page = totalPages.value
    currentPage.value = page
  }

  // Obtener los usuarios paginados
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredUsers.value.slice(start, end)
  })

  // Asegurarse de que la página actual no exceda el número total de páginas
  watch([filteredUsers, pageSize], () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  })

  const changePageSize = (size) => {
    if (!isNaN(size) && size > 0) {
      pageSize.value = size
      currentPage.value = 1 // Reiniciar la página actual
    }
  }

  // Watcher para detectar cambios en filteredUsers o totalPages
  watch([filteredUsers, totalPages], () => {
    if (filteredUsers.value.length > 0) {
      changePage(1) // Selecciona la primera página si hay registros
    }
  })

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedUsers,
    changePage,
    changePageSize
  }
}
