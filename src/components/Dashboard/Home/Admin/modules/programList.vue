<script setup>
import Lucide from "@/components/base/Lucide";
import Button from "@/components/base/Button"
import LoadingIcon from "@/components/base/LoadingIcon";
import { useRouter } from "vue-router";
import { useLastPrograms } from "@/hooks/home/admin/useLastPrograms";

const router = useRouter();

const { lastPrograms, loadingLastPrograms, loadLastPrograms, errorLastPrograms } = useLastPrograms();

// Cargar los últimos programas cuando el componente se monte
loadLastPrograms();
</script>

<template>
    <div class="w-full col-span-12  lg:col-span-4 xl:col-span-4">
        <div class="flex flex-col gap-y-7">
            <div class="flex flex-col gap-y-6">
                <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                    <div class="text-base font-medium 2xl:group-[.mode--light]:text-white dark:text-slate-200">
                        Programas
                    </div>
                </div>

                <!-- Mostrar el estado de carga -->
                <div v-if="loadingLastPrograms" class="flex justify-center items-center p-5">
                    <LoadingIcon icon="tail-spin" class="stroke-[1.3] w-6 h-6" color="black" />
                </div>

                <!-- Mostrar mensaje de error si ocurre un problema -->
                <div v-if="errorLastPrograms" class="text-red-500 text-center p-5">
                    Ocurrió un error al cargar los programas.
                </div>

                <!-- Mostrar lista de programas si se cargan correctamente -->
                <template v-if="!loadingLastPrograms && !errorLastPrograms && lastPrograms.length > 0">
                    <template v-for="(program, index) in lastPrograms" :key="program.programs_id">
                        <div class="relative flex items-center gap-3.5 p-5 event box box--stacked">
                            <!-- Contenedor de información del programa (80% del espacio) -->
                            <div class="flex-[0.8] min-w-0">
                                <div class="font-medium text-primary truncate event__title dark:text-slate-200">
                                    {{ program.programs_name }}
                                </div>
                                <div class="mt-1 leading-relaxed text-slate-500 truncate dark:text-slate-400">
                                    {{ program.programs_grade.description }}
                                </div>
                                <div class="mt-1 text-slate-500">
                                    <span class="event__days">
                                        {{ calculateDays(program.programs_start, program.programs_end) }}
                                    </span>
                                    Días
                                </div>
                            </div>

                            <!-- Contenedor del botón (20% del espacio) -->
                            <div class="flex-[0.2] flex flex-row justify-center items-center">
                                <Button variant="outline-primary"
                                    class="min-w-[100px] p-1.5 dark:text-slate-200 dark:border-slate-600 dark:hover:!bg-slate-600/10 cursor-default">
                                    {{ program.programs_area.name }}
                                </Button>
                            </div>
                        </div>
                    </template>

                </template>

                <!-- Mostrar mensaje si no hay programas -->
                <div v-if="!loadingLastPrograms && !errorLastPrograms && lastPrograms.length === 0"
                    class="text-slate-500 text-center p-5 dark:text-slate-200">
                    No hay programas para mostrar.
                </div>

                <div class="w-full m-5 cursor-pointer text-blue-500 text-center flex flex-row justify-center items-center hover:scale-105 transition-all"
                    @click="router.push({ name: 'programs' })">
                    <Lucide icon="ExternalLink" class="w-6 h-4 mr-2" />
                    Ver todos los programas
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
