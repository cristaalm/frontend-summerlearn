<script setup>
import Lucide from "@/components/base/Lucide";
import Button from "@/components/base/Button";
import LoadingIcon from "@/components/base/LoadingIcon";
import { useRouter } from "vue-router";
import { onMounted, watch, inject } from "vue";

const router = useRouter();
const { countUsers, loadingCountUsers, loadCountUsers } = inject("countUsers");

onMounted(() => {
    setTimeout(() => {
        if (loadingCountUsers.value) return;
        loadCountUsers();
    }, 100);
});
</script>
<template>
    <div class="col-span-12">
        <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div class="text-base font-medium 2xl:group-[.mode--light]:text-white dark:text-slate-200">
                Usuarios
            </div>
        </div>
        <div class="mt-3.5 box box--stacked" id="usersStats">
            <div
                class="grid grid-cols-2 px-5 py-10 border-b dark:border-slate-500 sm:grid-cols-3 md:grid-cols-3 gap-y-5 lg:grid-cols-6">

                <!-- ? Administradores ? -->

                <div class="flex flex-col items-center">
                    <div
                        class="relative flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                        <Lucide icon="Shield" class="w-6 h-6 text-primary fill-primary/10 dark:text-primary"
                            v-if="!loadingCountUsers" />
                        <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6"
                            color="black" />
                        <div class="absolute -bottom-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium text-primary dark:text-slate-200 bg-white dark:bg-slate-500 rounded-full"
                            v-if="!loadingCountUsers">
                            {{ countUsers.Administrador }}
                        </div>
                    </div>
                    <div class="mt-3 text-slate-500 dark:text-slate-200">Administradores</div>
                </div>

                <!-- ? Coordinadores ? -->

                <div class="flex flex-col items-center">
                    <div
                        class="relative flex items-center justify-center w-12 h-12 border rounded-full border-info/10 bg-info/10">
                        <Lucide icon="UserCog" class="w-6 h-6 text-info fill-info/10 dark:text-info"
                            v-if="!loadingCountUsers" />
                        <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6"
                            color="black" />
                        <div class="absolute -bottom-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium text-info dark:text-slate-200 bg-white dark:bg-slate-500 rounded-full"
                            v-if="!loadingCountUsers">
                            {{ countUsers.Coordinador }}
                        </div>
                    </div>
                    <div class="mt-3 text-slate-500 dark:text-slate-200">Coordinadores</div>
                </div>

                <!-- ? Donadores ? -->

                <div class="flex flex-col items-center">
                    <div
                        class="relative flex items-center justify-center w-12 h-12 border rounded-full border-success/10 bg-success/10">
                        <Lucide icon="User" class="w-6 h-6 text-success fill-success/10 dark:text-success"
                            v-if="!loadingCountUsers" />
                        <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6"
                            color="black" />
                        <div class="absolute -bottom-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium text-success dark:text-slate-200 bg-white dark:bg-slate-500 rounded-full"
                            v-if="!loadingCountUsers">
                            {{ countUsers.Donante }}
                        </div>
                    </div>
                    <div class="mt-3 text-slate-500 dark:text-slate-200">Donadores</div>
                </div>

                <!-- ? Voluntarios ? -->

                <div class="flex flex-col items-center">
                    <div
                        class="relative flex items-center justify-center w-12 h-12 border rounded-full border-warning/10 bg-warning/10">
                        <Lucide icon="UserCheck" class="w-6 h-6 text-warning fill-warning/10 dark:text-warning"
                            v-if="!loadingCountUsers" />
                        <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6"
                            color="black" />
                        <div class="absolute -bottom-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium text-warning dark:text-slate-200 bg-white dark:bg-slate-500 rounded-full"
                            v-if="!loadingCountUsers">
                            {{ countUsers.Voluntario }}
                        </div>
                    </div>
                    <div class="mt-3 text-slate-500 dark:text-slate-200">Voluntarios</div>
                </div>

                <!-- ? Beneficiarios ? -->

                <div class="flex flex-col items-center">
                    <div
                        class="relative flex items-center justify-center w-12 h-12 border rounded-full border-gray-500/40 bg-slate-600/40 dark:border-secondary/10 dark:bg-secondary/10">
                        <Lucide icon="Users" class="w-6 h-6  fill-secondary/10 text-white dark:text-secondary"
                            v-if="!loadingCountUsers" />
                        <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6"
                            color="black" />
                        <div class="absolute -bottom-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium text-slate-400 dark:text-slate-200 bg-white dark:bg-slate-500 rounded-full"
                            v-if="!loadingCountUsers">
                            {{ countUsers.Beneficiario }}
                        </div>
                    </div>
                    <div class="mt-3 text-slate-500 dark:text-slate-200">Beneficiarios</div>
                </div>

                <!-- ? Pendientes ? -->

                <div class="flex flex-col items-center">
                    <div
                        class="relative flex items-center justify-center w-12 h-12 border rounded-full border-danger/10 bg-danger/10">
                        <Lucide icon="UserX" class="w-6 h-6 text-danger fill-danger/10 dark:text-danger"
                            v-if="!loadingCountUsers" />
                        <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6"
                            color="black" />
                        <div class="absolute -bottom-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium text-danger dark:text-slate-200 bg-white dark:bg-slate-500 rounded-full"
                            v-if="!loadingCountUsers">
                            {{ countUsers.Inactivo }}
                        </div>
                    </div>
                    <div class="mt-3 text-slate-500 dark:text-slate-200">No activos </div>
                </div>

            </div>
            <div
                class="flex flex-col items-center gap-2 px-6 pt-5 pb-6 rounded-b-lg md:flex-row bg-slate-50 dark:bg-[#28334e]">
                <div class="flex items-center justify-center w-12 h-12 border rounded-full border-info/10 bg-info/10">
                    <Lucide icon="Box" class="w-6 h-6 text-info fill-info/10" v-if="!loadingCountUsers" />
                    <LoadingIcon v-if="loadingCountUsers" icon="tail-spin" class="stroke-[1.3] w-6 h-6" color="black" />
                </div>
                <div class="text-center md:text-left">
                    <div class="mt-1 text-lg font-medium dark:text-slate-200">Total</div>
                    <div class="hidden lg:block mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                        {{ loadingCountUsers ? "Cargando..." :
                            countUsers.Total + " usuarios registrados en total en la plataforma." }}
                    </div>
                    <div class="block lg:hidden mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                        {{ loadingCountUsers ? "Cargando..." :
                            countUsers.Total + " usuarios registrados." }}
                    </div>
                </div>
                <div class="flex flex-col w-full sm:w-auto sm:flex-row md:ml-auto">
                    <Button variant="outline-primary" rounded class="w-full xl:w-56 text-blue-500" @click="() => {
                        router.push({ name: 'users' })
                    }">
                        <Lucide icon="ExternalLink" class="w-6 h-4 mr-2" />
                        Ver más detalles
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>