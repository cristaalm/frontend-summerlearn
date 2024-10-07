import { ref } from 'vue'
import { getUsers } from '@/services/users/getUsersByStatusThree'

export function useUserRequest() {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadUsers = async () => {
    loading.value = true
    try {
      users.value = await getUsers()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, loadUsers }
}
