<template>
    <!-- ? #################### MODAL DE CONFIRMACIÖN DE DONACIÓN #################### ? -->

    <ConfirmAddDonationModal :ModalConfirmAddDonation="ModalConfirmAddDonation"
        :setModalConfirmAddDonation="setModalConfirmAddDonation" />

    <div class="">
        <div class="p-10 bg-white dark:bg-[#28334e]">
            <div v-if="cardComponent" class="mb-6">
                <Card :fields="fields" :labels="formData" :isCardNumberMasked="isCardNumberMasked"
                    :randomBackgrounds="randomBackgrounds" :backgroundImage="backgroundImage" />
            </div>
            <div class="mb-6">
                <label class="block mb-3 text-gray-600 dark:text-slate-200" for="">Titular de la tarjeta</label>
                <input type="text" :id="fields.cardName" v-letter-only @input="changeName" v-model="formData.cardName"
                    data-card-field autocomplete="off"
                    class="border border-gray-500 rounded-md inline-block dark:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400 py-2 px-3 w-full text-gray-600 tracking-wider" />
            </div>
            <div class="mb-6">
                <label class="block mb-3 text-gray-600 dark:text-slate-200" for="">Número de la tarjeta</label>
                <input type="tel" :id="fields.cardNumber" @input="changeNumber" @focus="focusCardNumber"
                    @blur="blurCardNumber" v-model="formData.cardNumber" :maxlength="cardNumberMaxLength"
                    data-card-field autocomplete="off"
                    class="border border-gray-500 rounded-md inline-block dark:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400 py-2 px-3 w-full text-gray-600 tracking-widest" />
            </div>
            <div class="mb-6 flex flex-wrap -mx-3w-full">
                <div class="w-2/3 px-3">
                    <label class="block mb-3 text-gray-600 dark:text-slate-200" for="">Fecha de expiración</label>
                    <div class="flex">
                        <select
                            class="border border-gray-500 rounded-md inline-block dark:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400 py-2 px-3 w-full text-gray-600 tracking-widest mr-6"
                            :id="fields.cardMonth" v-model="formData.cardMonth" @change="changeMonth" data-card-field>
                            <option value disabled selected>Mes</option>
                            <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12"
                                v-bind:disabled="n < minCardMonth" v-bind:key="n">{{ generateMonthValue(n) }}</option>
                        </select>
                        <select
                            class="border border-gray-500 rounded-md inline-block dark:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400 py-2 px-3 w-full text-gray-600 tracking-widest"
                            :id="fields.cardYear" v-model="formData.cardYear" @change="changeYear" data-card-field>
                            <option value disabled selected>Año</option>
                            <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">{{
                                $index + minCardYear }}</option>
                        </select>
                    </div>
                </div>
                <div class="w-1/3 px-3">
                    <label class="block mb-3 text-gray-600 dark:text-slate-200" for="">CVC</label>
                    <input type="tel" v-number-only :id="fields.cardCvv" maxlength="4" v-model="formData.cardCvv"
                        @input="changeCvv" data-card-field autocomplete="off"
                        class="border border-gray-500 rounded-md inline-block dark:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400 py-2 px-3 w-full text-gray-600 tracking-widest" />
                </div>
            </div>
            <div>
                <Button variant="outline-success" @click="finishPayment"
                    class="w-full text-center px-4 py-3 dark:text-slate-200">
                    <LoadingIcon v-if="setDonationLoading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                        color="black" />

                    <Lucide v-if="!setDonationLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
                    {{ setDonationLoading ? 'Validando datos...' : 'Completar donación' }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDialogConfirmAddDonation } from '@/hooks/donations/Dialogs/useDialogConfirmAddDonation'
import ConfirmAddDonationModal from '@/components/Dashboard/donations/ConfirmAddDonationModal.vue'
import { ref, computed, watch, onMounted, inject, provide } from "vue";
import LoadingIcon from '@/components/base/LoadingIcon'
import '@/assets/css/scss/card-component.css';
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import Card from "./Card.vue";

const showToast = inject('showToast');
const { setDonationLoading, handleRegister } = inject('refsDonations');
const { ModalConfirmAddDonation, setModalConfirmAddDonation } = useDialogConfirmAddDonation()

// Props
const props = defineProps({
    formData: {
        type: Object,
        default: () => ({
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: ""
        })
    },
    backgroundImage: [String, Object],
    randomBackgrounds: {
        type: Boolean,
        default: true
    }
});

// Emitted events
const emit = defineEmits(["handle-card", "input-card-name", "input-card-number", "input-card-month", "input-card-year", "input-card-cvv", "change-parent"]);

// Proporcionar el numero de tarjeta enmascarado
provide('cardNumber', computed(() => {
    return props.formData.cardNumber;
}));

// Reactive data
const cardComponent = ref(true);
const fields = {
    cardNumber: "v-card-number",
    cardName: "v-card-name",
    cardMonth: "v-card-month",
    cardYear: "v-card-year",
    cardCvv: "v-card-cvv"
};
const minCardYear = ref(new Date().getFullYear());
const isCardNumberMasked = ref(true);
const mainCardNumber = ref(props.formData.cardNumber);
const cardNumberMaxLength = ref(19);

// Computed
const minCardMonth = computed(() => props.formData.cardYear === minCardYear.value ? new Date().getMonth() + 1 : 1);

