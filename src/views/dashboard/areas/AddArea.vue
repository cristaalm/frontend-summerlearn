<script setup>
import Lucide from "@/components/base/Lucide"
import Button from "@/components/base/Button"
import { FormInput, FormSelect } from "@/components/base/Form"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useValidationAddArea } from "@/hooks/areas/useValidationAddArea"

const { validate, valid, status, name, responsable } = useValidationAddArea()


const router = useRouter()

const responsables = ref([
    {
        id: 1,
        name: "Juan Perez",
    },
    {
        id: 2,
        name: "Maria Lopez",
    },
    {
        id: 3,
        name: "Pedro Ramirez",
    },
])

const handleRegister = () => {
    if (valid.value) {
        console.log("Registrado")
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
                                    <template v-for="(responsable) in responsables" :key="responsable.id">
                                        <option :value="responsable.id">
                                            {{ responsable.name }}
                                        </option>
                                    </template>
                                </FormSelect>
                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.responsable.message }}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
                        <Button :variant="`outline-success`" class="w-full px-10 md:w-auto border-primary/50"
                            @click="handleRegister" :disabled="!valid">
                            <Lucide icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" /> Registrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
