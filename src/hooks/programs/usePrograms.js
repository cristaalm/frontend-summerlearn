import { ref } from 'vue'
import { getPrograms } from '@/services/programs/programs'

export function usePrograms() {
  const programs = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadPrograms = async () => {
    loading.value = true
    try {
      programs.value = await getPrograms()
      console.log(programs.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { programs, loading, error, loadPrograms }
}
