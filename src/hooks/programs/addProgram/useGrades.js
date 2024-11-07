import { ref, inject } from 'vue'
import { getGrades } from '@/services/grades/grades'

export function useGrades() {
  const grades = ref([])
  const loadingGrades = ref(false)
  const errorGrades = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadGrades = async () => {
    if (loadingGrades.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingGrades.value = true
    }
    try {
      grades.value = await getGrades()
    } catch (e) {
      errorGrades.value = e
      showToast({ message: 'Error al cargar los grados', type: 'error' })
    } finally {
      loadingGrades.value = false
    }
  }

  return { grades, loadingGrades, errorGrades, loadGrades }
}
