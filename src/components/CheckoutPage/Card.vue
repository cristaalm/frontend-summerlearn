<template>
    <div class="card-item" :class="{ '-active': isCardFlipped }">
        <div class="card-item__side -front">
            <div class="card-item__focus" :class="{ '-active': focusElementStyle }" :style="focusElementStyle"
                ref="focusElement"></div>
            <div class="card-item__cover">
                <img v-if="currentCardBackground" :src="currentCardBackground" class="card-item__bg" />
            </div>
            <div class="card-item__wrapper">
                <div class="card-item__top">
                    <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                        class="card-item__chip" />
                    <div class="card-item__type">
                        <!-- Imagen de tipo de tarjeta que cambia dinámicamente -->
                        <img :src="cardTypeImage" alt class="card-item__typeImg" />
                    </div>
                </div>
                <label :for="fields.cardNumber" class="card-item__number" :ref="fields.cardNumber">
                    <template v-for="(n, $index) in currentPlaceholder" :key="$index">
                        <span>
                            <transition name="slide-fade-up">
                                <div class="card-item__numberItem" v-if="getIsNumberMasked($index, n)">*</div>
                                <div class="card-item__numberItem" :class="{ '-active': n.trim() === '' }"
                                    :key="currentPlaceholder" v-else-if="labels.cardNumber.length > $index">
                                    {{ labels.cardNumber[$index] }}
                                </div>
                                <div class="card-item__numberItem" :class="{ '-active': n.trim() === '' }" v-else
                                    :key="currentPlaceholder + 1">{{ n }}</div>
                            </transition>
                        </span>
                    </template>
                </label>
                <div class="card-item__content">
                    <label :for="fields.cardName" class="card-item__info" :ref="fields.cardName">
                        <div class="card-item__holder">Card Holder</div>
                        <div class="card-item__name" v-if="labels.cardName.length" key="1">
                            <span class="card-item__nameItem"
                                v-for="(n, $index) in labels.cardName.replace(/\s\s+/g, ' ')" :key="$index + 1">{{ n
                                }}</span>
                        </div>
                        <div class="card-item__name" v-else key="2">Full Name</div>
                    </label>
                    <div class="card-item__date" ref="cardDate">
                        <label :for="fields.cardMonth" class="card-item__dateTitle">Expires</label>
                        <label :for="fields.cardMonth" class="card-item__dateItem">
                            <span v-if="labels.cardMonth" :key="labels.cardMonth">{{ labels.cardMonth }}</span>
                            <span v-else key="2">MM</span>
                        </label>
                        /
                        <label for="cardYear" class="card-item__dateItem">
                            <span v-if="labels.cardYear" :key="labels.cardYear">{{ String(labels.cardYear).slice(2,
                                4) }}</span>
                            <span v-else key="2">YY</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-item__side -back">
            <div class="card-item__cover">
                <img v-if="currentCardBackground" :src="currentCardBackground" class="card-item__bg" />
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">
                <div class="card-item__cvvTitle">CVV</div>
                <div class="card-item__cvvBand">
                    <span v-for="(n, $index) in labels.cardCvv" :key="$index">*</span>
                </div>
                <div class="card-item__type">
                    <!-- <img :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + cardType + '.png'"
                        v-if="cardType" class="card-item__typeImg" /> -->
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    name: "Card",
    props: {
        labels: Object,
        fields: Object,
        isCardNumberMasked: Boolean,
        randomBackgrounds: {
            type: Boolean,
            default: true
        },
        backgroundImage: [String, Object]
    },
    data() {
        return {
            focusElementStyle: null,
            currentFocus: null,
            isFocused: false,
            isCardFlipped: false,
            amexCardPlaceholder: "#### ###### #####",
            dinersCardPlaceholder: "#### ###### ####",
            defaultCardPlaceholder: "#### #### #### ####",
            currentPlaceholder: "",
            cardTypeImage: "" // URL de imagen de tipo de tarjeta
        };
    },
    watch: {
        "labels.cardNumber": {
            handler(newNumber) {
                this.updateCardType(newNumber);
            },
            immediate: true
        },
        currentFocus() {
            if (this.currentFocus) {
                this.changeFocus();
            } else {
                this.focusElementStyle = null;
            }

            this.updateCardType(this.labels.cardNumber);
        }
    },
    mounted() {

        let self = this;
        let fields = document.querySelectorAll("[data-card-field]");
        fields.forEach(element => {
            element.addEventListener("focus", () => {
                this.isFocused = true;
                if (
                    element.id === this.fields.cardYear ||
                    element.id === this.fields.cardMonth
                ) {
                    this.currentFocus = "cardDate";
                } else {
                    this.currentFocus = element.id;
                }
                this.isCardFlipped = element.id === this.fields.cardCvv;
            });
            element.addEventListener("blur", () => {
                this.isCardFlipped = !element.id === this.fields.cardCvv;
                setTimeout(() => {
                    if (!self.isFocused) {
                        self.currentFocus = null;
                    }
                }, 300);
                self.isFocused = false;
            });
        });
    },
    computed: {
        currentCardBackground() {
            if (this.randomBackgrounds && !this.backgroundImage) {
                // TODO will be optimized
                let random = Math.floor(Math.random() * 25 + 1);
                return `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${random}.jpeg`;
            } else if (this.backgroundImage) {
                return this.backgroundImage;
            } else {
                return null;
            }
        }
    },
    methods: { // Método para detectar el tipo de tarjeta
        detectCardType(number) {
            let re;
            if (/^4/.test(number)) return "visa";
            if (/^(34|37)/.test(number)) return "amex";
            if (/^5[1-5]/.test(number)) return "mastercard";
            if (/^6011/.test(number)) return "discover";
            if (/^62/.test(number)) return "unionpay";
            if (/^9792/.test(number)) return "troy";
            if (/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/.test(number)) return "dinersclub";
            if (/^35(2[89]|[3-8])/.test(number)) return "jcb";
            return "";
        },
        updateCardType(number) {
            console.log(number);
            const cardType = this.detectCardType(number);
            this.cardTypeImage = cardType
                ? `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${cardType}.png`
                : "";

            // Actualizar placeholder según el tipo de tarjeta
            if (cardType === "amex") {
                this.currentPlaceholder = this.amexCardPlaceholder;
            } else if (cardType === "dinersclub") {
                this.currentPlaceholder = this.dinersCardPlaceholder;
            } else {
                this.currentPlaceholder = this.defaultCardPlaceholder;
            }
        },
        changeFocus() {
            let target = this.$refs[this.currentFocus];
            this.focusElementStyle = target
                ? {
                    width: `${target.offsetWidth}px`,
                    height: `${target.offsetHeight}px`,
                    transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
                }
                : null;
        },
        getIsNumberMasked(index, n) {
            return (
                index > 4 &&
                index < 14 &&
                this.labels.cardNumber.length > index &&
                n.trim() !== "" &&
                this.isCardNumberMasked
            );
        }
    }
};
</script>