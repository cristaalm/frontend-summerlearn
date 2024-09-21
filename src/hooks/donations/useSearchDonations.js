import { ref, computed } from 'vue';

export function useDonationSearch(donations) {
  const searchQuery = ref('');  // Término de búsqueda para el concepto

  // Computed que filtra las donaciones en base al concepto, estado y categoría
  const filteredItems = computed(() => {
    return donations.value.filter((donation) => {
      const matchesQuery = donation.concept.toLowerCase().includes(searchQuery.value.toLowerCase());
      return matchesQuery;
    });
  });


  return { searchQuery, filteredItems};
}
