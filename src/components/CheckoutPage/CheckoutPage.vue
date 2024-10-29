<template>
    <div :class="isCard ? '' : 'lg:h-screen'"
        class="container mx-auto p-6 grid grid-cols-1 row-gap-12 lg:grid-cols-10 lg:col-gap-10 lg:pt-12">
        <Payment @handle-card="handleCard" @change-parent="handleAlert" />
        <Alert :visible="alertVisible" position="top-right" color="success" title="Success"
            description="Your payment has been successfully processed." />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Payment from "./Payment.vue";
import Alert from "./Alert.vue";

// Variables reactivas
const alertVisible = ref(false);
const isCard = ref(false);

// Métodos
function handleAlert() {
    alertVisible.value = true;
    setTimeout(() => {
        alertVisible.value = false;
    }, 4000);
}

function handleCard() {
    isCard.value = true;
}
</script>
