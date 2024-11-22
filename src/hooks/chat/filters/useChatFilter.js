import { ref, watch, computed } from 'vue'

export function useChatFilter(chatsRef, searchTextRef) {
  const filteredChats = ref([])

  watch(
    [chatsRef, searchTextRef],
    ([chats, searchText]) => {
      if (chats && chats.length > 0) {
        filteredChats.value = chats.filter(
          (chat) =>
            chat.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            (chat.lastMessage &&
              chat.lastMessage.content.toLowerCase().includes(searchText.toLowerCase()))
        )
      } else {
        filteredChats.value = []
      }
    },
    { immediate: true }
  )

  // función para actualizar el filtro de búsqueda manualmente

  const updateFilter = () => {
    const chats = chatsRef.value
    const searchText = searchTextRef.value
    if (chats && chats.length > 0) {
      filteredChats.value = chats.filter(
        (chat) =>
          chat.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (chat.lastMessage &&
            chat.lastMessage.content.toLowerCase().includes(searchText.toLowerCase()))
      )
    }
  }

  return { filteredChats, updateFilter }
}
