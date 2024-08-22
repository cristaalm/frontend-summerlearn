import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // Create a router instance with web history mode
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Define a route for the Home view with an optional language parameter
      path: '/:lang(en|es)?',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        // Get the language parameter from the route or default to 'en'
        const lang = to.params.lang || 'en'
        if (['en', 'es'].includes(lang)) {
          // If the language is valid, proceed to the route
          return next()
        } else {
          // If the language is invalid, redirect to the route with 'en' as the language parameter
          return next({ params: { lang: 'en' } })
        }
      }
    },
    {
      // Define a route for the Login view
      path: '/Login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      // Define a route for the NotFound view to handle any unmatched routes
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
