<script setup lang="ts">
import '@/assets/css/vendors/tippy.css'
import tippy, {
  type PopperElement,
  type Props,
  roundArrow,
  animateFill as animateFillPlugin
} from 'tippy.js'
import { ref, onMounted, inject, watch } from 'vue'

export type ProvideTippy = (el: PopperElement) => void

interface TippyProps {
  refKey?: string
  content: string
  disable?: boolean
  as?: string | object
  options?: Partial<Props>
}

const props = withDefaults(defineProps<TippyProps>(), {
  as: 'span',
  disable: false
})

const tippyRef = ref<PopperElement>()

// Inicializar tippy con opciones y contenido
const initTippy = (el: PopperElement, content: string, options?: Partial<Props>) => {
  const instance = tippy(el, {
    content: content,
    arrow: roundArrow,
    animateFill: false,
    animation: 'shift-away',
    plugins: [animateFillPlugin],
    popperOptions: {
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: 'viewport'
          }
        }
      ]
    },
    ...options,
  })
  return instance
}

// Actualizar el contenido del tooltip
const updateContent = (newContent: string) => {
  if (tippyRef.value && tippyRef.value._tippy) {
    tippyRef.value._tippy.setContent(newContent)
  }
}

// Enlazar la instancia de tippy
const bindInstance = (el: PopperElement) => {
  if (props.refKey) {
    const bind = inject<ProvideTippy>(`bind[${props.refKey}]`, () => { })
    if (bind) {
      bind(el)
    }
  }
}

// Habilitar/deshabilitar el tooltip según props.disable
const isDisabled = () => {
  if (tippyRef.value && tippyRef.value._tippy) {
    props.disable ? tippyRef.value._tippy.disable() : tippyRef.value._tippy.enable()
  }
}

// Reactividad para cuando cambie el contenido del tooltip
watch(() => props.content, (newContent) => {
  updateContent(newContent)
})

// Montaje de tippy.js en el elemento
onMounted(() => {
  if (tippyRef.value) {
    const instance = initTippy(tippyRef.value, props.content, props.options)
    tippyRef.value = instance.popper // Aseguramos que tippyRef guarda la instancia
    bindInstance(tippyRef.value)
    isDisabled()
  }
})

</script>

<template>
  <component :is="as" ref="tippyRef" class="cursor-pointer">
    <slot></slot>
  </component>
</template>
