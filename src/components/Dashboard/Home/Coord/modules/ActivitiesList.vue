<script setup>
import Lucide from '@/components/base/Lucide';
import LoadingIcon from '@/components/base/LoadingIcon';
import formatDate from '@/logic/formatDate';
import Tippy from '@/components/base/Tippy';
import { useRouter } from "vue-router";
import { inject, onMounted } from 'vue';

const router = useRouter();
const { lastActivities, loadingLastActivities, loadLastActivities, errorLastActivities } = inject('lastActivities');

onMounted(() => {
    if (loadingLastActivities.value) return
    loadLastActivities();
});
</script>

<template>
    <div class="col-span-12 md:col-span-4 box box--stacked h-fit">
        <div class="flex flex-col gap-5 p-2 leading-relaxed">
            <div
                class="flex items-center w-full px-3 py-3 font-medium border rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-200 dark:border-slate-800/50 shadow-lg dark:shadow-slate-600/40">
                <Lucide icon="BookMarked" class="w-5 h-5 mr-2 stroke-[1.3] text-primary dark:text-blue-400" />
                Actividades recientes
            </div>
            <div class="grid w-full grid-cols-1 gap-5">

                <!-- En caso de que esté cargando las actividades -->
                <div v-if="loadingLastActivities"
                    class="col-span-1 w-full flex flex-col gap-2 p-3 border-l-4 border-primary dark:border-blue-600 shadow-md dark:shadow-slate-700/40 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-200 rounded-md overflow-hidden">
                    <div class="text-xs text-slate-500 dark:text-slate-200 flex items-center gap-5 truncate">
                        <LoadingIcon v-if="loadingLastActivities" icon="tail-spin" class="w-8 h-8" />
                        Cargando actividades recientes...
                    </div>
                </div>

                <!-- En caso de que no haya actividades recientes -->
                <div v-if="lastActivities.length === 0 && !loadingLastActivities"
                    class="col-span-1 w-full flex flex-col gap-2 p-3 border-l-4 border-primary dark:border-blue-600 shadow-md dark:shadow-slate-700/40 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 rounded-md overflow-hidden">
                    <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                        <Lucide icon="Inbox" class="w-3 h-3" />
                        No hay actividades recientes
                    </div>
                </div>

                <!-- Lista de actividades recientes -->
                <template v-if="lastActivities.length > 0 && !loadingLastActivities"
                    v-for="(activity, index) in lastActivities.slice(0, 4)" :key="activity.activities_id">
                    <div
                        class="col-span-1 w-full flex flex-col gap-3 p-4 border-l-4 border-primary dark:border-primary shadow-md dark:shadow-slate-700/40 bg-slate-50/90 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 rounded-md overflow-hidden">

                        <!-- Nombre de la actividad con Tippy tooltip -->
                        <div class="text-base font-semibold flex items-center gap-1">
                            <Lucide icon="Activity" class="w-4 h-4 text-primary dark:text-blue-400" />
                            <Tippy :content="activity.activities_name" class="truncate">
                                {{ activity.activities_name }}
                            </Tippy>
                        </div>

                        <!-- Nombre del programa asociado con Tippy tooltip -->
                        <div class="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 truncate">
                            <Lucide icon="Layers" class="w-3 h-3" />
                            <Tippy :content="activity.activities_program.name">
                                {{ activity.activities_program.name }}
                            </Tippy>
                        </div>

                        <!-- Descripción de la actividad con Tippy tooltip -->
                        <div class="dark:text-slate-300 text-sm flex flex-row gap-2 items-center min-w-0">
                            <Tippy :content="activity.activities_description" class="truncate">
                                {{ activity.activities_description }}
                            </Tippy>
                        </div>

                        <!-- Fecha de la actividad -->
                        <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Lucide icon="Calendar" class="w-3 h-3" />
                            {{ formatDate(activity.activities_date) }}
                        </div>

                        <!-- Usuario responsable de la actividad -->
                        <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Lucide icon="UserCheck" class="w-3 h-3" />
                            {{ activity.activities_user.name }}
                        </div>

                        <!-- Voluntarios y Beneficiarios suscritos -->
                        <div class="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <div class="flex items-center gap-1">
                                <Lucide icon="User" class="w-3 h-3 text-primary dark:text-blue-400" />
                                <span>Voluntarios: ###{{ '' }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <Lucide icon="Heart" class="w-3 h-3 text-red-400 dark:text-red-500" />
                                <span>Beneficiarios: ### {{ '' }}</span>
                            </div>
                        </div>
                    </div>
                </template>

            </div>
            <div class="text-slate-400/80 dark:text-slate-200 flex justify-center items-center p-5 rounded-[0.6rem]"
                v-if="lastActivities.length > 0 && !loadingLastActivities">
                <div class="flex flex-row gap-2 justify-center items-center transform scale-100 hover:scale-110 transition-all cursor-pointer text-primary dark:text-blue-400"
                    @click="router.push({ name: 'activities' })">
                    <Lucide icon="ExternalLink" class="w-6 h-6" />
                    Ver todas las actividades
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Calcular los días entre dos fechas
function calculateDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
</script>
