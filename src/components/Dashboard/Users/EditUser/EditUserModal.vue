<script setup>
import {
    FormLabel,
    FormSwitch,
    FormInput,
    FormSelect,
} from "@/components/Base/Form";
import { Menu, Dialog } from "@/components/base/Headless";
import LoadingIcon from '@/components/base/LoadingIcon'
import TinySlider from "@/components/base/TinySlider";
import Button from "@/components/base/Button";
import Lucide from "@/components/base/Lucide";
import { ref, inject, watch, onMounted, onUnmounted } from "vue";
import { useRolUser } from '@/hooks/users/editUser/useRolUser'
import { Baseurl } from "@/utils/global";

// obtenemos las props del componente padre
const props = defineProps({
    ModalEditUser: Boolean,
    setModalEditUser: Function,
    infoUser: Object
})

const { roles, loadingRoles, errorRoles } = inject('roles')
const selectedRole = ref(null)
const { updateRol, loadingEditRol, successEditRol, errorEditRol } = useRolUser()

watch(() => props.infoUser, (newVal) => {
    if (newVal) {
        selectedRole.value = newVal.rol
    }
})

const handleUpdateRol = () => {
    updateRol({ user: props.infoUser, newRol: selectedRole, setModalEditUser: props.setModalEditUser })
}

onUnmounted(() => {
    props.infoUser = null
    selectedRole.value = null
    successEditRol.value = false
    errorEditRol.value = false
})

</script>

<template>

    <!-- BEGIN: Large Modal Content -->
    <Dialog size="lg" :open="ModalEditUser" @close="() => {
        if (loadingEditRol) return
        setModalEditUser({ open: false });
    }
        ">
        <Dialog.Panel class="text-center flex flex-col">
            <div
                class="flex flex-row px-10 py-5  justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b">
                <h2 class="text-2xl font-bold text-black dark:text-slate-200">Editar Usuario</h2>
                <Lucide icon="XCircle" class="w-10 h-full text-danger cursor-pointer dark:text-red-500" @click="() => {
                    if (loadingEditRol) return
                    setModalEditUser({ open: false })
                }" />
            </div>

            <div class="flex flex-col">
                <div class="flex flex-row px-10 pt-5 gap-5 justify-center items-center w-full">

                    <div class="relative">
                        <div class="w-12 h-12 overflow-hidden border-2 rounded-full image-fit border-slate-200/70">
                            <img alt="Tailwise - Admin Dashboard Template" :src="`${Baseurl}${infoUser.photo}`" />
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <span class="text-xl text-black dark:text-slate-200">{{ infoUser.name }}</span>
                        <span class="text-sm text-slate-500 dark:text-slate-400">{{ infoUser.email }}</span>
                    </div>

                </div>

                <div class="dark:border-slate-600 border-slate-300 border-b">
                    <div
                        class="flex-col block pt-5 my-5 xl:items-center sm:flex xl:flex-row mx-5 px-5 py-2 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
                        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                            <div class="text-left">
                                <div class="flex items-center">
                                    <div class="font-medium text-black dark:text-slate-200 ">Rol del usuario</div>
                                </div>
                                <div
                                    class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                                    Selecciona el rol del usuario.
                                </div>
                            </div>
                        </label>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                            <FormSelect v-model="selectedRole" class="flex-1 mt-2 dark:text-slate-200">
                                <!--? Mostrar 'Cargando roles...' cuando loadingRoles es true -->
                                <template v-if="loadingRoles">
                                    <option>Cargando roles...</option>
                                </template>

                                <!--? Mostrar mensaje de error cuando hay errorRoles -->
                                <template v-if="errorRoles">
                                    <option>Error al cargar roles</option>
                                </template>

                                <!--? Mostrar los roles cuando no está cargando y no existe ningun errorRoles -->
                                <template v-if="!loadingRoles">
                                    <template v-for="rol in roles" :key="rol.id">
                                        <option :value="rol.id">{{ rol.name }}</option>
                                    </template>
                                </template>
                            </FormSelect>
                        </div>
                    </div>

                </div>

                <div class="flex py-5 md:justify-end px-7">
                    <Button variant="outline-success" class="w-full px-10 md:w-auto dark:text-slate-200"
                        @click="handleUpdateRol" :disabled="loadingEditRol || selectedRole === infoUser.rol">
                        <Lucide v-if="!loadingEditRol" icon="Save"
                            class="stroke-[1.3] w-4 h-4 mr-2 -ml-2 text-success dark:text-slate-200" />
                        <LoadingIcon v-if="loadingEditRol" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                            color="black" />
                        {{ loadingEditRol ? 'Guardando cambios...' : 'Guardar cambios' }}
                    </Button>
                </div>
            </div>

        </Dialog.Panel>
    </Dialog>
    <!-- END: Large Modal Content -->

</template>