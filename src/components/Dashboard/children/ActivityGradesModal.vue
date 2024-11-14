<!-- src/components/Dashboard/children/ActivityGradesModal.vue -->
<template>
  <div v-if="ModalActivityGrades" class="modal-backdrop">
    <div class="modal-content">
      <h3 class="modal-title">Actividades y Calificaciones</h3>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Actividad</th>
            <th class="px-4 py-2">Calificación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td class="border px-4 py-2">{{ activity.name }}</td>
            <td class="border px-4 py-2">{{ activity.grade }}</td>
          </tr>
        </tbody>
      </table>
      <Button class="mt-3" @click="closeModal" variant="primary">Cerrar</Button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Button from '@/components/base/Button'

const props = defineProps({
  ModalActivityGrades: Boolean,
  activities: Array,
  closeModal: Function
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Asegúrate de que el z-index sea alto */
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  z-index: 1010; /* Asegúrate de que el contenido también tenga un z-index alto */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
