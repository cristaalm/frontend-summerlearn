import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './assets/js/i18n.js'
import './assets/css/tailwind.css' // Import Tailwind CSS
import './assets/css/input.css' // Import custom styles
import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import '@/assets/css/custom.css' // Import custom styles
import { createPinia } from 'pinia'

// 1. Import Pinia

const app = createApp(App) // Create a new instance of the Vue application

// 2. Create a Pinia instance
const pinia = createPinia()

router.beforeEach((to, from, next) => {
  const lang = to.params.lang // Get the language parameter from the route
  if (lang && ['en', 'es'].includes(lang)) {
    i18n.global.locale = lang // Set the global language to the selected one
  } else {
    i18n.global.locale = 'en' // Set the global language to English if no language is specified
  }
  next() // Continue with the navigation
})

// 3. Use the plugins in the Vue application
app.use(pinia) // Use Pinia in the Vue application
app.use(router) // Use the routing plugin in the Vue application
app.use(i18n) // Use the i18n plugin in the Vue application

app.mount('#app') // Mount the Vue application

// Initialize AOS after mounting the application
AOS.init({
  offset: 200,
  duration: 800,
  easing: 'ease-in-out',
  once: false
})
