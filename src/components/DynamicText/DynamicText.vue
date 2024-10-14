<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Definir la prop para las frases
const { phrases } = defineProps<{ phrases: string[] }>()

// Estado reactivo para el texto actual y visibilidad del componente
const dynamicText = ref<string>('')
const isLgScreen = ref<boolean>(false) // Controla si la pantalla es grande

// Variables internas para controlar la animación
let shuffledPhrases: string[] = []
let phraseIndex: number = 0
let letterIndex: number = 0
let isDeleting: boolean = false
const typingSpeed: number = 50 // Velocidad de escritura en ms
const delayBetweenPhrases: number = 1000 // Tiempo de espera entre frases

// Función para barajar las frases
const shuffleArray = (array: string[]): string[] => {
    const shuffled = array.slice() // Crear una copia del array original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

// Función que maneja el efecto de escritura y borrado
const typeEffect = (): void => {
    const currentPhrase: string = shuffledPhrases[phraseIndex]

    if (isDeleting) {
        dynamicText.value = currentPhrase.substring(0, letterIndex--)
    } else {
        dynamicText.value = currentPhrase.substring(0, letterIndex++)
    }

    // Si terminó de escribir la frase, esperar antes de comenzar a borrar
    if (!isDeleting && letterIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), delayBetweenPhrases)
    } else if (isDeleting && letterIndex === 0) {
        // Cambiar a la siguiente frase después de borrar
        isDeleting = false
        phraseIndex++

        // Si se recorrieron todas las frases, volver a barajar y reiniciar el índice
        if (phraseIndex >= shuffledPhrases.length) {
            shuffledPhrases = shuffleArray(phrases)
            phraseIndex = 0
        }
    }

    // Controlar la velocidad de escritura y borrado
    setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed)
}

// Función para manejar cambios de tamaño de pantalla
const handleResize = (): void => {
    // Activar el componente si el ancho de la pantalla es igual o mayor a 1024px (lg)
    isLgScreen.value = window.innerWidth >= 1024

    // Si la pantalla es lo suficientemente grande, comenzar la animación
    if (isLgScreen.value && !shuffledPhrases.length) {
        shuffledPhrases = shuffleArray(phrases)
        typeEffect()
    }
}

// Ejecutar la animación y establecer listener de redimensionamiento
onMounted((): void => {
    handleResize() // Verificar el tamaño de pantalla al montar
    window.addEventListener('resize', handleResize) // Escuchar cambios en el tamaño de pantalla
})

// Limpiar el listener cuando se desmonta el componente
onUnmounted((): void => {
    window.removeEventListener('resize', handleResize)
})
</script>



<template>
    <div v-if="isLgScreen"
        class="sticky top-0 z-10 flex-col justify-center hidden lg:h-screen lg:ml-16 lg:flex xl:ml-28 2xl:ml-36">
        <div class="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
            {{ dynamicText }}
        </div>
    </div>
</template>




<style scoped>
/* Estilo opcional para el cursor parpadeante */
.dynamic-text::after {
    content: '|';
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
