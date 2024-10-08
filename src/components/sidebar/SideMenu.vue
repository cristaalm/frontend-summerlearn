<script setup lang="ts">
import '@/assets/css/vendors/simplebar.css'
import '@/assets/css/themes/echo.css'
import { useRoute, useRouter } from 'vue-router'
// import { Menu } from '@/components/base/Headless'
import { Menu, Slideover } from '@/components/base/Headless'
import Tippy from '@/components/Base/Tippy'
import Lucide from '@/components/base/Lucide'
import Breadcrumb from '@/components/base/Breadcrumb'
import { useMenuStore } from '@/stores/menu'
import { useCompactMenuStore } from '@/stores/compact-menu'
import {
  type ProvideForceActiveMenu,
  forceActiveMenu,
  type Route,
  type FormattedMenu,
  nestedMenu,
  linkTo,
  enter,
  leave
} from './side-menu'
import { watch, reactive, ref, computed, onMounted, provide } from 'vue'
import SimpleBar from 'simplebar'

const compactMenu = useCompactMenuStore()
const setCompactMenu = (val: boolean) => {
  compactMenu.setCompactMenu(val)
}
const quickSearch = ref(false)

const compactMenuOnHover = ref(false)
const activeMobileMenu = ref(false)
const route: Route = useRoute()
const router = useRouter()
let formattedMenu = reactive<Array<FormattedMenu | string>>([])
const setFormattedMenu = (computedFormattedMenu: Array<FormattedMenu | string>) => {
  Object.assign(formattedMenu, computedFormattedMenu)
}
const menuStore = useMenuStore()
menuStore.resetMenu()
menuStore.loadMenu()
const menu = computed(() => nestedMenu(menuStore.value, route))

provide<ProvideForceActiveMenu>('forceActiveMenu', (pageName: string) => {
  forceActiveMenu(route, pageName)
  setFormattedMenu(menu.value)
})

const scrollableRef = ref<HTMLDivElement>()

const topBarActive = ref(false)

const toggleCompactMenu = (event: MouseEvent) => {
  event.preventDefault()
  setCompactMenu(!compactMenu.value)
}

const compactLayout = () => {
  if (window.innerWidth <= 1600) {
    setCompactMenu(true)
  }
}

const requestFullscreen = () => {
  const el = document.documentElement
  if (el.requestFullscreen) {
    el.requestFullscreen()
  }
}

watch(menu, () => {
  setFormattedMenu(menu.value)
})

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu
  }
)

const clearLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}

onMounted(() => {
  if (scrollableRef.value) {
    new SimpleBar(scrollableRef.value)
  }

  setFormattedMenu(menu.value)

  compactLayout()

  window.onresize = () => {
    compactLayout()
  }
})

window.onscroll = () => {
  // Topbar
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    topBarActive.value = true
  } else {
    topBarActive.value = false
  }
}

const openSlide = ref(false)

// Función para abrir el SlideOver
const openSlideOver = () => {
  openSlide.value = true
}

// Función para cerrar el SlideOver
const closeSlideOver = () => {
  openSlide.value = false
}
</script>

