<script setup>
import Button from '@/components/base/Button/Button.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
    <div class="bg-white w-full px-12 py-32 rounded-xl flex flex-col justify-center items-center">
        <div class="text-center">
            <h1 class="text-9xl font-bold text-gray-800">
                <span class="text-emerald-500">4</span>0<span class="text-emerald-500">4</span>
            </h1>
            <p class="text-4xl text-gray-600">
                <span class="text-emerald-500">O</span>ops! P<span class="text-emerald-500">á</span>gina
                n<span class="text-emerald-500">o</span> enc<span class="text-emerald-500">o</span>ntr<span
                    class="text-emerald-500">a</span>d<span class="text-emerald-500">a</span>.
            </p>
            <div class="mt-8">
                <p class="text-xl text-gray-500">Lo sentimos, la página que estás buscando no se encuentra.</p>
                <p class="text-xl text-gray-500">Por favor, verifica la URL o regresa al dashboard.</p>
            </div>
            <Button
                variant="outline-primary"
                class="mt-4"
                @click="() => {
                    router.push({
                        name: 'dashboard',
                    });
                }"
            >
                Volver al dashboard
            </Button>
            <!-- <a href="/dashboard/" class="mt-4 text-blue-500 hover:underline text-2xl">Volver a la página principal</a> -->
        </div>
    </div>
</template>