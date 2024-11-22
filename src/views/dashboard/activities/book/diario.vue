<script setup>
import { ref, watch } from 'vue'
import Lucide from '@/components/base/Lucide'
import { Dialog } from '@/components/base/Headless'

const props = defineProps({
  ModalEditUser: Boolean,
  setModalEditUser: Function,
  infoUser: Object
})

const isVisible = ref(false)

watch(
  () => props.ModalEditUser,
  (newVal) => {
    if (newVal) {
      // Small delay to ensure DOM updates before animation
      setTimeout(() => {
        isVisible.value = true
      }, 50)
    } else {
      isVisible.value = false
    }
  }
)
</script>

<template>
  <Transition
    enter="transition-opacity duration-300"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-300"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      v-if="ModalEditUser"
      size="lg"
      :open="ModalEditUser"
      @close="() => setModalEditUser({ open: false })"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>

      <Transition
        enter="transition-all duration-300"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition-all duration-300"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <Dialog.Panel
          :class="[
            'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl',
            'transform transition-all',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          ]"
        >
          <div class="text-center flex flex-col">
            <div
              class="flex flex-row px-10 py-5 justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b"
            >
              <h2 class="text-2xl font-bold text-black dark:text-slate-200">Editar Usuario</h2>
              <Lucide
                icon="XCircle"
                class="w-10 h-full text-danger cursor-pointer dark:text-red-500"
                @click="() => setModalEditUser({ open: false })"
              />
            </div>

            <div class="flex flex-col">
              <div class="flex flex-row px-10 pt-5 gap-5 justify-center items-center w-full">
                <h2>Contenido del Modal</h2>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Transition>
    </Dialog>
  </Transition>
</template>
