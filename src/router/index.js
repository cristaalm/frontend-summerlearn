import { createRouter, createWebHistory } from 'vue-router'
import { Baseurl } from '@/utils/global'
import { ref } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Asegúrate de importar el CSS

const flag = ref(false)

NProgress.configure({
  showSpinner: false, // Oculta el spinner (círculo giratorio) al final de la barra de progreso
  speed: 500, // Velocidad de la barra (en milisegundos)
  minimum: 0.5, // Valor mínimo inicial (para que la barra no comience de 0)
  trickleSpeed: 200, // Velocidad de goteo automático
  easing: 'ease' // Estilo de easing para animación
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang(en|es)?',
      name: 'home',
      component: () =>
        import('@/views/HomeView.vue').catch(() => import('@/views/NotFoundView.vue')),
      beforeEnter: (to, from, next) => {
        let lang

        // Try to get the language from the URL, localStorage, or use 'en' as default
        try {
          lang = to.params.lang || localStorage.getItem('lang') || 'en'
        } catch (e) {
          console.error('localStorage is not available')
          lang = 'en'
        }

        // Check if the language is valid
        if (['en', 'es'].includes(lang)) {
          // Save the language in localStorage and continue navigation
          try {
            localStorage.setItem('lang', lang)
          } catch (e) {
            console.error('localStorage could not be updated')
          }

          // If the language in the URL is different from the determined one, redirect
          if (lang !== to.params.lang) {
            return next({ path: `/${lang}` })
          }

          return next() // Allowed navigation
        } else {
          // If the language is not valid, check if there is a language in localStorage
          try {
            const storedLang = localStorage.getItem('lang')
            if (storedLang) {
              return next({ path: `/${storedLang}` }) // Redirect to the saved language
            }
          } catch (e) {
            console.error('localStorage retrieval failed')
          }

          // Redirect to the default language 'en' if there is no saved language
          return next({ path: '/en' })
        }
      }
    },
    {
      path: '/register/:rol/',
      name: 'register',
      component: () =>
        import('@/views/RegisterView.vue').catch(() => import('@/views/NotFoundView.vue')),
      beforeEnter: (to, from, next) => {
        const rol = to.params.rol // Leer el parámetro del rol si es pasado en la URL

        // Verificar si el rol es válido
        if (!['donante', 'voluntario', 'beneficiario'].includes(rol)) {
          return next({ name: 'home' }) // Redirigir a la página de inicio si no es válido
        }

        // Convertir el rol a un número correspondiente
        to.params.rol = rol == 'donante' ? 3 : rol == 'voluntario' ? 4 : 5 // 3: Donador, 4: Voluntario, 5: Beneficiario

        next() // Si es válido, sigue con la navegación
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () =>
        import('@/views/TermsView.vue').catch(() => import('@/views/NotFoundView.vue'))
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () =>
        import('@/views/PrivacyView.vue').catch(() => import('@/views/NotFoundView.vue'))
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () =>
        import('@/views/ForgotPasswordView.vue').catch(() => import('@/views/NotFoundView.vue'))
    },
    {
      path: '/reset-password/:key?',
      name: 'resetPassword',
      component: () =>
        import('@/views/ResetPasswordView.vue').catch(() => import('@/views/NotFoundView.vue')),
      beforeEnter: (to, from, next) => {
        const key = to.params.key

        // Comprueba si la key está presente
        if (!key) {
          return next({ name: 'login' }) // Redirige al login si no hay key
        }
        // Continuar si la key es válida
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/views/LoginView.vue').catch(() => import('@/views/NotFoundView.vue'))
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard').catch(() => import('@/views/NotFoundView.vue')),
      beforeEnter: async (to, from, next) => {
        // obtener el token de refresco
        const refresh_token = localStorage.getItem('refresh_token') || null

        // Verificar si el token de refresco está presente
        if (!refresh_token) return next({ name: 'login' })

        // si from es login y to es dashboard, entonces redirige a dashboard
        if (from.name === 'login' && to.name === 'dashboard') return next()
        if (flag.value) {
          flag.value = false
          return next()
        }

        // Si el token de refresco está presente, intenta refrescar el token de acceso
        const response = await fetch(`${Baseurl}auth/refresh-token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: refresh_token
          })
        })

        // Si la respuesta no es exitosa, redirige al login y elimina el token de acceso y refresco
        if (!response.ok) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          // seteamos el tema por defecto
          localStorage.setItem('darkMode', false)
          localStorage.setItem('colorScheme', 'theme-19')
          return next({ name: 'login' })
        }

        // Si la respuesta es exitosa, guarda el nuevo token de acceso y permite el acceso
        const data = await response.json()
        localStorage.setItem('access_token', data.access)

        next() // Permite acceso
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () =>
            import('@/views/dashboard/dashboardHome/DashboardHome.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/users',
          name: 'users',
          component: () =>
            import('@/views/dashboard/users/UsersView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/users/add',
          name: 'addUser',
          component: () =>
            import('@/views/dashboard/users/AddUsers.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/users/request',
          name: 'users-request',
          component: () =>
            import('@/views/dashboard/users/UsersRequestView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/areas',
          name: 'areas',
          component: () =>
            import('@/views/dashboard/areas/AreasView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/areas/add',
          name: 'addArea',
          component: () =>
            import('@/views/dashboard/areas/AddArea.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/activities',
          name: 'activities',
          component: () =>
            import('@/views/dashboard/activities/ActivitiesView.vue').catch((error) => {
              console.error('Error loading ActivitiesView.vue:', error)
              // Puedes manejar el error o mostrar alguna notificación en la interfaz si lo deseas
              throw error // Re-lanzamos el error si necesitas que sea gestionado en otro lugar
            })
        },
        {
          path: '/dashboard/activities/add',
          name: 'addActividades',
          component: () =>
            import('@/views/dashboard/activities/AddActividades.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/activities/view',
          name: 'activities_view',
          component: () =>
            import('@/views/dashboard/activities/ActivitiesOnlyView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/expenses',
          name: 'expenses',
          component: () =>
            import('@/views/dashboard/expenses/ExpensesView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/expenses/add',
          name: 'addExpense',
          component: () =>
            import('@/views/dashboard/expenses/AddExpense.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/subscriptions',
          name: 'subscriptions',
          component: () =>
            import('@/views/dashboard/subscriptions/SubscriptionsView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/childrens',
          name: 'childrens',
          component: () =>
            import('@/views/dashboard/children/ChildrenView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/childrens/add',
          name: 'addChildrens',
          component: () =>
            import('@/views/dashboard/children/AddChildView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/subscriptionsgrid',
          name: 'subscriptionsGrid',
          component: () =>
            import('@/views/dashboard/subscriptions/SubscriptionsGridView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/performance',
          name: 'performance',
          component: () =>
            import('@/views/dashboard/performance/PerformanceView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/AddPerformance',
          name: 'addPerformance',
          component: () =>
            import('@/views/dashboard/performance/AddPerformance.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/performance/view',
          name: 'performance_view',
          component: () =>
            import('@/views/dashboard/performance/PerformanceOnlyView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/chat',
          name: 'chat',
          component: () =>
            import('@/views/dashboard/chat/ChatView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/programs/add',
          name: 'addProgram',
          component: () =>
            import('@/views/dashboard/programs/AddProgram.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/programs',
          name: 'programs',
          component: () =>
            import('@/views/dashboard/programs/ProgramsView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/donations',
          name: 'donations',
          component: () =>
            import('@/views/dashboard/donations/DonationsView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/donations/add',
          name: 'addDonation',
          component: () =>
            import('@/views/dashboard/donations/AddDonation.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/settings/:page?/',
          name: 'settings',
          component: () =>
            import('@/views/dashboard/settings/SettingsView.vue').catch(
              () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
            )
        },
        {
          path: '/dashboard/:pathMatch(.*)*',
          name: 'notFoundDashboard',
          component: () => import('@/views/dashboard/notFoundView/NotFoundView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start() // Iniciar la barra de progreso

  // Verificar si el usuario intenta acceder a una ruta fuera del dashboard
  if (!to.path.startsWith('/dashboard')) {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    // Si ambos tokens están presentes, intentar refrescar el access_token
    if (access_token && refresh_token) {
      try {
        const response = await fetch(`${Baseurl}auth/refresh-token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: refresh_token
          })
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('access_token', data.access) // Guardar el nuevo token de acceso

          // Si el refresco del token es exitoso, redirigir al dashboard
          flag.value = true
          return next({ name: 'dashboard' })
        } else {
          // Si la respuesta no es exitosa, redirigir al login y eliminar los tokens
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          // seteamos el tema por defecto
          localStorage.setItem('darkMode', false)
          localStorage.setItem('colorScheme', 'theme-19')
          return next({ name: from.name })
        }
      } catch (error) {
        console.error('Error al refrescar el token de acceso:', error)
        // Si ocurre un error, continuar con la navegación normal
      }
    } else if (access_token || refresh_token) {
      // Si solo uno de los tokens está presente, eliminar ambos y redirigir al login
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      // seteamos el tema por defecto
      localStorage.setItem('darkMode', false)
      localStorage.setItem('colorScheme', 'theme-19')
      return next({ name: from.name })
    }
  }

  next() // Continúa con la navegación si no se cumple ninguna de las condiciones anteriores
})

router.afterEach(() => {
  // Detener la barra de progreso al finalizar la navegación
  NProgress.done()
})

// Detener NProgress cuando la navegación se completa
router.afterEach(() => {
  NProgress.done() // Finaliza la barra de progreso
})

export default router
