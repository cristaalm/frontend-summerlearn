<script setup>
import { inject } from 'vue'
const { user } = inject('user')
</script>

<template>
    <div class="flex flex-col col-span-12 p-5 box box--stacked">
        <div class="grid grid-cols-4 gap-5">
            <div class="col-span-4 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div class="mt-1.5 text-2xl font-medium dark:text-slate-200">
                    Bienvenido {{ user ? user.firstName : '' }} {{ user ? user.lastName : '' }}
                </div>
                <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5"></div>
            </div>
        </div>
    </div>
</template>