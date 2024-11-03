<script setup>
import { ref } from 'vue'

const openSlide = ref(false)
const setBasicSlideoverPreview = (value) => {
  openSlide.value = value
}
</script>

<template>
  <!-- BEGIN: Slide Over Content -->
  <Slideover v-model:open="openSlide" @close="setBasicSlideoverPreview(false)">
    <Slideover.Panel id="dieciseis">
      <Slideover.Title class="p-5">
        <h2 class="mr-auto text-base font-medium">Blank Slide Over</h2>
      </Slideover.Title>
      <Slideover.Description> This is a totally awesome blank slide over! </Slideover.Description>
    </Slideover.Panel>
  </Slideover>
  <!-- END: Slide Over Content -->
</template>
