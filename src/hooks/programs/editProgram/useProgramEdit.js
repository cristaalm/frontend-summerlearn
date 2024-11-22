import { inject, ref } from 'vue'
import { Baseurl } from '@/utils/global'

export function useProgramEdit() {
  const showToast = inject('showToast')
  const loadingEditProgram = ref(false)
  const successEditProgram = ref(false)
  const errorEditProgram = ref(false)
  const updateProgram = async ({ program, newProgram, setModalEditProgram }) => {
    loadingEditProgram.value = true

    //? ############# Format date #############

    // * Separamos las fechas
    const date = newProgram.value.duration.split('-')
    let [date1, date2] = date

    // * Remplazamos "/" por "-"
    date1 = date1.replace(/\//g, '-')
    date2 = date2.replace(/\//g, '-')

    // * Formateamos las fechas a YYYY-MM-DD
    date1 = date1.split('-').reverse().join('-').replace(/\s+/g, '')
    date2 = date2.split('-').reverse().join('-').replace(/\s+/g, '')

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'programs/' + program.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          programs_name: newProgram.value.name,
          programs_user: newProgram.value.user,
          programs_area: newProgram.value.area,
          programs_grade: newProgram.value.grade,
          programs_start: date1,
          programs_end: date2
        })
      })
      if (!response.ok) {
        errorEditProgram.value = true
        successEditProgram.value = false
        showToast({ message: 'Error al actualizar el programa.', type: 'error' })
        return
      }

      const data = await response.json()

      program.name = data.programs_name
      program.user = data.programs_user
      program.area = data.programs_area
      program.grade = data.programs_grade
      program.start = data.programs_start
      program.end = data.programs_end
      setModalEditProgram({ open: false })
      showToast({ message: 'Programa actualizada exitosamente.', type: 'success' })
    } catch (e) {
      console.error('Error:', e)
      errorEditProgram.value = true
      successEditProgram.value = false
      showToast({ message: 'Error al actualizar el programa.', type: 'error' })
    } finally {
      loadingEditProgram.value = false
    }
  }
  return { updateProgram, loadingEditProgram, successEditProgram, errorEditProgram }
}
