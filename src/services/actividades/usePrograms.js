import { ref } from 'vue'
import { getPrograms } from './getPrograms'

export function usePrograms() {
  const programs = ref([])
  const loadingPrograms = ref(false)
  const errorPrograms = ref(null)

  const loadPrograms = async () => {
    loadingPrograms.value = true
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
