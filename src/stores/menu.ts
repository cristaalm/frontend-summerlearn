import { type Icon } from '@/components/base/Lucide/Lucide.vue'
// @ts-ignore
import getIdByTokenm from '@/logic/getIdByToken'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
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
      const router = useRouter()
      const role = getIdByTokenm(localStorage.getItem('access_token')).rol

      if (!role) {
        console.warn('No se pudo cargar el rol.')
        this.value = []
        return
      }

      // Construir el menú dependiendo del rol
      let menuItems: Array<Menu | string> = []
      switch (role) {
        case 1:
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
            'CONTACTOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat'
            }
          ]
          break
        case 2:
          menuItems = []
          menuItems = [
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones'
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
            'CONTACTOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat'
            }
          ]
          break
        case 3:
          menuItems = []
          menuItems = [
            'GESTIÓN ECONÓMICA',
            {
              icon: 'PiggyBank',
              pageName: 'donations',
              title: 'Donaciones',
            },
            'CONTACTOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat'
            }
          ]
          break
        case 4:
          menuItems = []
          menuItems = [
            'ACTIVIDADES DISPONIBLES',
            {
              icon: 'Notebook',
              pageName: 'subscriptionsGrid',
              title: 'Suscripciones'
            },
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
            'CONTACTOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat'
            }
          ]
          break
        case 5:
          menuItems = [
            'MI(S) HIJO(S)',
            {
              icon: 'BookUser',
              pageName: 'childrens',
              title: 'Hijos'
            },
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
            'CONTACTOS',
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat'
            }
          ]
          break
        default:
          menuItems = []
          console.warn('Rol desconocido:', role)
          clearLocalStorage()
          router.push('/login')
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
