import { ref, watch } from 'vue';

export function useValidations({ status, concept, amount, selectMultiple }) {
  const valid = ref(false);
  const lastAmount = ref('');

  //? ################################### METHODS ###################################

  const validateSelectMultiple = () => {
    if (!selectMultiple.value || selectMultiple.value.length === 0) {
      status.value.selectMultiple.message = "Por favor, seleccione al menos una donación.";
      status.value.selectMultiple.error = true;
      valid.value = false; // Si hay error, el botón debe estar desactivado
    } else {
      status.value.selectMultiple.message = "";
      status.value.selectMultiple.error = false;
    }
  };

  const validateInputAmount = (e) => {
    const { value } = e.target;
    const regex = /^$|^\d+(\.\d{1,2})?$/;
    if (regex.test(value)) {
      lastAmount.value = value;
    } else {
      amount.value = lastAmount.value;
    }
  };

  const validateAmount = (value) => {
    const { Regex } = status.value.amount;
    if (Regex.test(value)) {
      status.value.amount.success = true;
      status.value.amount.error = false;
      status.value.amount.message = '';
    } else {
      status.value.amount.success = false;
      status.value.amount.error = true;
      status.value.amount.message = `El monto no es válido`;
    }
  };

  const validateConcept = (value) => {
    const { Regex } = status.value.concept;
    if (Regex.test(value)) {
      status.value.concept.success = true;
      status.value.concept.error = false;
      status.value.concept.message = '';
    } else {
      status.value.concept.success = false;
      status.value.concept.error = true;
      status.value.concept.message = `El concepto no es válido`;
    }
  };

  const validate = () => {
    const { concept, amount } = status.value;
    // Incluye validación para selectMultiple
    validateSelectMultiple(); // Llama a la función para validar selectMultiple
    valid.value = concept.success && amount.success && !status.value.selectMultiple.error;
  };

  //? ################################### WATCHERS ###################################

  watch(concept, (newValue) => {
    validateConcept(newValue);
  });

  watch(amount, (newValue) => {
    validateAmount(newValue);
  });

  watch(selectMultiple, (newValue) => {
    validateSelectMultiple(newValue);
    validate(); // Asegúrate de validar después de cambiar el selectMultiple
  });

  watch(status.value, () => {
    validate();
  });

  return { valid, validateInputAmount };
}
