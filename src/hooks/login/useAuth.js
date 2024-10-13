import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const loginSuccess = ref('')
  const error = ref('')

  const loginUser = async ({ email, password }) => {
    error.value = ''
    loading.value = true
    try {
      const response = await fetch(Baseurl + 'api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const data = await response.json()
      if (response.ok) {
        loginSuccess.value = 'Inicio de sesión exitoso'
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        setTimeout(() => {
          router.push({ name: 'dashboard' })
        }, 3000)
      } else {
        error.value = 'Correo electrónico o contraseña incorrectos'
      }
    } catch (e) {
      console.error('Error:', e)
      error.value = 'Hubo un problema con la solicitud'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    loginSuccess,
    loginUser
  }
}
