    <script setup>
    import ReportDonutChart5 from "@/components/ReportDonutChart5";
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

            </Tab.List>

            <!-- ! Grafica Diaria ! -->

            <Tab.Panels class="mt-8">
                <Tab.Panel>
                    <div class="[&>div]:!h-[200px] [&>div]:sm:!h-[160px] [&>div]:2xl:!h-[200px] relative w-4/5 mx-auto">
                        <ReportDonutChart5 class="relative z-10" :height="200" />

                    </div>
                    <br><br>
                    <div class="flex flex-wrap items-center justify-center mt-7 gap-y-3 gap-x-5">
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60">
                            </div>
                            Donaciones
                        </div>
                        <div class="flex items-center text-slate-500 dark:text-slate-200">
                            <div class="w-2 h-2 mr-2 border rounded-full border-success/60 bg-success/60">
                            </div>
                            Gastos
                        </div>

                    </div>
                </Tab.Panel>
            </Tab.Panels>


        </Tab.Group>
    </div>
</template>