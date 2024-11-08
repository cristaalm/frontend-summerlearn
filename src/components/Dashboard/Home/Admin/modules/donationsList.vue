<script setup>
import Lucide from "@/components/base/Lucide";
import LoadingIcon from "@/components/base/LoadingIcon";
import Button from "@/components/base/Button";
import { onMounted, inject } from "vue";
import { useRouter } from "vue-router";

const { lastDonations, loadingLastDonations, loadLastDonations, errorLastDonations } = inject('lastDonations')
const router = useRouter()

// Formateador de moneda
function formatCurrency(value) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value);
}

onMounted(() => {
    setTimeout(() => {
        if (loadingLastDonations.value) return
        loadLastDonations();
    }, 100)
})
</script>

<template>
    <div class="flex flex-col col-span-12 lg:col-span-6 gap-y-10">
        <div>
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium dark:text-slate-200">Actividad de donaciones</div>
            </div>

            <div class="p-5 mt-3.5 box box--stacked" id="donationsList">
                <!-- Total de donaciones -->
                <div class="pb-5 mb-5 border-b border-dashed border-slate-300/70">
                    <div class="flex flex-col gap-3 sm:items-center sm:flex-row">
                        <div>
                            <div class="flex items-center">
                                <div class="text-xl font-medium text-success">
                                    {{ formatCurrency(lastDonations?.total_donations || 0) }}
                                </div>
                            </div>
                            <div class="mt-1 text-slate-500 dark:text-slate-400">Donaciones recientes</div>
                        </div>
                        <div class="sm:ml-auto">

                            <Button variant="outline-success" class="w-full text-success" @click="() => {
                                router.push({ name: 'donations' })
                            }">
                                <Lucide icon="ExternalLink" class="w-6 h-4 mr-2" />
                                Ver más detalles
                            </Button>
                        </div>
                    </div>
                </div>

                <!-- Estado de carga -->
                <div v-if="loadingLastDonations" class="flex justify-center items-center p-5">
                    <LoadingIcon icon="tail-spin" class="stroke-[1.3] w-6 h-6" color="black" />
                </div>

                <!-- Error en la carga -->
                <div v-if="errorLastDonations" class="text-red-500 text-center p-5">
                    Ocurrió un error al cargar las donaciones.
                </div>

                <!-- Lista vacía de donaciones -->
                <div v-if="!loadingLastDonations && !errorLastDonations && lastDonations?.last_donations?.length === 0"
                    class="text-slate-500 text-center p-5">
                    No hay donaciones recientes.
                </div>

                <!-- Mostrar lista de donaciones si se cargan correctamente y no está vacía -->
                <template v-if="!loadingLastDonations && !errorLastDonations && lastDonations?.last_donations?.length">
                    <div class="flex flex-col gap-5">
                        <template v-for="donation in lastDonations.last_donations" :key="donation.donations_id">
                            <div class="flex items-center">
                                <!-- Primer elemento con menor espacio (ícono de donación) -->
                                <div class="flex-[0.1]">
                                    <div :class="[
                                        'group flex items-center justify-center w-[2.5rem] h-[2.5rem] border rounded-full',
                                        '[&.success]:border-success/10 [&.success]:bg-success/10',
                                        'success'
                                    ]">
                                        <Lucide icon="DollarSign" :class="[
                                            'w-[1.15rem] h-[1.15rem]',
                                            'group-[.success]:text-success group-[.success]:fill-success/10',
                                        ]" />
                                    </div>
                                </div>

                                <!-- Elemento central con mayor espacio (concepto de donación) -->
                                <div class="ml-3.5 flex flex-[0.8] flex-col gap-y-1 min-w-0">
                                    <div class="font-medium whitespace-nowrap dark:text-slate-200">
                                        {{ formatCurrency(donation.donations_quantity) }}
                                    </div>
                                    <div class="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {{ donation.donations_concept }}
                                    </div>
                                </div>

                                <!-- Último elemento con menor espacio (etiqueta de donación) -->
                                <span :class="[
                                    'flex-[0.1] sm:ml-auto mr-auto sm:mr-0 group flex items-center text-xs font-medium rounded-lg border px-2.5 py-1',
                                    '[&.success]:border-success/10 [&.success]:bg-success/10 [&.success]:text-success',
                                    'success'
                                ]">

                                    <div :class="[
                                        'w-1 h-1 mr-1.5 rounded-full border',
                                        'group-[.success]:border-success/50 group-[.success]:bg-success/50',
                                    ]"></div>
                                    <span class="-mt-px">Donación</span>
                                </span>
                            </div>
                        </template>

                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
