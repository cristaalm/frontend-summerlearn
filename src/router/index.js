import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang(en|es)?',
      name: 'Home',
      component: () => 
        import('@/views/HomeView.vue')
          .catch(() => import('@/views/NotFoundView.vue')), 
      beforeEnter: (to, from, next) => {
        let lang;

        // Try to get the language from the URL, localStorage, or use 'en' as default
        try {
          lang = to.params.lang || localStorage.getItem('lang') || 'en';
        } catch (e) {
          console.error('localStorage is not available');
          lang = 'en';
        }

        // Check if the language is valid
        if (['en', 'es'].includes(lang)) {
          // Save the language in localStorage and continue navigation
          try {
            localStorage.setItem('lang', lang);
          } catch (e) {
            console.error('localStorage could not be updated');
          }

          // If the language in the URL is different from the determined one, redirect
          if (lang !== to.params.lang) {
            return next({ path: `/${lang}` });
          }
          
          return next(); // Allowed navigation
        } else {
          // If the language is not valid, check if there is a language in localStorage
          try {
            const storedLang = localStorage.getItem('lang');
            if (storedLang) {
              return next({ path: `/${storedLang}` }); // Redirect to the saved language
            }
          } catch (e) {
            console.error('localStorage retrieval failed');
          }

          // Redirect to the default language 'en' if there is no saved language
          return next({ path: '/en' });
        }
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => 
        import('@/views/LoginView.vue')
          .catch(() => import('@/views/NotFoundView.vue')) 
    },
    {
      path: '/Dashboard',
      component: () => 
        import('@/themes')
          .catch(() => import('@/views/NotFoundView.vue')),
      children: [
        {
          path: '/Dashboard',
          name: 'Dashboard',
          component: () => 
            import('@/components/dashboard/dasboardHome/DasboardHome.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/users',
          name: 'Users',
          component: () => 
            import('@/components/dashboard/usersManage/UsersManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/addUser',
          name: 'AddUser',
          component: () => 
            import('@/components/dashboard/addUsers/AddUsers.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/areas',
          name: 'Areas',
          component: () => 
            import('@/components/dashboard/areasManage/AreasManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/activities',
          name: 'Activities',
          component: () => 
            import('@/components/dashboard/activitiesManage/ActivitiesManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/expenses',
          name: 'Expenses',
          component: () => 
            import('@/components/dashboard/expensesManage/ExpensesManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/Subscriptions',
          name: 'Subscriptions',
          component: () => 
            import('@/components/dashboard/subscriptionsManage/SubscriptionsManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/performance',
          name: 'Performance',
          component: () => 
            import('@/components/dashboard/performanceManage/performanceManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/chat',
          name: 'Chat',
          component: () => 
            import('@/components/dashboard/chat/Chat.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/programs',
          name: 'Programs',
          component: () => 
            import('@/components/dashboard/programsManage/ProgramsManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/donations',
          name: 'Donations',
          component: () => 
            import('@/components/dashboard/donationsManage/DonationsManage.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        },
        {
          path: '/Dashboard/settings',
          name: 'Settings',
          component: () => 
            import('@/components/dashboard/settings/Settings.vue')
              .catch(() => import('@/views/NotFoundView.vue'))
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => 
        import('@/views/NotFoundView.vue')
          .catch(() => import('@/views/NotFoundView.vue')) 
    }
  ]
});

export default router;
