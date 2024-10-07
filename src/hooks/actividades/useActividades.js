import { ref } from 'vue'
import { getActividades } from '../../services/actividades/actividades'

export function useActividades() {
  const actividades = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadActividades = async () => {
    loading.value = true
    try {
      actividades.value = await getActividades()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { actividades, loading, error, loadActividades }
}
