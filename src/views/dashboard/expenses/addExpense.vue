<script setup>
import Lucide from "@/components/base/Lucide";
import Button from "@/components/base/Button";
import TomSelect from "@/components/base/TomSelect";
import { FormInput, FormSelect, InputGroup } from "@/components/base/Form";
import { useStatus, useValidations, useRefs } from "@/hooks/bills/addBill";
import { useDonations } from "@/hooks/donations/";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const selectMultiple = ref([]);
const { concept, amount, donation } = useRefs();
const { status } = useStatus();
const { valid, validateInputAmount } = useValidations({ status, concept, amount, donation });
const { donations, loading, error, loadDonations } = useDonations();

onMounted(() => {
    loadDonations();
});

const handleRegister = () => {
    if (valid.value) {
        console.log("Registrando gasto...");
    }
};

</script>

<template>
    <div class="grid grid-cols-12 gap-y-10 gap-x-6">
        <div class="col-span-12 sm:col-span-10 sm:col-start-2">
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium group-[.mode--light]:text-white">
                    Agregar Gasto
                </div>
                <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                    <Button variant="primary"
                        class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
                        @click="() => {
                            router.push({
                                name: 'expenses',
                            })
                        }">
                        <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
                    </Button>
                </div>
            </div>
            <div class="mt-7">
                <div class="flex flex-col box box--stacked">
                    <div class="p-7">

                        <!--? ######################### INPUTS ######################### -->

                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Donación Fuente</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                            Obligatorio
                                        </div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Por favor, seleccione la donación de la cual se obtiene el gasto.
                                    </div>
                                </div>
                            </label>
                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <TomSelect v-model="selectMultiple" :options="{
                                    placeholder: 'Select your favorite actors',
                                }" class="w-full" multiple>
                                    <option value="1">Leonardo DiCaprio</option>
                                    <option value="2">Johnny Deep</option>
                                    <option value="3">Robert Downey, Jr</option>
                                    <option value="4">Samuel L. Jackson</option>
                                    <option value="5">Morgan Freeman</option>
                                </TomSelect>

                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.amount.message }}
                                </div>
                            </div>
                        </div>

                        <!-- <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Donacion Fuente</div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Por favor, seleccione la donación de la cual se obtiene el gasto.
                                    </div>
                                </div>
                            </label>

                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormSelect v-model="donation">

                                    <template v-if="loading">
                                        <option value="" disabled selected>
                                            Cargando...
                                        </option>
                                    </template>

<template v-else-if="error">
                                        <option value="" disabled selected>
                                            Error al cargar las donaciones
                                        </option>
                                    </template>

<template v-else>
                                        <option value="" disabled selected>
                                            Seleccione una donacion
                                        </option>
                                        <template v-for="(donation) in donations" :key="donation.id">
                                            <option :value="donation.id">
                                                {{ donation.concept }} ($ {{ donation.quanty }})
                                            </option>
                                        </template>
</template>

</FormSelect>
<div class="mt-1 text-xs text-red-500 h-4">
    {{ status.donation.message }}
</div>
</div>
</div> -->

                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium text-nowrap">Concepto de gasto</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                            Obligatorio
                                        </div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Por favor, proporcione un concepto para el gasto.
                                    </div>
                                </div>
                            </label>
                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput type="text" placeholder="Concepto del gasto..." v-model="concept" />
                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.concept.message }}
                                </div>
                            </div>
                        </div>

                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Monto</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                            Obligatorio
                                        </div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Por favor, proporcione el monto que se gastara de la donación.
                                    </div>
                                </div>
                            </label>
                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <InputGroup>
                                    <InputGroup.Text> $ </InputGroup.Text>
                                    <FormInput type="text" placeholder="Monto a gastar" v-model="amount"
                                        @input="validateInputAmount" />
                                </InputGroup>

                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.amount.message }}
                                </div>
                            </div>
                        </div>

                    </div>

                    <!--? ######################### BUTTON ######################### -->

                    <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
                        <Button
                            :class="`w-full px-10 md:w-auto font-bold ${!valid ? 'border-gray-500 text-gray-500' : 'border-green text-green'}`"
                            @click="handleRegister" :disabled="!valid">
                            <Lucide icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
                            Registrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>