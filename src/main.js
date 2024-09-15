import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/assets/js/i18n.js'
import '@/assets/css/tailwind.css' // Import Tailwind CSS
import '@/assets/css/input.css' // Import custom styles
import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import '@/assets/css/custom.css' // Import custom styles
import { createPinia } from 'pinia'

// 1. Import Pinia

const app = createApp(App)

// 2. Create a Pinia instance
const pinia = createPinia()

router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  if (lang && ['en', 'es'].includes(lang)) {
    i18n.global.locale = lang
  } else {
    i18n.global.locale = 'en'
  }
  next()
})

// 3. Use the plugins in the Vue application
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

// Initialize AOS only if the screen width is larger than 768px (tablet/desktop)
if (window.innerWidth > 768) {
  AOS.init({
    offset: 200,
    duration: 800,
    easing: 'ease-in-out',
    once: true
  })
}
