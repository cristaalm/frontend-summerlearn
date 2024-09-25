import { Baseurl } from '@/../global'

export function useStatusProgram({ showToast }) {
  const updateStatus = async ({ program }) => {
    //? ############# Copy Object #############

    const programRef = { ...program }
    program.status = 0 // con esto estoy indica que esta cargando

    //? ############# Change Status #############

    programRef.status = programRef.status == 1 ? 2 : 1

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'programs/' + programRef.id + '/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          programs_name: programRef.name,
          programs_start: programRef.start,
          programs_end: programRef.end,
          programs_user: programRef.user.id,
          programs_status: programRef.status,
          programs_area: programRef.area.id
        })
      })
      if (!response.ok) {
        programRef.status = programRef.status === 2 ? 1 : 2
        showToast('Error al actualizar el estado del programa.')
      }
      showToast('Estado del programa actualizado exitosamente.')
    } catch (e) {
      console.error('Error:', e)
      programRef.status = programRef.status === 2 ? 1 : 2
      showToast('Error al actualizar el estado del programa.')
    }

    return programRef
  }
  return { updateStatus }
}
