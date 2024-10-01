<script setup>
import { ref, onMounted } from "vue";
import Lucide from "@/components/base/Lucide";
import Button from "@/components/base/Button";
import TomSelect from "@/components/base/TomSelect";
import LoadingIcon from "@/components/base/LoadingIcon";
import { FormInput, InputGroup } from "@/components/base/Form";
import { useStatus, useValidations, useRefs, useMultiDonations, getDonationsFilter } from "@/hooks/bills/addBill";
import { useDonations } from "@/hooks/donations/";
import { useRouter } from "vue-router";
import { useSetBill } from "@/hooks/bills/addBill/useSetBills";

const { addBill, setBillError, loadingSetBill } = useSetBill();
const router = useRouter();
const { concept, amount, selectMultiple } = useRefs();
const { status } = useStatus();
const { valid, validateInputAmount } = useValidations({ status, concept, amount, selectMultiple });
const { donations, loadDonations } = useDonations();
const { isValid } = useMultiDonations({ status, selectMultiple, amount, donations });

const billData = ref({
    concept: '',
    date: '', // Consider adding this if required
    amount: null, // Cambiado a null
    donations: []
});

// Nueva variable reactiva para las donaciones filtradas
const filteredDonations = ref([]); // Donaciones filtradas

onMounted(async () => {
    loadDonations();

    // Cargar donaciones filtradas al montarse el componente
    try {
        const result = await getDonationsFilter();
        filteredDonations.value = result; // Guardar el resultado en la variable reactiva
    } catch (error) {
        console.error("Error al obtener donaciones filtradas:", error);
    }
});

// Manejo del registro de gastos
const handleRegister = async () => {
    // Actualiza billData con los valores de las variables reactivas
    billData.value.concept = concept.value;
    billData.value.amount = amount.value; // Mantenlo como null si no se ha ingresado
    billData.value.date = new Date().toISOString().split('T')[0]; // fecha en formato YYYY-MM-DD

    // obtenemos la información de las donaciones seleccionadas

    for (let i = 0; i < selectMultiple.value.length; i++) {
        const donation = filteredDonations.value.find(donation => donation.id == selectMultiple.value[i]);
        billData.value.donations.push(donation);
    }

    // Asegúrate de que billData tenga valores válidos
    if (!billData.value.concept || !billData.value.amount || !Array.isArray(billData.value.donations) || billData.value.donations.length === 0) {
        console.error("Datos requeridos faltantes", billData.value);
        return;
    }

    const { success } = await addBill(billData.value);
    if (!success) {
        console.error("Error al registrar gasto:", setBillError.value);
    } else {
        router.push({ name: 'expenses' });
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
                    <Button variant="primary" @click="() => router.push({ name: 'expenses' })">
                        <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
                    </Button>
                </div>
            </div>
            <div class="mt-7">
                <div class="flex flex-col box box--stacked">
                    <div class="p-7">
                        <!-- Donación Fuente -->
                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Donaciónes</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md border border-slate-200">
                                            Requerido
                                        </div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Por favor, seleccione la donación de la cual se obtiene el gasto.
                                    </div>
                                </div>
                            </label>
                            <div class="flex-1 w-full mt-3 xl:mt-0">
                                <TomSelect 
                                    v-model="selectMultiple"
                                    :options="{ placeholder: 'Selecciona las donaciones' }" class="w-full" multiple>

                                    <template v-for="(donation) in filteredDonations" :key="donation.id">
                                        <option :value="donation.id">{{ donation.concept }} ($ {{ donation.remaining }})
                                        </option>
                                    </template>
                                    
                                </TomSelect>

                                <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.selectMultiple.message }}
                                </div>
                            </div>
                        </div>

                        <!-- Concepto de gasto -->
                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium text-nowrap">Concepto</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md border border-slate-200">
                                            Requerido
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

                        <!-- Monto -->
                        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                <div class="text-left">
                                    <div class="flex items-center">
                                        <div class="font-medium">Monto</div>
                                        <div
                                            class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md border border-slate-200">
                                            Requerido
                                        </div>
                                    </div>
                                    <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                                        Por favor, proporcione el monto que se gastará.
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

                    <!-- Botón Registrar -->
                    <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
                        <Button
                            :class="`w-full px-10 md:w-auto font-bold ${!valid || !isValid ? 'border-gray-500 text-gray-500' : 'border-green text-green'}`"
                            @click="handleRegister" :disabled="!valid || !isValid">
                            <Lucide v-if="!loadingSetBill" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2" />
                            <LoadingIcon v-if="loadingSetBill" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                                color="black" />
                            {{ loadingSetBill ? 'Registrando...' : 'Registrar' }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
