import { type Icon } from '@/components/base/Lucide/Lucide.vue'
import { Baseurl } from '@/../global'
import { defineStore } from 'pinia'

// Función para obtener el rol del token desencriptado
async function getRoleFromToken(): Promise<string | null> {
  const encryptedToken = localStorage.getItem('access_token')

  if (encryptedToken) {
    try {
      // Split the token to access the payload
      const payloadBase64 = encryptedToken.split('.')[1] // Get the payload (second element of JWT)
      const payloadJson = JSON.parse(atob(payloadBase64)) // Decode and convert to JSON object

      // Ensure that the role is present in the payload
      const encryptedRole = payloadJson.rol ? String(payloadJson.rol) : null // Convert to string or assign null

      if (encryptedRole) {
        try {
          // Prepare the request for decryption
          const response = await fetch(`${Baseurl}api/decrypt/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ encrypted_text: encryptedRole })
          })

          // Check if the response is ok
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          // Parse the JSON response
          const data = await response.json()
          const role = data.decrypted_text // Adjust this depending on your API response structure
          return role // Return the decrypted role
        } catch (decryptError) {
          console.error('Error al desencriptar el rol:', decryptError)
          return null // Handle error as needed
        }
      }
    } catch (error) {
      console.error('Error al procesar el access_token:', error)
      return null
    }
  }
  return null // If no token in localStorage
}

export interface Menu {
  icon: Icon
  title: string
  badge?: number
  pageName?: string
  subMenu?: Menu[]
  ignore?: boolean
}

export interface MenuState {
  value: Array<Menu | string>
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    value: [] // Menú vacío inicialmente
  }),

  actions: {
    async loadMenu() {
      // Obtén el rol desde el token desencriptado
      const role = await getRoleFromToken() // Llama a la función para obtener el rol desencriptado

      if (!role) {
        console.warn('No se pudo cargar el rol.')
        this.value = []
        return
      }

      // Construir el menú dependiendo del rol
      let menuItems: Array<Menu | string> = []
      switch (role) {
        case '1':
          menuItems = []
          menuItems = [
            'GESTIÓN DE USUARIOS',
            {
              icon: 'SquareUser',
              pageName: 'users',
              title: 'Usuarios',
              subMenu: [
                {
                  icon: 'GalleryVerticalEnd',
                  pageName: 'users-request',
                  title: 'Solicitudes'
                }
              ]
            },
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones',
            },
            {
              icon: 'Album',
              pageName: 'programs',
              title: 'Programas',
              subMenu: [
                {
                  icon: 'LayoutPanelTop',
                  pageName: 'areas',
                  title: 'Áreas'
                },
                {
                  icon: 'BookMarked',
                  pageName: 'activities',
                  title: 'Actividades'
                }
              ]
            },
            {
              icon: 'BarChartBig',
              pageName: 'performance',
              title: 'Desempeño'
            },
            'GESTIÓN ECONÓMICA',
            {
              icon: 'PiggyBank',
              pageName: 'donations',
              title: 'Donaciones',
              subMenu: [
                {
                  icon: 'ReceiptText',
                  pageName: 'expenses',
                  title: 'Gastos'
                }
              ]
            },
            'CONTÁCTANOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Contacto'
            }
          ]
          break
        case '2':
          menuItems = []
          menuItems = [
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones',
              subMenu: [
                {
                  icon: 'GalleryVerticalEnd',
                  pageName: 'request_subscriptions',
                  title: 'Solicitudes'
                }
              ]
            },
            {
              icon: 'Album',
              pageName: 'programs',
              title: 'Programas',
              subMenu: [
                {
                  icon: 'BookMarked',
                  pageName: 'activities',
                  title: 'Actividades'
                }
              ]
            },
            {
              icon: 'BarChartBig',
              pageName: 'performance',
              title: 'Desempeño'
            },
            'CONTÁCTANOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Contacto'
            }
          ]
          break
        case '3':
          menuItems = []
          menuItems = [
            'GESTIÓN ECONÓMICA',
            {
              icon: 'PiggyBank',
              pageName: 'donations',
              title: 'Donaciones',
              subMenu: [
                {
                  icon: 'ReceiptText',
                  pageName: 'expenses',
                  title: 'Gastos'
                }
              ]
            },
            'CONTÁCTANOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Contacto'
            }
          ]
          break
        case '4':
          menuItems = []
          menuItems = [
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'BookMarked',
              pageName: 'activities_view',
              title: 'Actividades Vista'
            },
            {
              icon: 'BarChartBig',
              pageName: 'performance',
              title: 'Desempeño'
            },
            'CONTÁCTANOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Contacto'
            }
          ]
          break
        case '5':
          menuItems = [
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'BookMarked',
              pageName: 'activities_view',
              title: 'Actividades-Vista'
            },
            {
              icon: 'BarChartBig',
              pageName: 'performance_view',
              title: 'Desempeño'
            },
            'CONTÁCTANOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Contacto'
            }
          ]
          break
        default:
          menuItems = []
          console.warn('Rol desconocido:', role)
          break
      }

      // Actualiza el estado del menú
      this.value = menuItems
    },
    resetMenu() {
      this.value = []
    }
  }
})
