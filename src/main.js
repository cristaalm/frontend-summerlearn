import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './assets/js/i18n.js'
import './assets/css/tailwind.css'
import AOS from 'aos'
import 'aos/dist/aos.css' // Importa los estilos de AOS
import '@/assets/css/custom.css' // Importa los estilos personalizados

const app = createApp(App) // Crea una nueva instancia de la aplicación Vue

router.beforeEach((to, from, next) => {
  const lang = to.params.lang // Obtiene el parámetro de idioma de la ruta
  if (lang && ['en', 'es'].includes(lang)) {
    i18n.global.locale = lang // Establece el idioma global al seleccionado
  } else {
    i18n.global.locale = 'en' // Establece el idioma global a inglés si no se especifica ningún idioma
  }
  next() // Continúa con la navegación
})

app.use(router) // Usa el plugin de enrutamiento en la aplicación Vue
app.use(i18n) // Usa el plugin i18n en la aplicación Vue

app.mount('#app') // Monta la aplicación Vue

// Inicializa AOS después de montar la aplicación
AOS.init({
  offset: 200,
  duration: 800,
  easing: 'ease-in-out',
  once: false
})
