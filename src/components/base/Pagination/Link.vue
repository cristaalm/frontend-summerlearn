<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { computed, type LiHTMLAttributes, useAttrs } from "vue";
import Button from "../Button";

interface LinkProps extends /* @vue-ignore */ LiHTMLAttributes {
  as?: string | object;
  active?: boolean;
}

// Definimos las props con un valor por defecto
const props = withDefaults(defineProps<LinkProps>(), {
  as: "a",
  active: false,
});

// Usamos useAttrs para recoger el resto de atributos
const attrs = useAttrs();

// Calculamos las clases CSS en función del estado active
const computedClass = computed(() =>
  twMerge([
    "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
    props.active ? "bg-blue-500 text-white font-medium" : "", // Estilo cuando active es true
    typeof attrs.class === "string" && attrs.class,
  ])
);
</script>

<template>
  <li class="flex-1 sm:flex-initial">
    <Button :as="props.as" :class="computedClass" v-bind="_.omit(attrs, 'class')">
      <slot></slot>
    </Button>
  </li>
</template>