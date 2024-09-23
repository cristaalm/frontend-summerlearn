<template>
  <div
    v-if="isVisible"
    :style="{ top: `${topOffset}px`, zIndex: 1000 }"
    class="fixed right-20 p-4 bg-white text-gray-800 rounded shadow-lg transition-opacity duration-300"
  >
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000
  },
  index: Number
})

const isVisible = ref(false)

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      isVisible.value = true
      setTimeout(() => {
        isVisible.value = false
      }, props.duration)
    }
  },
  { immediate: true }
)

// Aumenta el espacio entre mensajes para evitar superposición
const topOffset = computed(() => props.index * 80 + 110) // Ajusta el multiplicador para el espacio deseado
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>
