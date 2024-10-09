<script setup>
import { formattedMenu } from "./menu"
import { useRouter } from "vue-router";
import Lucide from "@/components/base/Lucide";

const props = defineProps({
    page: {
        type: [String, null],
        required: true,
    }
});

const router = useRouter();

</script>

<template>
    <div class="relative col-span-12 xl:col-span-3">
        <div class="sticky top-[104px]">
            <div class="flex flex-col px-5 pt-5 pb-6 box box--stacked">
                <button v-for="(menu, menuKey) in formattedMenu" :key="menuKey"
                    @click="router.push({ name: 'settings', params: menu.page })" :class="[
                        'flex items-center py-3 first:-mt-3 last:-mb-3 [&.active]:text-primary [&.active]:font-medium hover:text-primary',
                        { active: props.page === (menu.page == null ? null : menu.page.page) }
                    ]">
                    <Lucide :icon="menu.icon" class="stroke-[1.3] w-4 h-4 mr-3" />
                    {{ menu.title }}
                </button>
            </div>
        </div>
    </div>
</template>