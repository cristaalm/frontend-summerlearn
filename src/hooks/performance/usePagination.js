import { ref, computed, watch } from 'vue'

export function usePagination(items, initialPageSize = 10) {
  const pageSize = ref(initialPageSize)
  const currentPage = ref(1)

  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
  const endIndex = computed(() => startIndex.value + pageSize.value)

  const paginatedItems = computed(() => items.value.slice(startIndex.value, endIndex.value))

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize.value))

  const changePage = (page) => {
    if (page < 1) page = 1
    if (page > totalPages.value) page = totalPages.value
    currentPage.value = page
  }

  const changePageSize = (size) => {
    if (size > 0) {
      pageSize.value = size
      currentPage.value = 1
    }
  }

  return {
    pageSize,
    currentPage,
    startIndex,
    endIndex,
    paginatedItems,
    totalPages,
    changePage,
    changePageSize
  }
}
