import { ref } from 'vue'
import { getPrograms } from '@/services/programs/programs'

export function usePrograms() {
  const programs = ref([])
  const loadingPrograms = ref(false)
  const errorPrograms = ref(null)
  const firstLoad = ref(true)

  const loadPrograms = async () => {
    if (loadingPrograms.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingPrograms.value = true
    }
    try {
      programs.value = await getPrograms()
    } catch (e) {
      errorPrograms.value = e
    } finally {
      loadingPrograms.value = false
    }
  }

  return { programs, loadingPrograms, errorPrograms, loadPrograms }
}
