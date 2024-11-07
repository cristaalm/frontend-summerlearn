import { ref } from 'vue'

export function useScroll() {
  const scrollableRef = ref<HTMLDivElement>()

  function scrollToBottom() {
    if (scrollableRef.value) {
      scrollableRef.value.scrollTo({
        top: scrollableRef.value.scrollHeight, // Hasta abajo
        behavior: 'smooth' // Desplazamiento suave
      })
    }
  }

  return {
    scrollableRef,
    scrollToBottom
  }
}
