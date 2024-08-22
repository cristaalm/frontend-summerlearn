import './assets/css/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './assets/js/i18n.js'

const app = createApp(App) // Create a new Vue app instance

router.beforeEach((to, from, next) => {
  const lang = to.params.lang // Get the language parameter from the route
  if (lang && ['en', 'es'].includes(lang)) {
    i18n.global.locale = lang // Set the global locale to the selected language
  } else {
    i18n.global.locale = 'en' // Set the global locale to English if no language is specified
  }
  next() // Continue with the navigation
})

app.use(router) // Use the router plugin in the Vue app
app.use(i18n) // Use the i18n plugin in the Vue app

app.mount('#app') // Mount the Vue app to the element with id 'app'
