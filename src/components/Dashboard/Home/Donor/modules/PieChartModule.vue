<script setup>
import Lucide from '@/components/base/Lucide'
import ReportDonutChart5 from "@/components/ReportDonutChart5";
import Button from "@/components/base/Button";
import { Tab } from "@/components/base/Headless";
</script>

<template>
    <div class="flex flex-col col-span-12 p-5 md:col-span-6 lg:col-span-4 box box--stacked">
        <Tab.Group class="mt-1">
            <Tab.List variant="boxed-tabs"
                class="w-3/4 mx-auto bg-white dark:bg-slate-600 shadow-sm rounded-[0.6rem] border-slate-200">
                <Tab
                    class="bg-slate-50 dark:bg-slate-600 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current dark:[&[aria-selected='true']_button]:text-slate-200">
                    <Tab.Button class="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] dark:text-slate-400 "
                        as="button">
                        Diarios
                    </Tab.Button>
                </Tab>
                <Tab
                    class="bg-slate-50 dark:bg-slate-600 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current dark:[&[aria-selected='true']_button]:text-slate-200">
                    <Tab.Button class="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] dark:text-slate-400 "
                        as="button">
                        Semenales
                    </Tab.Button>
                </Tab>
                <Tab
                    class="bg-slate-50 dark:bg-slate-600 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current dark:[&[aria-selected='true']_button]:text-slate-200">
                    <Tab.Button class="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] dark:text-slate-400 "
                        as="button">
                        Mensuales
                    </Tab.Button>
                </Tab>
            </Tab.List>

            <!-- ! Grafica Diaria ! -->

            <Tab.Panels class="mt-8">
                <Tab.Panel>
                    <div class="[&>div]:!h-[200px] [&>div]:sm:!h-[160px] [&>div]:2xl:!h-[200px] relative w-4/5 mx-auto">
                        <ReportDonutChart5 class="relative z-10" :height="200" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-lg font-medium text-slate-600/90 dark:text-slate-200">
                                    781,224
                                </div>
                                <div class="mt-1 text-slate-500 dark:text-slate-200">Total de gastos
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center mt-7 gap-y-3 gap-x-5">
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60">
                            </div>
                            Servicios publicos
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-success/60 bg-success/60">
                            </div>
                            Profesores
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-warning/60 bg-warning/60">
                            </div>
                            Materiales
                        </div>
                    </div>
                    <Button
                        class="w-full border-dashed mt-9 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-600/50 dark:text-slate-200">
                        <Lucide icon="ExternalLink" class="stroke-[1.3] w-4 h-4 mr-2 " />
                        Export Report
                    </Button>
                </Tab.Panel>
            </Tab.Panels>

            <!-- ! Grafica Semanal ! -->

            <Tab.Panels class="mt-8">
                <Tab.Panel>
                    <div class="[&>div]:!h-[200px] [&>div]:sm:!h-[160px] [&>div]:2xl:!h-[200px] relative w-4/5 mx-auto">
                        <ReportDonutChart5 class="relative z-10" :height="200" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-lg font-medium text-slate-600/90 dark:text-slate-200">
                                    781,224
                                </div>
                                <div class="mt-1 text-slate-500 dark:text-slate-200">Total de gastos
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center mt-7 gap-y-3 gap-x-5">
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60">
                            </div>
                            Servicios publicos
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-success/60 bg-success/60">
                            </div>
                            Profesores
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-warning/60 bg-warning/60">
                            </div>
                            Materiales
                        </div>
                    </div>
                    <Button
                        class="w-full border-dashed mt-9 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-600/50 dark:text-slate-200">
                        <Lucide icon="ExternalLink" class="stroke-[1.3] w-4 h-4 mr-2 " />
                        Export Report
                    </Button>
                </Tab.Panel>
            </Tab.Panels>

            <!-- ! Grafica Mensual ! -->

            <Tab.Panels class="mt-8 mb-8">
                <Tab.Panel>
                    <div class="[&>div]:!h-[200px] [&>div]:sm:!h-[160px] [&>div]:2xl:!h-[200px] relative w-4/5 mx-auto">
                        <ReportDonutChart5 class="relative z-10" :height="200" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-lg font-medium text-slate-600/90 dark:text-slate-200">
                                    781,224
                                </div>
                                <div class="mt-1 text-slate-500 dark:text-slate-200">Total de gastos
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center mt-7 gap-y-3 gap-x-5">
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60">
                            </div>
                            Servicios publicos
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-success/60 bg-success/60">
                            </div>
                            Profesores
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-warning/60 bg-warning/60">
                            </div>
                            Materiales
                        </div>
                    </div>
                    <Button
                        class="w-full border-dashed mt-9 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-600/50 dark:text-slate-200">
                        <Lucide icon="ExternalLink" class="stroke-[1.3] w-4 h-4 mr-2 " />
                        Export Report
                    </Button>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
</template>