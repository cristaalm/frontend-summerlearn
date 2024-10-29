import { ref } from 'vue'
import { getSchedules } from '../../services/schedules/schedules'

export function useSchedules() {
  const schedules = ref([])
  const loadingSchedules = ref(false)
  const errorSchedules = ref(null)

  const loadSchedules = async () => {
    loadingSchedules.value = true
    try {
      const scheduleList = await getSchedules()
      schedules.value = scheduleList
      console.log(schedules.value)
    } catch (e) {
      errorSchedules.value = e
    } finally {
      loadingSchedules.value = false
    }
  }

  return { schedules, loadingSchedules, errorSchedules, loadSchedules }
}
