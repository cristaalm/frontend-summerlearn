<script setup>
import { ToastNotification, useToast } from '@/components/ToastNotification'
import { SettingsMenu, SettingsHero, SettingsUserInfo, SettingsChangePassword } from './components/'
import { ref, onMounted, watch } from 'vue'
import { useUser } from "@/hooks/settings/";
import { useRoute } from 'vue-router'

const page = ref(null);
const { toastMessages, showToast } = useToast();
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
  <!-- TOAST NOTIFICATION -->
  <div class="fixed right-22 p-4 transition-opacity duration-300 top-[110px] z-50 flex flex-col gap-3">
    <ToastNotification v-for="(message, index) in toastMessages" :key="index" :message="message" />
  </div>

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
          <SettingsHero :loading="loadingUser" :error="errorUser ? true : false"
            :imageUser="user?.photo ?? '/media/usersImages/placeholderUser.jpg'" :showToast="showToast" />

          <!-- INFO USER -->
          <SettingsUserInfo v-if="page === null" :user="user" :loading="loadingUser" :error="errorUser ? true : false"
            :showToast="showToast" :loadUser="loadUser" />

          <!-- CHANGE PASSWORD -->
          <SettingsChangePassword v-if="page === 'changePassword'" :showToast="showToast" />

        </div>
      </div>
    </div>
  </div>
</template>
