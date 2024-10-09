import { ref } from 'vue'

export function useRefs() {
  const currentPassword = ref('')
  const newPassword = ref('')
  const newPasswordConfirm = ref('')
  const showCurrentPassword = ref(false)
  const showNewPassword = ref(false)
  const showNewPasswordConfirm = ref(false)
  const valid = ref(false)

  return {
    currentPassword,
    newPassword,
    newPasswordConfirm,
    showCurrentPassword,
    showNewPassword,
    showNewPasswordConfirm,
    valid
  }
}
