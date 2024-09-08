import { type Icon } from '@/components/base/Lucide/Lucide.vue'
import { defineStore } from 'pinia'

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
    value: [
      'GESTIÓN DE USUARIOS',
      {
        icon: 'SquareUser',
        pageName: 'users',
        title: 'Usuarios'
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
      'GESTIÓN GENERAL',
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
      {
        icon: 'Notebook',
        pageName: 'subscriptions',
        title: 'Suscripciones'
      },
      {
        icon: 'BarChartBig',
        pageName: 'performance',
        title: 'Desempeño'
      },
      {
        icon: 'MessagesSquare',
        pageName: 'chat',
        title: 'Chat'
      }
    ]
  })
})
