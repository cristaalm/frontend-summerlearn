import { ref, inject } from 'vue'
import { getLastProgramsAsigned } from '@/services/home/coord/getLastProgramsAsigned'

export function useLastProgramsAsigned() {
  const lastProgramsAsigned = ref([])
  const loadingLastProgramsAsigned = ref(false)
  const firstLoad = ref(true)
  const errorLastProgramsAsigned = ref(null)
  const showToast = inject('showToast')

  const loadLastProgramsAsigned = async () => {
    if (loadingLastProgramsAsigned.value) return
    if (firstLoad.value) {
      loadingLastProgramsAsigned.value = true
      firstLoad.value = false
    }
    try {
      lastProgramsAsigned.value = await getLastProgramsAsigned()
    } catch (e) {
      errorLastProgramsAsigned.value = e
      showToast({ message: 'Error al cargar las actividades', type: 'error' })
    } finally {
      if (!lastProgramsAsigned.value.length) {
        errorLastProgramsAsigned.value = 'No se han podido cargar las actividades'
      }
      loadingLastProgramsAsigned.value = false
    }
  }

  return {
    lastProgramsAsigned,
    loadingLastProgramsAsigned,
    loadLastProgramsAsigned,
    errorLastProgramsAsigned
  }
}
