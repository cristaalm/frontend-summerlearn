<script setup>
import { FormInput, FormSelect } from "@/components/base/Form";
import { Dialog } from "@/components/base/Headless";
import { useArea } from "@/hooks/areas/editArea/useArea";
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from "@/components/base/Button";
import Lucide from "@/components/base/Lucide";
import { ref, inject, watch, onUnmounted } from "vue";

// obtenemos las props del componente padre
const props = defineProps({
    ModalEditArea: Boolean,
    setModalEditArea: Function,
    infoArea: Object
})

const { users, loadingUsers, errorUsers } = inject('cordinator')
const newArea = ref(null)
const { updateArea, loadingEditArea } = useArea()

const selectedUser = ref(null)
const nameArea = ref('')
const valid = ref(false)

//debug de los campos
watch([() => nameArea.value, () => selectedUser.value], (newVal) => {
    if (newVal[0] !== props.infoArea.name || newVal[1] !== props.infoArea.user.id) {
        valid.value = true
    } else {
        valid.value = false
    }
    newArea.value = {
        name: nameArea.value,
        user: selectedUser.value
    }
})


watch(() => props.infoArea, (newVal) => {
    if (newVal) {
        nameArea.value = newVal.name
        selectedUser.value = newVal.user.id
    }
})

const handleUpdateArea = () => {
    updateArea({ area: props.infoArea, newArea: newArea, setModalEditArea: props.setModalEditArea })
}

</script>

<template>

    <!-- BEGIN: Large Modal Content -->
    <Dialog size="xl" :open="ModalEditArea" @close="() => {
        if (loadingEditArea) return
        setModalEditArea({ open: false });
    }
        ">
        <Dialog.Panel class="text-center flex flex-col">
            <div
                class="flex flex-row px-10 py-5  justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b">
                <h2 class="text-2xl font-bold text-black dark:text-slate-200">Editar Área</h2>
                <Lucide icon="XCircle" class="w-10 h-full text-danger cursor-pointer dark:text-red-500" @click="() => {
                    if (loadingEditArea) return
                    setModalEditArea({ open: false })
                }" />
            </div>

            <div class="flex flex-col">
                <div class="dark:border-slate-600 border-slate-300 border-b">


                    <div
                        class="flex-col block py-5 my-5 sm:flex  mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
                        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                            <div class="text-left">
                                <div class="flex items-center">
                                    <div class="font-medium text-black dark:text-slate-200 ">Nombre del área</div>
                                </div>
                                <div
                                    class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                                    Por favor, ingrese el nombre del área.
                                </div>
                            </div>
                        </label>
                        <div class="flex-1 w-full mt-3">
                            <FormInput v-model="nameArea" class="flex-1 mt-2 dark:text-slate-200"
                                @keydown.enter.prevent="() => {
                                    if (valid && !loadingEditArea) handleUpdateArea()
                                }" />
                        </div>
                    </div>


                    <div
                        class="py-5 my-5 flex flex-row justify-between mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
                        <label class="mb-0 text-right mr-14 w-2/4">
                            <div class="text-left">
                                <div class="flex items-center">
                                    <div class="font-medium text-black dark:text-slate-200 ">Responsable del área</div>
                                </div>
                                <div
                                    class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                                    Por favor, seleccione el responsable.
                                </div>
                            </div>
                        </label>
                        <div class=" w-2/6 mt-3 xl:mt-0">
                            <FormSelect v-model="selectedUser" class="flex-1 mt-2 dark:text-slate-200"
                                @keydown.enter.prevent="() => {
                                    if (valid && !loadingEditArea) handleUpdateArea()
                                }">
                                <!--? Mostrar 'Cargando roles...' cuando loadingUsers es true -->
                                <template v-if="loadingUsers">
                                    <option :value="infoArea.user.id">Cargando roles...</option>
                                </template>

                                <!--? Mostrar mensaje de error cuando hay errorRoles -->
                                <template v-if="errorUsers">
                                    <option :value="infoArea.user.id">Error al cargar roles</option>
                                </template>

                                <!--? Mostrar los roles cuando no está cargando y no existe ningun errorRoles -->
                                <template v-if="!loadingUsers">
                                    <template v-for="user in users" :key="user.id">
                                        <option :value="user.id">{{ user.name }}</option>
                                    </template>
                                </template>
                            </FormSelect>
                        </div>
                    </div>

                </div>

                <div class="flex py-5 md:justify-end px-7">
                    <Button variant="outline-success" class="w-full px-10 md:w-auto dark:text-slate-200"
                        @click="handleUpdateArea" :disabled="loadingEditArea || !valid">
                        <Lucide v-if="!loadingEditArea" icon="Save"
                            class="stroke-[1.3] w-4 h-4 mr-2 -ml-2 text-success dark:text-slate-200" />
                        <LoadingIcon v-if="loadingEditArea" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                            color="black" />
                        {{ loadingEditArea ? 'Guardando cambios...' : 'Guardar cambios' }}
                    </Button>
                </div>
            </div>

        </Dialog.Panel>
    </Dialog>
    <!-- END: Large Modal Content -->

</template>