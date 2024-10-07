import { ref, computed } from 'vue'

export function usePaginationObjective(items, initialPageSize = 10) {
  const pageSizeObjective = ref(initialPageSize)
  const currentPageObjective = ref(1)

  const startIndexObjective = computed(() => (currentPageObjective.value - 1) * pageSizeObjective.value)
  const endIndexObjective = computed(() => startIndexObjective.value + pageSizeObjective.value)

  const paginatedItemsObjective = computed(() => items.value.slice(startIndexObjective.value, endIndexObjective.value))

  const totalPagesObjective = computed(() => Math.ceil(items.value.length / pageSizeObjective.value))

  const changePageObjective = (page) => {
    if (page < 1) page = 1
    if (page > totalPagesObjective.value) page = totalPagesObjective.value
    currentPageObjective.value = page
  }

  const changePageSizeObjective = (size) => {
    if (size > 0) {
      pageSizeObjective.value = size
      currentPageObjective.value = 1
    }
  }

  return {
    pageSizeObjective,
    currentPageObjective,
    startIndexObjective,
    endIndexObjective,
    paginatedItemsObjective,
    totalPagesObjective,
    changePageObjective,
    changePageSizeObjective
  }
}
