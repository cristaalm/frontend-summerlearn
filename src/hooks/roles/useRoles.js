import { ref } from 'vue'
import { getRoles } from '@/services/roles/roles'

export function useRoles() {
  const roles = ref([])
  const loadingRoles = ref(false)
  const errorRoles = ref(null)

  const loadRoles = async () => {
    loadingRoles.value = true
    try {
      roles.value = await getRoles()
    } catch (e) {
      errorRoles.value = e
    } finally {
      loadingRoles.value = false
    }
  }

  return { roles, loadingRoles, errorRoles, loadRoles }
}
