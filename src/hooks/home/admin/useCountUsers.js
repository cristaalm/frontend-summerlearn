import { ref, inject } from 'vue'
import { getUsersByRolStatus } from '@/services/home/admin/usersByRolStatus'

export function useCountUsers() {
  const countUsers = ref([])
  const loadingCountUsers = ref(false)
  const showToast = inject('showToast')
  // Inicializa graphicDonations con valores predeterminados

  const loadCountUsers = async () => {
    loadingCountUsers.value = true
    try {
      countUsers.value = await getUsersByRolStatus()
    } catch (e) {
      showToast({ message: 'Error al cargar los usuarios', type: 'error' })
    } finally {
      loadingCountUsers.value = false
    }
  }

  return { countUsers, loadingCountUsers, loadCountUsers }
}
