import { ref } from 'vue'

export function useDialogGradesChild() {
  // Estado que controla la visibilidad del modal
  const ModalGradesChild = ref(false)

  // Información del niño a mostrar en el modal, inicialmente null
  const childInfoProvideGrades = ref(null)

  // Función para actualizar el estado del modal y la información del niño
  const setModalGradesChild = ({ open, childInfo = null }) => {
    ModalGradesChild.value = open // Controla si el modal está abierto o cerrado
    childInfoProvideGrades.value = childInfo // Asigna la información del niño
  }

  // Retorna las variables y funciones para su uso en otros componentes
  return { ModalGradesChild, setModalGradesChild, childInfoProvideGrades }
}
