import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'

export function useSetProgram() {
  const router = useRouter()
  const setProgramLoading = ref(false)
  const setProgramError = ref('')

  const addProgram = async ({ program }) => {
    setProgramLoading.value = true
    setProgramError.value = ''

    //? ############# Date Formating #############

    let start = ''
    let end = ''
    try {
      // * Separamos las fechas
      const date = program.duration.split('-')
      start = date[0]
      end = date[1]

      // * Remplazamos "/" por "-"
      start = start.replace(/\//g, '-')
      end = end.replace(/\//g, '-')

      // * Formateamos las fechas a YYYY-MM-DD
      start = start.split('-').reverse().join('-').replace(/\s+/g, '')
      end = end.split('-').reverse().join('-').replace(/\s+/g, '')
    } catch (e) {
      console.error('Error:', e)
      setProgramError.value = 'La "duración del programa" no es válida'
      setProgramLoading.value = false
      return
    }

    //? ############# Fetching Data #############

    try {
      const response = await fetch(Baseurl + 'programs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          programs_name: program.name,
          programs_start: start,
          programs_end: end,
          programs_user: program.responsible,
          programs_area: program.area,
          programs_status: 1
        })
      })
      if (response.ok) {
        router.push({ name: 'programs' })
      } else {
        setProgramError.value = 'Hubo un problema con la solicitud'
      }
    } catch (e) {
      console.error('Error:', e)
      setProgramError.value = 'Hubo un problema con la solicitud'
    } finally {
      setProgramLoading.value = false
    }
  }

  return { setProgramLoading, setProgramError, addProgram }
}
