import { ref } from 'vue'
import { getAreas } from '@/services/areas'

export function useAreas () {
    const areas = ref([])
    const loading = ref(false)
    const error = ref(null)

    const loadAreas = async () => {
        loading.value = true
        try {
            areas.value = await getAreas()
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    }

    return { areas, loading, error, loadAreas }
}