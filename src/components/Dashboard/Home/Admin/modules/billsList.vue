<script setup>
import Lucide from "@/components/base/Lucide";
import LoadingIcon from "@/components/base/LoadingIcon";
import Button from "@/components/base/Button";
import { useLastBills } from '@/hooks/home/admin/useLastBills';
import { onMounted } from "vue";
import { useRouter } from "vue-router";

// Usar el hook para obtener las donaciones
const { lastBills, loadingLastBills, loadLastBills, errorLastBills } = useLastBills();
const router = useRouter()

// Formateador de moneda
function formatCurrency(value) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value);
}

onMounted(() => {
    loadLastBills();
})

</script>

<template>
    <div class="flex flex-col col-span-12 lg:col-span-6 gap-y-10">
        <div>
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium dark:text-slate-200">Actividad de gastos</div>
            </div>

            <div class="p-5 mt-3.5 box box--stacked">
                <!-- Total de donaciones -->
                <div class="pb-5 mb-5 border-b border-dashed border-slate-300/70">
                    <div class="flex flex-col gap-3 sm:items-center sm:flex-row">
                        <div>
                            <div class="flex items-center">
                                <div class="text-xl font-medium text-warning">
                                    {{ formatCurrency(lastBills?.total_bills || 0) }}
                                </div>
                            </div>
                            <div class="mt-1 text-slate-500 dark:text-slate-400">Gastos recientes</div>
                        </div>
                        <div class="sm:ml-auto">

                            <Button variant="outline-warning" class="w-full text-warning" @click="() => {
                                router.push({ name: 'expenses' })
                            }">
                                <Lucide icon="ExternalLink" class="w-6 h-4 mr-2" />
                                Ver más detalles
                            </Button>
                        </div>
                    </div>
                </div>

                <!-- Estado de carga -->
                <div v-if="loadingLastBills" class="flex justify-center items-center p-5">
                    <LoadingIcon icon="tail-spin" class="stroke-[1.3] w-6 h-6" color="black" />
                </div>

                <!-- Error en la carga -->
                <div v-if="errorLastBills" class="text-red-500 text-center p-5">
                    Ocurrió un error al cargar las donaciones.
                </div>

                <!-- Lista vacía de donaciones -->
                <div v-if="!loadingLastBills && !errorLastBills && lastBills?.last_bills?.length === 0"
                    class="text-slate-500 text-center p-5">
                    No hay donaciones recientes.
                </div>

                <!-- Mostrar lista de donaciones si se cargan correctamente y no está vacía -->
                <template v-if="!loadingLastBills && !errorLastBills && lastBills?.last_bills?.length">
                    <div class="flex flex-col gap-5">
                        <template v-for="donation in lastBills.last_bills" :key="donation.bills_id">
                            <div class="flex items-center">
                                <!-- Primer elemento con menor espacio (ícono de gasto) -->
                                <div class="flex-[0.1]">
                                    <div :class="[
                                        'group flex items-center justify-center w-[2.5rem] h-[2.5rem] border rounded-full',
                                        '[&.warning]:border-warning/10 [&.warning]:bg-warning/10',
                                        'warning'
                                    ]">
                                        <Lucide icon="DollarSign" :class="[
                                            'w-[1.15rem] h-[1.15rem]',
                                            'group-[.warning]:text-warning group-[.warning]:fill-warning/10',
                                        ]" />
                                    </div>
                                </div>

                                <!-- Elemento central con mayor espacio (concepto de gasto) -->
                                <div class="ml-3.5 flex flex-[0.8] flex-col gap-y-1 min-w-0">
                                    <div class="font-medium whitespace-nowrap dark:text-slate-200">
                                        {{ formatCurrency(donation.bills_amount) }}
                                    </div>
                                    <div class="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {{ donation.bills_concept }}
                                    </div>
                                </div>

                                <!-- Último elemento con menor espacio (etiqueta de gasto) -->
                                <span :class="[
                                    'flex-[0.1] sm:ml-auto mr-auto sm:mr-0 group flex items-center text-xs font-medium rounded-lg border px-2.5 py-1',
                                    '[&.warning]:border-warning/10 [&.warning]:bg-warning/10 [&.warning]:text-warning',
                                    'warning'
                                ]">

                                    <div :class="[
                                        'w-1 h-1 mr-1.5 rounded-full border',
                                        'group-[.warning]:border-warning/50 group-[.warning]:bg-warning/50',
                                    ]"></div>
                                    <span class="-mt-px">Gasto</span>
                                </span>
                            </div>
                        </template>

                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
