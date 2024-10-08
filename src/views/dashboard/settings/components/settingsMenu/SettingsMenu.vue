<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formattedMenu } from "./menu"
import Lucide from "@/components/base/Lucide";

const page = ref(null);
const route = useRoute();
const router = useRouter();

watch(
    computed(() => route),
    () => {
        const queryParams = new URLSearchParams(window.location.search);
        page.value = queryParams.get("page");
    },
    { deep: true }
);


</script>

<template>
    <div class="relative col-span-12 xl:col-span-3">
        <div class="sticky top-[104px]">
            <div class="flex flex-col px-5 pt-5 pb-6 box box--stacked">
                <button v-for="(menu, menuKey) in formattedMenu" :key="menuKey"
                    @click="router.push({ name: 'settings', query: menu.page })" :class="[
                        'flex items-center py-3 first:-mt-3 last:-mb-3 [&.active]:text-primary [&.active]:font-medium hover:text-primary',
                        { active: page === (menu.page == null ? null : menu.page.page) }
                    ]">
                    <Lucide :icon="menu.icon" class="stroke-[1.3] w-4 h-4 mr-3" />
                    {{ menu.title }}
                </button>
            </div>
        </div>
    </div>
</template>