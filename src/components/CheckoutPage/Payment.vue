<template>
    <div class="col-span-1 lg:col-span-6">
        <h4 class="text-3xl text-gray-700 mb-5">Payment information</h4>
        <div class="p-10 rounded-md shadow-md bg-white">
            <div v-if="cardComponent" class="mb-6">
                <Card :fields="fields" :labels="formData" :isCardNumberMasked="isCardNumberMasked"
                    :randomBackgrounds="randomBackgrounds" :backgroundImage="backgroundImage" />
            </div>
            <div class="mb-6">
                <label class="block mb-3 text-gray-600" for="">Name on card</label>
                <input type="text" :id="fields.cardName" v-letter-only @input="changeName" v-model="formData.cardName"
                    data-card-field autocomplete="off"
                    class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider" />
            </div>
            <div class="mb-6">
                <label class="block mb-3 text-gray-600" for="">Card number</label>
                <input type="tel" :id="fields.cardNumber" @input="changeNumber" @focus="focusCardNumber"
                    @blur="blurCardNumber" v-model="formData.cardNumber" :maxlength="cardNumberMaxLength"
                    data-card-field autocomplete="off"
                    class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest" />
            </div>
            <div class="mb-6 flex flex-wrap -mx-3w-full">
                <div class="w-2/3 px-3">
                    <label class="block mb-3 text-gray-600" for="">Expiration date</label>
                    <div class="flex">
                        <select
                            class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6"
                            :id="fields.cardMonth" v-model="formData.cardMonth" @change="changeMonth" data-card-field>
                            <option value disabled selected>Month</option>
                            <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12"
                                v-bind:disabled="n < minCardMonth" v-bind:key="n">{{ generateMonthValue(n) }}</option>
                        </select>
                        <select
                            class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"
                            :id="fields.cardYear" v-model="formData.cardYear" @change="changeYear" data-card-field>
                            <option value disabled selected>Year</option>
                            <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">{{
                                $index + minCardYear }}</option>
                        </select>
                    </div>
                </div>
                <div class="w-1/3 px-3">
                    <label class="block mb-3 text-gray-600" for="">CVC</label>
                    <input type="tel" v-number-only :id="fields.cardCvv" maxlength="4" v-model="formData.cardCvv"
                        @input="changeCvv" data-card-field autocomplete="off"
                        class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest" />
                </div>
            </div>
            <div class="mb-6 text-right">
                <span class="text-right font-bold">{{ total }} USD</span>
            </div>
            <div>
                <button @click="finishPayment"
                    class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">
                    Confirm payment
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import Card from "./Card.vue";
import '@/assets/css/scss/card-component.css';

// Props
const props = defineProps({
    total: Number,
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
    props.formData.cardNumber = e.target.value.replace(/\D/g, "");
    let value = props.formData.cardNumber;

    if (/^3[47]\d{0,13}$/.test(value)) {
        props.formData.cardNumber = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        cardNumberMaxLength.value = 17;
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        props.formData.cardNumber = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        cardNumberMaxLength.value = 16;
    } else if (/^\d{0,16}$/.test(value)) {
        props.formData.cardNumber = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{4})/, "$1 $2 ").replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
        cardNumberMaxLength.value = 19;
    }

    if (e.inputType === "deleteContentBackward" && props.formData.cardNumber.endsWith(" ")) {
        props.formData.cardNumber = props.formData.cardNumber.slice(0, -1);
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
const finishPayment = () => emit("change-parent");
</script>
