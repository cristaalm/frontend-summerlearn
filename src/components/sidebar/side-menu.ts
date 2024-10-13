import { type Router, type RouteLocationNormalizedLoaded } from 'vue-router'
import { type Menu } from '@/stores/menu'
import { slideUp, slideDown } from '@/utils/helper'

export interface Route extends RouteLocationNormalizedLoaded {
  forceActiveMenu?: string
}

export interface FormattedMenu extends Menu {
  active?: boolean
  activeDropdown?: boolean
  subMenu?: FormattedMenu[]
}

export type ProvideForceActiveMenu = (pageName: string) => void

const forceActiveMenu = (route: Route, pageName: string) => {
  route.forceActiveMenu = pageName
}

// Setup side menu
const findActiveMenu = (subMenu: Menu[], route: Route): boolean => {
  let match = false
  subMenu.forEach((item) => {
    if (
      ((route.forceActiveMenu !== undefined && item.pageName === route.forceActiveMenu) ||
        (route.forceActiveMenu === undefined && item.pageName === route.name)) &&
      !item.ignore
    ) {
      match = true
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, route)
    }
  })
  return match
}

const nestedMenu = (menu: Array<Menu | string>, route: Route) => {
  const formattedMenu: Array<FormattedMenu | string> = []
  menu.forEach((item) => {
    if (typeof item !== 'string') {
      const menuItem: FormattedMenu = {
        icon: item.icon,
        title: item.title,
        pageName: item.pageName,
        subMenu: item.subMenu,
        ignore: item.ignore
      }
      menuItem.active =
        ((route.forceActiveMenu !== undefined && menuItem.pageName === route.forceActiveMenu) ||
          (route.forceActiveMenu === undefined && menuItem.pageName === route.name) ||
          (menuItem.subMenu && findActiveMenu(menuItem.subMenu, route))) &&
        !menuItem.ignore

      if (menuItem.subMenu) {
        menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, route)

        // Nested menu
        const subMenu: Array<FormattedMenu> = []
        nestedMenu(menuItem.subMenu, route).map(
          (menu) => typeof menu !== 'string' && subMenu.push(menu)
        )
        menuItem.subMenu = subMenu
      }

      formattedMenu.push(menuItem)
    } else {
      formattedMenu.push(item)
    }
  })

  return formattedMenu
}

const linkTo = (menu: FormattedMenu, router: Router) => {
  if (menu.subMenu) {
    // comprobamos si estamos en la pagina correspondiente al menu
    if (menu.pageName === router.currentRoute.value.name) {
      menu.activeDropdown = !menu.activeDropdown
      return
    }
    // si no estamos en la pagina correspondiente al menu, redirigimos a la pagina correspondiente
    router.push({
      name: menu.pageName
    })
  } else {
    if (menu.pageName !== undefined) {
      router.push({
        name: menu.pageName
      })
    }
  }
}

const enter = (el: Element) => {
  slideDown(el as HTMLElement, 300)
}

const leave = (el: Element) => {
  slideUp(el as HTMLElement, 300)
}

export { nestedMenu, linkTo, enter, leave, forceActiveMenu }
