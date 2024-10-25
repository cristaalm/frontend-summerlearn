<script setup>


</script>

<template>
    <div class="flex flex-col col-span-12 md:col-span-6 lg:col-span-8 gap-2 p-5 box box--stacked">
        <div
            class="flex flex-col p-5 border border-dashed rounded-lg gap-y-8 lg:items-center lg:flex-row bg-slate-50/60 dark:bg-transparent dark:border-none">
            <div class="relative flex flex-col gap-5 lg:gap-8">
                <div>
                    <div class="text-xs uppercase text-slate-500 dark:text-slate-400">
                        Total por año
                    </div>
                    <div class="mt-1.5 text-lg font-medium text-primary dark:text-slate-200">
                        $74,264.01 MXN
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col  md:grid md:grid-cols-4 w-full gap-2">


            <div
                class="border border-dashed rounded-[0.6rem] border-slate-300/80 dark:border-slate-500 col-span-4 xl:col-span-2">
                <!-- <template> V-for para mostrar varios elementos -->
                <div
                    class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                    <div>
                        <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
                            Alfredo Elizandí
                        </div>
                        <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
                            Donaciones
                        </div>
                        <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            31 de febrero 2024
                        </div>
                    </div>
                    <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
                        $500 MXN
                    </div>
                </div>
                <!-- </template> -->

                <!-- ############### Ejemplos de mas elementos ############ -->
                <div
                    class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                    <div>
                        <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
                            Alfredo Elizandí
                        </div>
                        <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
                            Donaciones
                        </div>
                        <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            31 de febrero 2024
                        </div>
                    </div>
                    <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
                        $500 MXN
                    </div>
                </div>
                <div
                    class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                    <div>
                        <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
                            Alfredo Elizandí
                        </div>
                        <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
                            Donaciones
                        </div>
                        <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            31 de febrero 2024
                        </div>
                    </div>
                    <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
                        $500 MXN
                    </div>
                </div>

            </div>


            <!--  ############ Segunda lista de elementos ########### -->

            <div
                class="md:hidden xl:grid border border-dashed rounded-[0.6rem] border-slate-300/80 dark:border-slate-500 col-span-2">
                <!-- <template> V-for para mostrar varios elementos -->
                <div
                    class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                    <div>
                        <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
                            Alfredo Elizandí
                        </div>
                        <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
                            Donaciones
                        </div>
                        <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            31 de febrero 2024
                        </div>
                    </div>
                    <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
                        $500 MXN
                    </div>
                </div>
                <!-- </template> -->
                <div
                    class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                    <div>
                        <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
                            Alfredo Elizandí
                        </div>
                        <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
                            Donaciones
                        </div>
                        <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            31 de febrero 2024
                        </div>
                    </div>
                    <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
                        $500 MXN
                    </div>
                </div>
                <div
                    class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                    <div>
                        <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
                            Alfredo Elizandí
                        </div>
                        <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
                            Donaciones
                        </div>
                        <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            31 de febrero 2024
                        </div>
                    </div>
                    <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
                        $500 MXN
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>