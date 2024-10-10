<script setup>
import { RouterView } from 'vue-router'
import ToastNotification from '@/components/ToastNotification/'


</script>

<template>
  <ToastNotification>
    <RouterView />
  </ToastNotification>
</template>
