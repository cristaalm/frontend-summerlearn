import { Baseurl } from '@/utils/global'
import { inject } from 'vue'

export function useStatusProgram() {
  const showToast = inject('showToast')
  const updateStatus = async ({ program }) => {
    //? ############# Copy Object #############

    const programRef = { ...program }
    program.status = 0 // con esto estoy indica que esta cargando

    //? ############# Change Status #############

    programRef.status = programRef.status == 1 ? 2 : 1

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'programs/' + programRef.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          programs_status: programRef.status
        })
      })
      if (!response.ok) {
        programRef.status = programRef.status === 2 ? 1 : 2
        showToast({ message: 'Error al actualizar el estado del programa.', type: 'error' })
      } else {
        showToast({ message: 'Estado del programa actualizado exitosamente.', type: 'success' })
      }
    } catch (e) {
      console.error('Error:', e)
      programRef.status = programRef.status === 2 ? 1 : 2
      showToast({ message: 'Error al actualizar el estado del programa.', type: 'error' })
    }

    return programRef
  }
  return { updateStatus }
}
