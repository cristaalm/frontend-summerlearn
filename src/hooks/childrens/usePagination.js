// src/hooks/usePagination.ts
import { ref, computed, watch } from 'vue'

export function usePagination(filteredChildrens) {
  const pageSize = ref(10)
  const currentPage = ref(1)

  // Calcular el número total de páginas basadas en los usuarios filtrados
  const totalPages = computed(() => Math.ceil(filteredChildrens.value.length / pageSize.value))

  // Cambiar la página
  const changePage = (page) => {
    if (page < 1) page = 1
    if (page > totalPages.value) page = totalPages.value
    currentPage.value = page
  }

  // Obtener los usuarios paginados
  const paginatedChildrens = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredChildrens.value.slice(start, end)
  })

  // Asegurarse de que la página actual no exceda el número total de páginas
  watch([filteredChildrens, pageSize], () => {
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

  // Watcher para detectar cambios en filteredChildrens o totalPages
  watch([filteredChildrens, totalPages], () => {
    if (filteredChildrens.value.length > 0) {
      changePage(1) // Selecciona la primera página si hay registros
    }
  })

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedChildrens,
    changePage,
    changePageSize
  }
}