<template>
  <!-- BEGIN: Menu -->

  <!-- BEGIN: Slide Over Content -->
  <Slideover v-model:open="openSlide" @close="closeSlideOver">
    <!-- v-model vinculado a openSlide -->
    <Slideover.Panel>
      <Slideover.Title class="p-5">
        <h2 class="mr-auto text-base font-medium">Contáctanos</h2>
      </Slideover.Title>
      <Slideover.Description>
        <!-- Primera tabla -->
        <table class="min-w-full table-auto mb-4">
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-1 text-left font-semibold">Nombre</td>
              <td class="px-4 py-2">Brisa Medina</td>
              <td class="px-4 py-2 text-center">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Coordinador
                </span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 text-left font-semibold">Correo</td>
              <td class="px-4 py-2">bmedina1@ucol.mx</td>
            </tr>
          </tbody>
        </table>

        <!-- Segunda tabla -->
        <table class="min-w-full table-auto mb-4">
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-1 text-left font-semibold">Nombre</td>
              <td class="px-4 py-2">Alfredo Elizaldi</td>
              <td class="px-4 py-2 text-center">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Coordinador
                </span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 text-left font-semibold">Correo</td>
              <td class="px-4 py-2">aelizaldi@ucol.mx</td>
            </tr>
          </tbody>
        </table>

        <!-- Tercer tabla -->
        <table class="min-w-full table-auto mb-4">
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-1 text-left font-semibold">Nombre</td>
              <td class="px-4 py-2">Eduardo Árcega</td>
              <td class="px-4 py-2 text-center">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Coordinador
                </span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 text-left font-semibold">Correo</td>
              <td class="px-4 py-2">earcega@ucol.mx</td>
            </tr>
          </tbody>
        </table>

        <!-- Cuarta tabla -->
        <table class="min-w-full table-auto mb-4">
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-1 text-left font-semibold">Nombre</td>
              <td class="px-4 py-2">Gabriel Valencia</td>
              <td class="px-4 py-2 text-center">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Coordinador
                </span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 text-left font-semibold">Correo</td>
              <td class="px-4 py-2">gvalencia3@ucol.mx</td>
            </tr>
          </tbody>
        </table>

        <!-- Quinta tabla -->
        <table class="min-w-full table-auto mb-4">
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-1 text-left font-semibold">Nombre</td>
              <td class="px-4 py-2">Miguel Huitron</td>
              <td class="px-4 py-2 text-center">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Coordinador
                </span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 text-left font-semibold">Correo</td>
              <td class="px-4 py-2">mhuitron0@ucol.mx</td>
            </tr>
          </tbody>
        </table>
      </Slideover.Description>
    </Slideover.Panel>
  </Slideover>
  <!-- END: Slide Over Content -->

  <div :class="[
    'echo group bg-gradient-to-b from-slate-200/70 to-slate-50 background relative min-h-screen',
    'before:content-[\'\'] before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed',
    'after:content-[\'\'] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat',
    { 'background--hidden': topBarActive }
  ]">
    <div :class="[
      'xl:ml-0 shadow-xl transition-[margin,padding] duration-300 xl:shadow-none fixed top-0 left-0 z-50 side-menu group inset-y-0 xl:py-3.5 xl:pl-3.5',
      'after:content-[\'\'] after:fixed after:inset-0 after:bg-black/80 after:xl:hidden',
      { 'side-menu--collapsed': compactMenu.value },
      { 'side-menu--on-hover': compactMenuOnHover },
      { 'ml-0 after:block': activeMobileMenu },
      { '-ml-[275px] after:hidden': !activeMobileMenu }
    ]">
      <div :class="[
        'fixed ml-[275px] w-10 h-10 items-center justify-center xl:hidden z-50',
        { flex: activeMobileMenu },
        { hidden: !activeMobileMenu }
      ]">
        <a href="" @click="(event) => {
          event.preventDefault()
          activeMobileMenu = false
        }
          " class="mt-5 ml-5">
          <Lucide icon="X" class="w-8 h-8 text-white" />
        </a>
      </div>
      <div :class="[
        'h-full box bg-white/[0.95] rounded-none xl:rounded-xl z-20 relative w-[275px] duration-300 transition-[width] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] overflow-hidden flex flex-col'
      ]" @mouseover="(event) => {
        event.preventDefault()
        compactMenuOnHover = true
      }
        " @mouseleave="(event) => {
            event.preventDefault()
            compactMenuOnHover = false
          }
            ">
        <div :class="[
          'flex items-center z-10 px-5 h-[65px] w-[275px] overflow-hidden relative duration-300 xl:group-[.side-menu--collapsed]:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:w-[275px]'
        ]">
          <a href=""
            class="flex items-center transition-[margin] duration-300 group-[.side-menu--collapsed]:xl:ml-2 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0"
            @click="(event: MouseEvent) => {
              event.preventDefault()
              router.push({
                name: 'dashboard'
              })
              activeMobileMenu = false
            }
              ">
            <div
              class="flex items-center justify-center w-[34px] rounded-lg h-[34px] bg-gradient-to-b from-theme-1 to-theme-2/80 transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-360">
              <!-- Logo -->
              <img src="/logo_icono.png" />
            </div>
            <div
              class="ml-3.5 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0 transition-opacity font-medium">
              SummerLearn
            </div>
          </a>
          <a href="" @click="toggleCompactMenu"
            class="hidden group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 transition-[opacity,transform] 3xl:flex items-center justify-center w-[20px] h-[20px] ml-auto border rounded-full border-slate-600/40 hover:bg-slate-600/5">
            <Lucide icon="ArrowLeft" class="w-3.5 h-3.5 stroke-[1.3]" />
          </a>
        </div>
        <div ref="scrollableRef" :class="[
          'w-full h-full z-20 px-5 overflow-y-auto overflow-x-hidden pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent',
          '[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30'
        ]">
          <ul class="scrollable">
            <!-- BEGIN: First Child -->
            <template v-for="(menu, menuKey) in formattedMenu">
              <li v-if="typeof menu === 'string'" class="side-menu__divider" :key="'divider-' + menuKey">
                {{ menu }}
              </li>
              <li v-else :key="menuKey">
                <a href="" :class="[
                  'side-menu__link',
                  { 'side-menu__link--active': menu.active },
                  {
                    'side-menu__link--active-dropdown': menu.activeDropdown
                  }
                ]" @click="(event: MouseEvent) => {
                  event.preventDefault()
                  if (!menu.subMenu) {
                    activeMobileMenu = false
                  }
                  linkTo(menu, router)
                  setFormattedMenu([...formattedMenu])
                }
                  ">
                  <Lucide :icon="menu.icon" class="side-menu__link__icon" />
                  <div class="side-menu__link__title">{{ menu.title }}</div>
                  <div v-if="menu.badge" class="side-menu__link__badge">
                    {{ menu.badge }}
                  </div>
                  <Lucide v-if="menu.subMenu" icon="ChevronDown" class="side-menu__link__chevron" />
                </a>
                <!-- BEGIN: Second Child -->
                <Transition @enter="enter" @leave="leave">
                  <ul v-if="menu.subMenu && menu.activeDropdown">
                    <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                      <a href="" :class="[
                        'side-menu__link',
                        { 'side-menu__link--active': subMenu.active },
                        {
                          'side-menu__link--active-dropdown': subMenu.activeDropdown
                        }
                      ]" @click="(event: MouseEvent) => {
                        event.preventDefault()
                        activeMobileMenu = false
                        linkTo(subMenu, router)
                        setFormattedMenu([...formattedMenu])
                      }
                        ">
                        <Lucide :icon="subMenu.icon" class="side-menu__link__icon" />
                        <div class="side-menu__link__title">
                          {{ subMenu.title }}
                        </div>
                        <div v-if="subMenu.badge" class="side-menu__link__badge">
                          {{ subMenu.badge }}
                        </div>
                        <Lucide v-if="subMenu.subMenu" icon="ChevronDown" class="side-menu__link__chevron" />
                      </a>
                      <!-- BEGIN: Third Child -->
                      <Transition @enter="enter" @leave="leave">
                        <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                          <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                            <a href="" :class="[
                              'side-menu__link',
                              {
                                'side-menu__link--active': lastSubMenu.active
                              },
                              {
                                'side-menu__link--active-dropdown': lastSubMenu.activeDropdown
                              }
                            ]" @click="(event: MouseEvent) => {
                              event.preventDefault()
                              linkTo(lastSubMenu, router)
                              setFormattedMenu([...formattedMenu])
                            }
                              ">
                              <Lucide :icon="lastSubMenu.icon" class="side-menu__link__icon" />
                              <div class="side-menu__link__title">
                                {{ lastSubMenu.title }}
                              </div>
                              <div v-if="lastSubMenu.badge" class="side-menu__link__badge">
                                {{ lastSubMenu.badge }}
                              </div>
                            </a>
                          </li>
                        </ul>
                      </Transition>
                      <!-- END: Third Child -->
                    </li>
                  </ul>
                </Transition>
                <!-- END: Second Child -->
              </li>
            </template>
            <!-- END: First Child -->
          </ul>
        </div>
      </div>
      <div
        class="fixed h-[65px] transition-[margin] duration-100 xl:ml-[275px] group-[.side-menu--collapsed]:xl:ml-[90px] mt-3.5 inset-x-0 top-0">
        <div :class="[
          'top-bar absolute left-0 xl:left-3.5 right-0 h-full mx-5 group',
          'before:content-[\'\'] before:absolute before:top-0 before:inset-x-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur',
          { 'top-bar--active': topBarActive }
        ]">
          <div
            class="container flex items-center justify-between w-full h-full transition-[padding,background-color,border-color] ease-in-out duration-300 box bg-transparent border-transparent shadow-none group-[.top-bar--active]:box group-[.top-bar--active]:px-5 group-[.top-bar--active]:bg-transparent group-[.top-bar--active]:border-transparent group-[.top-bar--active]:bg-gradient-to-r group-[.top-bar--active]:from-theme-1 group-[.top-bar--active]:to-theme-2">
            <div class="flex items-center gap-1 xl:hidden">
              <a href="" @click="(event) => {
                event.preventDefault()
                activeMobileMenu = true
              }
                " class="p-2 text-white rounded-full hover:bg-white/5">
                <Lucide icon="AlignJustify" class="w-[18px] h-[18px]" />
              </a>
            </div>
            <!-- BEGIN: Breadcrumb -->
            <!-- <Breadcrumb light class="flex-1 hidden xl:block">
              <Breadcrumb.Link to="/">SummerLearn</Breadcrumb.Link>
              <Breadcrumb.Link to="/dashboard/" :active="true">Dashboard</Breadcrumb.Link>
            </Breadcrumb> -->
            <!-- END: Breadcrumb -->
            <!-- BEGIN: Search -->
            <div class="relative justify-center flex-1 hidden xl:flex" @click="() => {
              quickSearch = true
            }
              "></div>

            <div class="flex justify-end px-4 space-x-5">
              <!-- Close Button Menu -->
              <Menu class="overflow-hidden w-9 h-9 border-3 relative group">
                <Menu.Button @click="openSlideOver">
                  <!-- Llamada a la función para abrir el SlideOver -->
                  <Tippy as="a" class="flex items-center justify-center ml-auto w-9 h-9" content="Contáctanos">
                    <img alt="Tailwise - Admin Dashboard Template" :src="`/directorio-telefonico.png`" />
                    <Lucide icon="MessagesSquare" class="w-9 h-9 text-white mx-auto" />
                  </Tippy>
                </Menu.Button>
              </Menu>

              <!-- User Profile Menu -->
              <Menu>
                <Menu.Button class="overflow-hidden rounded-full w-9 h-9 border-3 border-white/15 image-fit">
                  <img alt="Tailwise - Admin Dashboard Template"
                    :src="`https://avatar.iran.liara.run/public/boy?username=Ash`" />
                </Menu.Button>
                <Menu.Items class="w-56 mt-1 bg-white shadow-lg rounded-md">
                  <Menu.Item @click="() => router.push({ name: 'settings' })"
                    class="text-primary flex items-center px-4 py-2 hover:bg-gray-100">
                    <Lucide icon="Users" class="w-4 h-4 mr-2" />
                    Configuración
                  </Menu.Item>
                  <Menu.Item @click="() => {
                    clearLocalStorage()
                    menuStore.resetMenu()
                    router.push({ name: 'login' })
                  }
                    " class="text-danger flex items-center px-4 py-2 hover:bg-gray-100">
                    <Lucide icon="Power" class="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <!-- <ActivitiesPanel
              :activitiesPanel="activitiesPanel"
              :setActivitiesPanel="setActivitiesPanel"
            />
            <NotificationsPanel
              :notificationsPanel="notificationsPanel"
              :setNotificationsPanel="setNotificationsPanel"
            />
            <SwitchAccount
              :switchAccount="switchAccount"
              :setSwitchAccount="setSwitchAccount"
            /> -->
            <!-- END: Notification & User Menu -->
          </div>
        </div>
      </div>
    </div>
    <div :class="[
      'transition-[margin,width] duration-100 xl:pl-3.5 pt-[54px] pb-16 relative z-10 group mode',
      { 'xl:ml-[275px]': !compactMenu.value },
      { 'xl:ml-[91px]': compactMenu.value },
      { 'mode--light': !topBarActive }
    ]">
      <div class="px-5 mt-16">
        <div class="container">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
