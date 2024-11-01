<script setup lang="ts">
// @ts-ignore
import ToastNotification from '@/components/ToastNotification/'
// @ts-ignore
import ProviderLayer from '@/components/ProviderLayer/ProviderLayer.vue'
import { loginColorSheme } from '@/utils/switchColorScheme'
import { useThemeStore, getTheme, themes, type Themes } from '@/stores/theme'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'

const route = useRoute()
const Component = computed(() => getTheme(themeStore.theme).component)

const themeStore = useThemeStore()
const switchTheme = (theme: Themes['name']) => {
  useThemeStore().setTheme(theme)
}

onMounted(() => {
  loginColorSheme()
  const theme = route.query.theme as Themes['name']
  if (route.query.theme !== undefined && themes.map((theme) => theme.name).includes(theme)) {
    switchTheme(theme)
  }
})
</script>

<template>
  <ToastNotification>
    <div>
      <ProviderLayer>
        <Component />
      </ProviderLayer>
    </div>
  </ToastNotification>
  <ThemeSwitcher :slide="true" />
</template>
