<!-- path: @/views/dashboard/settings/SettingsView.vue -->

<script setup>
import { ToastNotification, useToast } from '@/components/ToastNotification'
import { SettingsMenu, SettingsHero, SettingsUserInfo } from './components/'
import { ref, onMounted, watch, computed } from 'vue'
import { useUser } from "@/hooks/settings/";
import { useRoute } from 'vue-router'

const page = ref(null);
const { toastMessages, showToast } = useToast();
const { user, loadingUser, errorUser, loadUser } = useUser();

const route = useRoute();

watch(errorUser, (newError) => {
  if (newError) {
    showToast({ message: 'Error al cargar la información, Intentelo mas tarde.', tipo: 'error' });
  }
});

watch(
  computed(() => route),
  () => {
    const queryParams = new URLSearchParams(window.location.search);
    page.value = queryParams.get("page");
  },
  { deep: true }
);

onMounted(() => {
  if (page.value === null) {
    loadUser()
  }
});

</script>
<template>
  <!--? ######################## TOAST NOTIFICATION ######################## -->

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

        <!--? ################################ MENU ################################ -->

        <SettingsMenu />


        <div class="flex flex-col col-span-12 xl:col-span-9 gap-y-7">

          <!--? ################################ HERO ################################ -->

          <!-- * Imagen del usuario * -->
          <SettingsHero :loading="loadingUser" :error="errorUser ? true : false"
            :imageUser="user?.photo ?? '/media/usersImages/placeholderUser.jpg'" :showToast="showToast" />


          <SettingsUserInfo v-if="page === null" :user="user" :loading="loadingUser" :error="errorUser ? true : false"
            :showToast="showToast" :loadUser="loadUser" />
        </div>
      </div>
    </div>
  </div>
</template>