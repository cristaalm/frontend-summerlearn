import { ref } from 'vue'
import { getDays } from '../../services/days/days'

export function useDays() {
  const days = ref([])
  const loadingDays = ref(false)
  const errorDays = ref(null)

  const loadDays = async (actividadId) => {
    loadingDays.value = true
    try {
      days.value = await getDays(actividadId)
    } catch (e) {
      errorDays.value = e
    } finally {
      loadingDays.value = false
    }
  }

  return { days, loadingDays, errorDays, loadDays }
}
