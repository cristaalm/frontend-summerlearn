<template>
    <footer class="bg-black text-white py-10 flex flex-row justify-center items-center w-full">
        <div class="container">
            <div class="flex flex-row w-full">
                <div class="w-1/2 flex flex-col justify-center items-center">
                    <!-- Display the copyright text -->
                    <p class="text-center w-full">{{ $t('footer.copyRight') }}</p>
                </div>
                <div class="w-1/2 flex flex-row justify-end">
                    <div class="flex flex-col gap-2">
                        <!-- Label for language selection -->
                        <label for="language-select" class="w-full text-center">Language:</label>
                        <!-- Dropdown for language selection -->
                        <select id="language-select" class="block appearance-none bg-gray-900 border border-gray-800 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500" v-model="language" @change="changeLanguage">
                            <!-- Option to activate language -->
                            <option :value="`${ $t('footer.values.activate.activate') }`">{{ $t('footer.values.activate.lenguage') }}</option>
                            <!-- Option to deactivate language -->
                            <option :value="`${ $t('footer.values.deactivate.deactivate') }`">{{ $t('footer.values.deactivate.lenguage') }}</option>
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
