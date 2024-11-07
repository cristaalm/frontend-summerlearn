import { ref, inject } from 'vue'
import { getRoles } from '@/services/roles/roles'

export function useRoles() {
  const roles = ref([])
  const loadingRoles = ref(false)
  const firstLoad = ref(true)
  const errorRoles = ref(null)
  const showToast = inject('showToast')

  const loadRoles = async () => {
    if (loadingRoles.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingRoles.value = true
    }
    try {
      roles.value = await getRoles()
    } catch (e) {
      errorRoles.value = e
      showToast({ message: 'Ocurrió un error cargando los roles', type: 'error' })
    } finally {
      loadingRoles.value = false
    }
  }

  return { roles, loadingRoles, errorRoles, loadRoles }
}
