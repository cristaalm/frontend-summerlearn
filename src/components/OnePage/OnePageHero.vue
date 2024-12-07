<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const smoothScroll = (event) => {
  event.preventDefault()
  const targetId = event.target.getAttribute('href').substring(1)
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Lista de imágenes para el carrusel
const images = ref([
  '/assets/img/Photo1.png',
  '/assets/img/Photo2.jpg',
  '/assets/img/Photo3.jpg',
  '/assets/img/Photo4.png'
])

const currentImageIndex = ref(0)
let intervalId = null

// Función para cambiar a la siguiente imagen
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
}

onMounted(() => {
  intervalId = setInterval(nextImage, 3000) // Cambia cada 3 segundos
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <section
    id="home"
    className="relative min-h-screen h-fit w-full py-12 md:py-20 lg:py-20 flex flex-col justify-center items-center bg-esmerald-100/50 bg-transparent"
  >
    <div className="container px-4 md:px-6 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <div
          class="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-12"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <div class="space-y-6 md:mx-auto">
            <h1
              class="text-3xl md:mx-autofont-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-hblue1"
            >
              {{ $t('hero.title') }}
            </h1>
            <p
              class="max-w-[600px] text-muted-foreground md:mx-auto md:text-xl text-justify text-black"
            >
              {{ $t('hero.description') }}
            </p>
          </div>
          <div class="flex gap-2 flex-row justify-center md:justify-start">
            <a
              href="#joinOurTeam"
              @click="smoothScroll"
              class="inline-flex h-10 w-3/4 md:mx-auto md:w-fit items-center justify-center cursor-pointer select-none rounded-md bg-emerald-500 px-8 py-6 text-xl font-medium text-white shadow transition-colors hover:bg-emerald-500/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 duration-300"
            >
              {{ $t('hero.button') }}
            </a>
          </div>
        </div>
        <div
          class="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg z-20"
        >
          <img
            :src="images[currentImageIndex]"
            alt="Carrusel"
            class="mx-auto shadow-xl aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square h-[300px] sm:h-[400px] lg:h-[500px] z-20"
          />
        </div>
      </div>
    </div>
    <!-- Zigzag separator -->
    <div
      className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] pointer-events-none"
    >
      <svg
        className="relative block w-full h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <defs>
          <linearGradient id="redGradientm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #67de96; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #1aca60; stop-opacity: 1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#redGradientm)"
          fill-opacity="1"
          d="M0,160L80,186.7C160,213,320,267,480,277.3C640,288,800,256,960,218.7C1120,181,1280,139,1360,117.3L1440,96V320H0Z"
        ></path>
      </svg>
    </div>
  </section>
</template>
