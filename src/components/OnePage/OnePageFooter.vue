<template>
  <footer
    class="text-black dark:text-slate-200 py-10 flex flex-row justify-center items-center w-full bg-footerColor"
  >
    <div class="container">
      <div class="flex flex-row w-full">
        <div class="w-1/2 flex flex-col justify-center items-start">
          <!-- Display the copyright text -->
          <p class="text-left w-full">{{ $t('footer.copyRight') }}</p>
          <!-- Link to privacy notices -->
          <a
            href="/privacy"
            target="_blank"
            class="text-left w-fit text-gray-700 hover:underline"
            >{{ $t('footer.privacyNotices') }}</a
          >
        </div>
        <div class="w-1/2 flex flex-row justify-end">
          <div class="flex flex-col gap-2">
            <!-- Label for language selection -->
            <label for="language-select" class="w-full text-center"
              >{{ $t('footer.language') }}:</label
            >
            <!-- Dropdown for language selection -->
            <select
              id="language-select"
              class="block appearance-none bg-yellow/20 border border-yellow/30 text-black dark:text-slate-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-yellow/20 focus:border-yellow/300 cursor-pointer"
              v-model="language"
              @change="changeLanguage"
            >
              <!-- Option to activate language -->
              <option :value="`${$t('footer.values.activate.activate')}`">
                {{ $t('footer.values.activate.lenguage') }}
              </option>
              <!-- Option to deactivate language -->
              <option :value="`${$t('footer.values.deactivate.deactivate')}`">
                {{ $t('footer.values.deactivate.lenguage') }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const language = ref(route.params.lang || 'es') // Get the current language from the URL or use 'es' as default

const changeLanguage = () => {
  // Check if the selected language is different from the current language
  if (language.value !== route.params.lang) {
    // Redirect and fully reload the page
    window.location.href = `/${language.value}`
  }
}
</script>
