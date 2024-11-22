import { ref } from 'vue'
import { getSchudelesActivity } from '../../services/actividades/schudeles/schudeles'

export function useSchudelesActivity() {
  const schudelesActivity = ref([])
  const loadingSchudelesActivity = ref(false)
  const errorSchudelesActivity = ref(null)

  const loadSchudelesActivity = async (actividadId) => {
    loadingSchudelesActivity.value = true
    try {
      schudelesActivity.value = await getSchudelesActivity(actividadId)
    } catch (e) {
      errorSchudelesActivity.value = e
    } finally {
      loadingSchudelesActivity.value = false
    }
  }

  return {
    schudelesActivity,
    loadingSchudelesActivity,
    errorSchudelesActivity,
    loadSchudelesActivity
  }
}
