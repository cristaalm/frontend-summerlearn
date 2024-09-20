<script setup>
import Lucide from "@/components/base/Lucide"
import Button from "@/components/base/Button"
import Alert from '@/components/base/Alert'
import LoadingIcon from "@/components/base/LoadingIcon";
import { FormInput, FormSelect } from "@/components/base/Form"
import { useRouter } from "vue-router"
import { useValidationAddArea } from "@/hooks/areas/addArea/useValidationAddArea"
import { useSetArea } from "@/hooks/areas/addArea"
import { useUsers } from "@/hooks/users/useUsers"
import { onMounted } from "vue"

const { users, loading, error, loadUsers } = useUsers();
const { validate, valid, status, name, responsable } = useValidationAddArea()
const { setAreaLoading, setAreaError, addArea } = useSetArea()

const router = useRouter()

onMounted(() => {
    loadUsers()
})

const handleRegister = () => {
    if (valid.value) {
        const area = {
            name: name.value,
            user: responsable.value
        }
        addArea({ area })
    }
}

</script>

<template>
    <div class="grid grid-cols-12 gap-y-10 gap-x-6">
        <div class="col-span-12 sm:col-span-10 sm:col-start-2">
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium group-[.mode--light]:text-white">
                    Agregar Area
                </div>
                <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                    <Button variant="primary"
                        class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
                        @click="() => {
                            router.push({
                                name: 'areas',
                            })
                        }">
                        <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
                    </Button>
                </div>
            </div>
            <div class="mt-7">
                <div class="flex flex-col box box--stacked">
                    <div class="p-7">

                        <!--? ######################### ALERTA DE ERROR ######################### -->

                        <Alert variant="outline-danger" v-if="setAreaError"
                            class="flex items-center px-4 py-3 my-7 bg-danger/5 border-danger/20 rounded-[0.6rem] leading-[1.7]"
                            v-slot="{ dismiss }">
                            <div class="">
                                <Lucide icon="AlertTriangle"
                                    class="stroke-[0.8] stroke-danger w-7 h-7 mr-2 fill-danger/10" />
                            </div>
                            <div class="ml-1 mr-8">
                                <span class="text-danger">{{ setAreaError }}</span>
                            </div>
                            <Alert.DismissButton type="button" class="btn-close text-danger" @click="dismiss"
                                aria-label="Cerrar">
                                <Lucide icon="X" class="w-5 h-5" />
                            </Alert.DismissButton>
                        </Alert>

                        <!--? ######################### INPUTS ######################### -->

                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Nombre del area</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                            Required
                                        </div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Porfavor ingrese el nombre del area
                                    </div>
                                </div>
                            </label>
                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput type="text" placeholder="Matematicas, Ciencias, etc." v-model="name"
                                    @input="(e) => validate(e, 'name')" />
                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.name.message }}
                                </div>
                            </div>
                        </div>

                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Responsabe</div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Porfavor seleccione el responsable del area
                                    </div>
                                </div>
                            </label>

                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormSelect v-model="responsable" @input="(e) => validate(e, 'responsable')">

                                    <template v-if="loading">
                                        <option value="" disabled selected>
                                            Cargando...
                                        </option>
                                    </template>

                                    <template v-else-if="error">
                                        <option value="" disabled selected>
                                            Error al cargar los responsables
                                        </option>
                                    </template>

                                    <template v-else>
                                        <option value="" disabled selected>
                                            Seleccione un responsable
                                        </option>
                                        <template v-for="(user) in users" :key="user.id">
                                            <option :value="user.id">
                                                {{ user.name }} ({{ user.email }})
                                            </option>
                                        </template>
                                    </template>

                                </FormSelect>
                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.responsable.message }}
                                </div>
                            </div>
                        </div>

                    </div>

                    <!--? ######################### BOTON DE REGISTRO ######################### -->

                    <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
                        <Button
                            :class="`w-full px-10 md:w-auto font-bold ${setAreaLoading || !valid ? 'border-gray-500 text-gray-500' : 'border-green text-green'}`"
                            @click="handleRegister" :disabled="!valid || setAreaLoading">

                            <LoadingIcon v-if="setAreaLoading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                                color="black" />

                            <Lucide v-if="!setAreaLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
                            {{ setAreaLoading ? 'Registrando...' : 'Registrar' }}

                        </Button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
