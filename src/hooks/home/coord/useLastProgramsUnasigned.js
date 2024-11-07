import { ref, inject } from 'vue'
import { getLastProgramsUnasigned } from '@/services/home/coord/getLastProgramsUnasigned'

export function useLastProgramsUnasigned() {
  const lastProgramsUnasigned = ref([])
  const loadingLastProgramsUnasigned = ref(false)
  const firstLoad = ref(true)
  const errorLastProgramsUnasigned = ref(null)
  const showToast = inject('showToast')

  const loadLastProgramsUnasigned = async () => {
    if (loadingLastProgramsUnasigned.value) return
    if (firstLoad.value) {
      loadingLastProgramsUnasigned.value = true
      firstLoad.value = false
    }
    try {
      lastProgramsUnasigned.value = await getLastProgramsUnasigned()
    } catch (e) {
      errorLastProgramsUnasigned.value = e
      showToast({ message: 'Error al cargar las actividades', type: 'error' })
    } finally {
      if (!lastProgramsUnasigned.value.length) {
        errorLastProgramsUnasigned.value = 'No se han podido cargar las actividades'
      }
      loadingLastProgramsUnasigned.value = false
    }
  }

  return {
    lastProgramsUnasigned,
    loadingLastProgramsUnasigned,
    loadLastProgramsUnasigned,
    errorLastProgramsUnasigned
  }
}
