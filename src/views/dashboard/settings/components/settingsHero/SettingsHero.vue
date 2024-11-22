<script setup>
import { ref, watch, inject } from 'vue'
import Lucide from '@/components/base/Lucide'
import LoadingIcon from '@/components/base/LoadingIcon'
import { useValidationImage } from '@/hooks/settings/settingsHero'
import { Baseurl } from '@/utils/global'

const inputFile = ref(null)
const { photoUser, loadingUserPhoto, errorUserPhoto } = inject('userPhoto')

// enviamos la imagen del usuario proporsionada por el padre a la función useValidationImage
const { profileImage, validateImage, triggerFileSelect, loadingImage } = useValidationImage({
  imageUser: photoUser,
  inputFile
})

// Actualiza profileImage cuando loading cambia a false
watch(
  () => loadingUserPhoto,
  (newLoading) => {
    if (!newLoading) {
      profileImage.value = photoUser // Aseguramos que la imagen se actualice
    }
  }
)
</script>

<template>
  <div class="p-1.5 box flex flex-col box--stacked">
    <div
      class="h-60 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95"
    >
      <div
        :class="[
          'w-full h-full relative overflow-hidden',
          'before:content-[\'\'] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]',
          'after:content-[\'\'] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]'
        ]"
      ></div>
      <div class="absolute inset-x-0 -top-[calc(50%-(8rem/4))] w-32 h-32 mx-auto mt-36">
        <div
          class="w-full h-full border-[6px] box bg-white border-white rounded-full image-fit relative flex items-center justify-center bg-primary/5 border-primary/10 dark:bg-slate-600 dark:border-slate-700"
        >
          <img
            v-if="profileImage && !loadingUserPhoto && !errorUserPhoto"
            :src="`${!profileImage.includes('http') ? Baseurl + profileImage : profileImage}`"
            class="object-cover w-full h-full rounded-full"
          />

          <div
            v-if="loadingImage || (loadingUserPhoto && !errorUserPhoto)"
            class="absolute inset-0 flex items-center justify-center bg-theme-2/70 rounded-full"
          >
            <LoadingIcon icon="tail-spin" class="absolute h-20 z-50" color="white" />
          </div>

          <Lucide
            v-if="(!profileImage && loadingUserPhoto) || errorUserPhoto"
            icon="User"
            class="w-[65%] h-[65%] fill-slate-300/70 dark:fill-slate-200 -mt-1.5 stroke-[0.5] stroke-slate-400/50 dark:stroke-slate-200"
          />

          <!-- Botón para seleccionar una imagen -->
          <div
            @click="triggerFileSelect"
            v-if="!loadingUserPhoto && !loadingImage && !errorUserPhoto"
            class="absolute bottom-0 right-0 flex items-center justify-center rounded-full box w-7 h-7 cursor-pointer dark:bg-slate-600"
          >
            <Lucide
              icon="Pencil"
              class="w-3.5 h-3.5 stroke-[1.3] text-warning dark:text-slate-200"
            />
          </div>

          <!-- Input tipo archivo oculto -->
          <input
            id="profileImageInput"
            type="file"
            class="hidden"
            @change="validateImage"
            accept="image/*"
            ref="inputFile"
          />
        </div>
      </div>
    </div>
  </div>
</template>
