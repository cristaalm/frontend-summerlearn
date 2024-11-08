import { ref } from 'vue'
import { getProgramsActived } from '../../services/actividades/programs/programs'

export function useProgramsActividades() {
  const programas = ref([])
  const loadingProgram = ref(false)
  const errorProgram = ref(null)
  const firstLoad = ref(true)

  const loadProgram = async () => {
    if (loadingProgram.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingProgram.value = true
    }
    try {
      programas.value = await getProgramsActived()
    } catch (e) {
      errorProgram.value = e
    } finally {
      loadingProgram.value = false
    }
  }

  return { programas, loadingProgram, errorProgram, loadProgram }
}
