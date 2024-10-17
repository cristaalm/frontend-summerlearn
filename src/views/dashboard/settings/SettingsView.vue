<script setup>
import { SettingsMenu, SettingsHero, SettingsUserInfo, SettingsChangePassword } from './components/'
import { ref, onMounted, watch } from 'vue'
import { useUser } from "@/hooks/settings/";
import { useRoute } from 'vue-router'

const page = ref(null);
const { user, loadingUser, errorUser, loadUser } = useUser();
const route = useRoute();

const loadPageFromQuery = () => {
  // Asegúrate de que sea un string o null
  page.value = route.params.page ? String(route.params.page) : null;
};

watch(
  () => route.params.page,  // Escucha directamente el parámetro 'page'
  (newPage) => {
    page.value = newPage ? String(newPage) : null;
  }
);

onMounted(() => {
  loadPageFromQuery(); // Inicializar el valor de `page` desde los query params
  loadUser();
});

</script>

<template>

  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">
          Configuración de la Cuenta
        </div>
      </div>
      <div class="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">

        <!-- MENU -->
        <SettingsMenu :page="page" />

        <div class="flex flex-col col-span-12 xl:col-span-9 gap-y-7">

          <!-- HERO -->
          <SettingsHero />

          <!-- INFO USER -->
          <SettingsUserInfo v-if="page === null" />

          <!-- CHANGE PASSWORD -->
          <SettingsChangePassword v-if="page === 'changePassword'" />

        </div>
      </div>
    </div>
  </div>
</template>
