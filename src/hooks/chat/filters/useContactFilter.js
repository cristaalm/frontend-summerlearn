// hooks/useContactFilter.ts
import { ref, watch, computed } from 'vue'

export function useContactFilter(contactsRef, searchTextRef) {
  const filteredContacts = ref([])

  watch(
    [contactsRef, searchTextRef],
    ([contacts, searchText]) => {
      if (contacts && contacts.length > 0) {
        filteredContacts.value = contacts.filter((contact) => {
          const matchesQuery =
            contact.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.user.rol.toLowerCase().includes(searchText.toLowerCase())

          return matchesQuery
        })
      } else {
        filteredContacts.value = []
      }
    },
    { immediate: true }
  )

  return { filteredContacts }
}
