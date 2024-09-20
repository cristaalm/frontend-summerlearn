<script setup>
import Lucide from "@/components/base/Lucide";
import { Menu } from "@/components/base/Headless";
import TinySlider from "@/components/base/TinySlider";
import { getColor } from "@/utils/colors";
import ReportLineChart from "@/components/ReportLineChart";
import ReportDonutChart3 from "@/components/ReportDonutChart3";
import Button from "@/components/base/Button";
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDonations } from '@/hooks/donations/'
import LoadingIcon from '@/components/base/LoadingIcon'

const router = useRouter()
const { barDonations, donations, loading, loadDonations } = useDonations();

onMounted(() => {
    loadDonations();
});


</script>

<template>
    <div class="grid grid-cols-12 gap-y-10 gap-x-6">
        <div class="col-span-12">
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium group-[.mode--light]:text-white">
                    Donaciones
                </div>

                <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                    <Button variant="primary" @click="() => router.push({ name: 'addDonation' })"
                        class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
                        <Lucide icon="DollarSign" class="stroke-[1.3] w-4 h-4 mr-2" />
                        Nueva Donacion
                    </Button>
                </div>
            </div>
            <div class="flex flex-col gap-8 mt-3.5">

                <!--? contenedor de cards -->

                <div class="grid grid-cols-12 gap-5 mt-3.5">

                    <!--? Card -->

                    <div class="col-span-12 p-1 md:col-span-6 2xl:col-span-3 box box--stacked">
                        <div
                            class="-mx-1 overflow-hidden h-[244px] [&_.tns-outer_.tns-nav]:bottom-auto [&_.tns-outer_.tns-nav]:w-auto [&_.tns-outer_.tns-nav]:ml-5 [&_.tns-outer_.tns-nav]:mt-5 [&_.tns-outer_.tns-nav_button]:w-2 [&_.tns-outer_.tns-nav_button]:h-2 [&_.tns-outer_.tns-nav_button.tns-nav-active]:w-5 [&_.tns-outer_.tns-nav_button]:mx-0.5 [&_.tns-outer_.tns-nav_button]:bg-white/40 [&_.tns-outer_.tns-nav_button.tns-nav-active]:bg-white/70">
                            <TinySlider :options="{ mode: 'gallery', nav: true }">
                                <div class="px-1">
                                    <div
                                        class="overflow-hidden relative flex flex-col w-full h-full p-5 rounded-[0.5rem] bg-gradient-to-b from-theme-2/90 to-theme-1/[0.85]">
                                        <Lucide icon="Medal"
                                            class="absolute top-0 right-0 w-36 h-36 -mt-5 -mr-5 text-white/20 fill-white/[0.03] transform rotate-[-10deg] stroke-[0.3]" />
                                        <div class="mt-12 mb-9">
                                            <div class="text-2xl font-medium leading-snug text-white">
                                                Estadiscas De
                                                <br />
                                                Donaciones
                                            </div>
                                            <div class="mt-1.5 text-lg text-white/70">
                                                Aumente su rendimiento
                                            </div>
                                        </div>
                                        <a class="flex items-center font-medium text-white" href="">
                                            Upgrade now
                                            <Lucide icon="MoveRight" class="w-4 h-4 ml-1.5" />
                                        </a>
                                    </div>
                                </div>
                            </TinySlider>
                        </div>
                    </div>

                    <!--? Card -->

                    <div class="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
                        <Menu class="absolute top-0 right-0 mt-5 mr-5">
                            <Menu.Button class="w-5 h-5 text-slate-500">
                                <Lucide icon="MoreVertical" class="w-6 h-6 stroke-slate-400/70 fill-slate-400/70" />
                            </Menu.Button>
                            <Menu.Items class="w-40">
                                <Menu.Item>
                                    <Lucide icon="Copy" class="w-4 h-4 mr-2" /> Copy Link
                                </Menu.Item>
                                <Menu.Item>
                                    <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                                    Delete
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                        <div class="flex items-center">
                            <div
                                class="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                                <Lucide icon="Database" class="w-6 h-6 text-primary fill-primary/10" />
                            </div>
                            <div class="ml-4">
                                <div class="text-base font-medium">Picos De Donaciones</div>
                                <div class="text-slate-500 mt-0.5">Ultimos 20 Dias</div>
                            </div>
                        </div>
                        <div class="relative mt-5 mb-6 overflow-hidden">

                            <div
                                class="absolute inset-0 h-px my-auto tracking-widest text-slate-400/60 whitespace-nowrap leading-[0] text-xs">
                                .......................................................................
                            </div>

                            <ReportLineChart class="relative z-10 -ml-1.5" :height="100" :index="2"
                                :borderColor="() => getColor('primary')"
                                :backgroundColor="() => getColor('primary', 0.3)" />
                        </div>

                        <div class="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-primary/70"></div>
                                <div class="ml-2.5">Dinero</div>
                            </div>
                            <!-- <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                                <div class="ml-2.5">Store Locations</div>
                            </div> -->
                        </div>
                    </div>

                    <!--? Card -->
                    <!-- 
                    <div class="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
                        <Menu class="absolute top-0 right-0 mt-5 mr-5">
                            <Menu.Button class="w-5 h-5 text-slate-500">
                                <Lucide icon="MoreVertical" class="w-6 h-6 stroke-slate-400/70 fill-slate-400/70" />
                            </Menu.Button>
                            <Menu.Items class="w-40">
                                <Menu.Item>
                                    <Lucide icon="Copy" class="w-4 h-4 mr-2" /> Copy Link
                                </Menu.Item>
                                <Menu.Item>
                                    <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                                    Delete
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                        <div class="flex items-center">
                            <div
                                class="flex items-center justify-center w-12 h-12 border rounded-full border-success/10 bg-success/10">
                                <Lucide icon="Files" class="w-6 h-6 text-success fill-success/10" />
                            </div>
                            <div class="ml-4">
                                <div class="text-base font-medium">36k Products Shipped</div>
                                <div class="text-slate-500 mt-0.5">Across 14 warehouses</div>
                            </div>
                        </div>
                        <div class="relative mt-5 mb-6 overflow-hidden">
                            <div
                                class="absolute inset-0 h-px my-auto tracking-widest text-slate-400/60 whitespace-nowrap leading-[0] text-xs">
                                .......................................................................
                            </div>
                            <ReportLineChart class="relative z-10 -ml-1.5" :height="100" :index="0"
                                :borderColor="() => getColor('success')"
                                :backgroundColor="() => getColor('success', 0.3)" />
                        </div>
                        <div class="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-success/70"></div>
                                <div class="ml-2.5">Total Shipped</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                                <div class="ml-2.5">Warehouses</div>
                            </div>
                        </div>
                    </div> -->

                    <!--? Card -->

                    <div class="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
                        <Menu class="absolute top-0 right-0 mt-5 mr-5">
                            <Menu.Button class="w-5 h-5 text-slate-500">
                                <Lucide icon="MoreVertical" class="w-6 h-6 stroke-slate-400/70 fill-slate-400/70" />
                            </Menu.Button>
                            <Menu.Items class="w-40">
                                <Menu.Item>
                                    <Lucide icon="Copy" class="w-4 h-4 mr-2" /> Copy Link
                                </Menu.Item>
                                <Menu.Item>
                                    <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                                    Delete
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                        <div class="flex items-center">
                            <div
                                class="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                                <Lucide icon="Zap" class="w-6 h-6 text-primary fill-primary/10" />
                            </div>
                            <div class="ml-4">
                                <div class="text-base font-medium">Rendimiento</div>
                                <div class="text-slate-500 mt-0.5">En 9 Dias</div>
                            </div>
                        </div>
                        <div class="relative mt-5 mb-6">
                            <ReportDonutChart3 class="relative z-10" :height="100" />
                        </div>
                        <div class="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-primary/70"></div>
                                <div class="ml-2.5">Order Volume</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-danger/70"></div>
                                <div class="ml-2.5">Coverage Area</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--? contenedor de las estadisticas de usuarios -->

                <div class="flex flex-col p-5 box box--stacked">
                    <div class="grid grid-cols-4 gap-5">
                        <div
                            class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                            <div class="text-base text-slate-500">Total de Donaciones</div>
                            <div class="mt-1.5 text-2xl font-medium">
                                <div v-if="loading" class="w-full h-4 mt-4">
                                    <LoadingIcon icon="three-dots" color="gray" />
                                </div>
                                {{ !loading ? `${barDonations.totalDonated} veces` : '' }}
                            </div>
                            <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                            </div>
                        </div>
                        <div
                            class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                            <div class="text-base text-slate-500">Dinero Donado</div>
                            <div class="mt-1.5 text-2xl font-medium">
                                <div v-if="loading" class="w-full h-4 mt-4">
                                    <LoadingIcon icon="three-dots" color="gray" />
                                </div>
                                {{ !loading ? `$ ${barDonations.totalDonations}` : '' }}
                            </div>
                            <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                            </div>
                        </div>
                        <div
                            class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                            <div class="text-base text-slate-500">Ultima Cantidad Donada</div>
                            <div class="mt-1.5 text-2xl font-medium">
                                <div v-if="loading" class="w-full h-4 mt-4">
                                    <LoadingIcon icon="three-dots" color="gray" />
                                </div>
                                {{ !loading ? `$ ${barDonations.lastDonationAmount}` : '' }}
                            </div>
                            <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                            </div>
                        </div>
                        <div
                            class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                            <div class="text-base text-slate-500">Ultima Fecha de Donacion</div>
                            <div class="mt-1.5 text-2xl font-medium">
                                <div v-if="loading" class="w-full h-4 mt-4">
                                    <LoadingIcon icon="three-dots" color="gray" />
                                </div>
                                {{ !loading ? barDonations.lastDonationDate : '' }}
                            </div>
                            <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>