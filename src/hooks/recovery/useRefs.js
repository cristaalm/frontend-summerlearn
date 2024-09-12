import { ref } from 'vue'

export function useRefs() {
    const password = ref('')
    const confirm_password = ref('')
    const valid = ref(false)

    return {
        password,
        confirm_password,
        valid
    }
}