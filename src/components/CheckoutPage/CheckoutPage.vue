<template>
    <div class="flex flex-row justify-between w-full">
        <div class="text-base font-medium group-[.mode--light]:text-white">Método de pago</div>
        <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                <Button variant="primary"
                    class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
                    @click="() => {
                        btnForm()
                    }
                        ">
                    <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
                </Button>
            </div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center ">
        <div class="w-full max-w-[600px]">
            <Payment />
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from "vue";
import Payment from "./Payment.vue";
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import { useRouter } from 'vue-router'

const { btnForm } = inject('buttonsDonations')

// Variables reactivas
const isCard = ref(false);
const router = useRouter()

// Métodos

function handleCard() {
    isCard.value = true;
}
</script>