// Watchers
watch(() => props.formData.cardYear, (newValue) => {
    if (props.formData.cardMonth < minCardMonth.value) {
        props.formData.cardMonth = "";
    }
});

// Lifecycle hook
onMounted(() => {
    maskCardNumber();
    if (cardComponent.value) {
        emit("handle-card");
    }
});

// Methods
const generateMonthValue = (n) => (n < 10 ? `0${n}` : n);
const changeName = (e) => {
    props.formData.cardName = e.target.value;
    emit("input-card-name", props.formData.cardName);
};
const changeNumber = (e) => {
    // Quitamos caracteres no numéricos
    props.formData.cardNumber = e.target.value.replace(/\D/g, "");
    let value = props.formData.cardNumber;
    // American Express (#### ###### #####)
    if (/^3[47]\d{0,13}$/.test(value)) {
        props.formData.cardNumber = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        cardNumberMaxLength.value = 17;
        e.target.value = props.formData.cardNumber;
        console.log(props.formData.cardNumber);

        // Diners Club (#### ###### ####)
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        props.formData.cardNumber = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        cardNumberMaxLength.value = 16;
        e.target.value = props.formData.cardNumber;
        console.log(props.formData.cardNumber);

        // Visa/MasterCard/Default (#### #### #### ####)
    } else if (/^\d{0,16}$/.test(value)) {
        props.formData.cardNumber = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{4})/, "$1 $2 ").replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
        cardNumberMaxLength.value = 19;
        e.target.value = props.formData.cardNumber;
        console.log(value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{4})/, "$1 $2 ").replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 "));
    }

    // Eliminar el último espacio si se borra un dígito
    if (e.inputType === "deleteContentBackward" && props.formData.cardNumber.endsWith(" ")) {
        props.formData.cardNumber = props.formData.cardNumber.slice(0, -1);
        e.target.value = props.formData.cardNumber;
    }

    emit("input-card-number", props.formData.cardNumber);
};
const changeMonth = () => emit("input-card-month", props.formData.cardMonth);
const changeYear = () => emit("input-card-year", props.formData.cardYear);
const changeCvv = (e) => {
    props.formData.cardCvv = e.target.value;
    emit("input-card-cvv", props.formData.cardCvv);
};
const blurCardNumber = () => {
    if (isCardNumberMasked.value) maskCardNumber();
};
const maskCardNumber = () => {
    mainCardNumber.value = props.formData.cardNumber;
    props.formData.cardNumber = props.formData.cardNumber.split("").map((c, i) => (i > 4 && i < 14 && c.trim() ? "*" : c)).join("");
};
const unMaskCardNumber = () => (props.formData.cardNumber = mainCardNumber.value);
const focusCardNumber = () => unMaskCardNumber();
const toggleMask = () => {
    isCardNumberMasked.value = !isCardNumberMasked.value;
    isCardNumberMasked.value ? maskCardNumber() : unMaskCardNumber();
};

const finishPayment = () => {
    // Validamos que los datos estén completos
    if (!props.formData.cardName || !props.formData.cardNumber || !props.formData.cardMonth || !props.formData.cardYear || !props.formData.cardCvv) {
        showToast({
            message: 'Por favor complete todos los campos',
            tipo: 'error'
        });
        return;
    }


    // Desenmascaramos temporalmente el número de tarjeta para validarlo
    unMaskCardNumber();
    const cardNumber = props.formData.cardNumber.replace(/\s+/g, ''); // Eliminamos espacios

    // Validación de formato de número de tarjeta
    const amexPattern = /^\d{15}$/;      // Amex: 15 dígitos (#### ###### #####)
    const dinersPattern = /^\d{14}$/;    // Diners: 14 dígitos (#### ###### ####)
    const defaultPattern = /^\d{16}$/;   // Default: 16 dígitos (#### #### #### ####)

    let valid = false;

    if (amexPattern.test(cardNumber) || dinersPattern.test(cardNumber) || defaultPattern.test(cardNumber)) {
        // Validación de BIN (primera serie de números)
        if (/^4/.test(cardNumber)) valid = true;          // Visa
        if (/^(34|37)/.test(cardNumber)) valid = true;    // Amex
        if (/^5[1-5]/.test(cardNumber)) valid = true;     // MasterCard
        if (/^6011/.test(cardNumber)) valid = true;       // Discover
        if (/^62/.test(cardNumber)) valid = true;         // UnionPay
        if (/^9792/.test(cardNumber)) valid = true;       // TROY
        if (/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/.test(cardNumber)) valid = true; // Diners Club
        if (/^35(2[89]|[3-8])/.test(cardNumber)) valid = true; // JCB
    }

    // Restauramos la máscara después de la validación si estaba enmascarado
    maskCardNumber();

    if (!valid) {
        showToast({
            message: 'Tarjeta no válida',
            tipo: 'error'
        });
        return;
    }

    // Validación de fecha de expiración
    if (props.formData.cardYear < minCardYear.value || (props.formData.cardYear == minCardYear.value && props.formData.cardMonth < minCardMonth.value)) {
        showToast({
            message: 'La fecha de expiración no es válida',
            tipo: 'error'
        });
        return;
    }

    // Validación del CVV
    if (!/^\d{3,4}$/.test(props.formData.cardCvv)) {
        showToast({
            message: 'El código de seguridad no es válido',
            tipo: 'error'
        });
        return;
    }

    setModalConfirmAddDonation({ open: true })
};

</script>
