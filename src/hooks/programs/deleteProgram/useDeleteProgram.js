import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useDeleteProgram() {
  const showToast = inject('showToast')
  const loadingDeleteProgram = ref(false)

  const deleteProgram = async ({ program, programs, setModalDeleteProgram }) => {
    loadingDeleteProgram.value = true
    try {
      const response = await fetch(`${Baseurl}programs/${program.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.status === 204 || response.status === 200) {
        // Asegúrate de que programs.value está definido
        if (programs && programs.value) {
          const programIndex = programs.value.findIndex((a) => a.id === program.id)
          if (programIndex !== -1) {
            programs.value.splice(programIndex, 1)
          }
        }
        setTimeout(() => {
          showToast({ message: 'Programa eliminado exitosamente.', type: 'success' })
        }, 1000)
        setModalDeleteProgram({ open: false })
      } else {
        setTimeout(() => {
          showToast({
            message: 'Hay actividades relacionadas al programa, no se puede eliminar el programa.',
            type: 'warning'
          })
        }, 1000)
        setModalDeleteProgram({ open: false })
      }
    } catch (error) {
      console.error('Error deleting program:', error)
      showToast({ message: 'Error al eliminar el programa', type: 'error' })
    } finally {
      loadingDeleteProgram.value = false
    }
  }

  return { deleteProgram, loadingDeleteProgram }
}
