import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang(en|es)?',
      name: 'Home',
      component: () => 
        import('@/views/HomeView.vue')
          .catch(() => import('@/views/NotFoundView.vue')), // Manejo de errores en import()
      beforeEnter: (to, from, next) => {
        let lang;

        // Intenta obtener el idioma desde la URL, localStorage o usa 'en' por defecto
        try {
          lang = to.params.lang || localStorage.getItem('lang') || 'en';
        } catch (e) {
          console.error('localStorage is not available');
          lang = 'en';
        }

        // Verifica si el idioma es válido
        if (['en', 'es'].includes(lang)) {
          // Guarda el idioma en localStorage y continúa la navegación
          try {
            localStorage.setItem('lang', lang);
          } catch (e) {
            console.error('localStorage could not be updated');
          }

          // Si el idioma en la URL es diferente al que se determinó, redirige
          if (lang !== to.params.lang) {
            return next({ path: `/${lang}` });
          }
          
          return next(); // Navegación permitida
        } else {
          // Si el idioma no es válido, verifica si hay un idioma en localStorage
          try {
            const storedLang = localStorage.getItem('lang');
            if (storedLang) {
              return next({ path: `/${storedLang}` }); // Redirige al idioma guardado
            }
          } catch (e) {
            console.error('localStorage retrieval failed');
          }

          // Redirige al idioma por defecto 'en' si no hay un idioma guardado
          return next({ path: '/en' });
        }
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => 
        import('@/views/LoginView.vue')
          .catch(() => import('@/views/NotFoundView.vue')) // Manejo de errores en import()
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => 
        import('@/views/NotFoundView.vue')
          .catch(() => import('@/views/NotFoundView.vue')) // Manejo de errores en import()
    }
  ]
});

export default router;
