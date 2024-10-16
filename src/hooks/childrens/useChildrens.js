import { ref } from 'vue'
import { getChildrens } from '@/services/children/childrens'

export function useChildrens() {
  const childrens = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadChildrens = async () => {
    loading.value = true
    try {
      childrens.value = await getChildrens()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  return { childrens, loading, error, loadChildrens }
}
