import { ref } from 'vue'
import { getGrades } from '@/services/grades/grades'

export function useGrades() {
  const grades = ref([])
  const loadingGrades = ref(false)
  const errorGrades = ref(null)

  const loadGrades = async () => {
    loadingGrades.value = true
    try {
      grades.value = await getGrades()
    } catch (e) {
      errorGrades.value = e
    } finally {
      loadingGrades.value = false
    }
  }

  return { grades, loadingGrades, errorGrades, loadGrades }
}
