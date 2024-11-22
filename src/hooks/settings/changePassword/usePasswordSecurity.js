export function usePasswordSecurity({ status, validate, newPassword, currentPassword }) {
  const validatePassword = (e) => {
    const { name } = e.target
    if (name === 'new_password') {
      status.value.new_password.modified = true
    }

    if (!status.value.new_password.modified) return

    const passwordRegex = status.value.new_password.Regex

    // Validaciones requeridas para la contraseña
    const validations = {
      length: '8 caracteres.',
      uppercase: 'Una letra mayúscula.',
      lowercase: 'Una letra minúscula.',
      number: 'Un número.',
      special: 'Un caracter especial.',
      secuential: 'No puede contener secuencias de números.',
      noRepeat: 'No puede contener caracteres repetitivos.'
    }

    let missingRequirements = []

    let messages = []

    let secureLevel = 0
    let color = 'gray'

    // Comenzamos a validar la contraseña y a llenar los requisitos faltantes
    if (!passwordRegex.length.test(newPassword.value)) {
      missingRequirements.push(validations.length)
    } else {
      secureLevel = 1
    }

    if (!passwordRegex.uppercase.test(newPassword.value)) {
      missingRequirements.push(validations.uppercase)
    }

    if (!passwordRegex.lowercase.test(newPassword.value)) {
      missingRequirements.push(validations.lowercase)
    }

    if (!passwordRegex.number.test(newPassword.value)) {
      missingRequirements.push(validations.number)
    }

    if (!passwordRegex.special.test(newPassword.value)) {
      missingRequirements.push(validations.special)
    }

    if (!passwordRegex.secuentialNumbers.test(newPassword.value)) {
      missingRequirements.push(validations.secuential)
      secureLevel = 0 // Reset de nivel si contiene secuencias
    }

    if (!passwordRegex.noRepeat.test(newPassword.value)) {
      missingRequirements.push(validations.noRepeat)
      secureLevel = 0 // Reset de nivel si contiene caracteres repetidos
    }

    if (newPassword.value === currentPassword.value) {
      secureLevel = 0
    }

    // Inicializa el mensaje como un array vacío
    status.value.new_password.message = []

    // Si la nueva contraseña es igual a la actual, añade un mensaje y fuerza la seguridad a 0
    if (currentPassword.value === newPassword.value) {
      messages.push('La nueva contraseña no puede ser igual a la actual.')
      status.value.new_password.message = messages
    }
    // Si hay requisitos faltantes, agrégalos al mensaje
    if (missingRequirements.length > 0) {
      messages.push('La contraseña debe incluir al menos:')
      status.value.new_password.message = messages
      status.value.new_password.list = missingRequirements
    } else if (secureLevel !== 0) {
      messages.push('La contraseña es segura.')
      status.value.new_password.message = messages
      status.value.new_password.list = []
    }

    // Complejidad basada en características
    let complexity = 0
    if (passwordRegex.uppercase.test(newPassword.value)) complexity++
    if (passwordRegex.lowercase.test(newPassword.value)) complexity++
    if (passwordRegex.number.test(newPassword.value)) complexity++
    if (passwordRegex.special.test(newPassword.value)) complexity++

    // Actualización del nivel de seguridad
    if (secureLevel >= 1 && complexity >= 2) secureLevel = Math.max(secureLevel, 2)
    if (secureLevel >= 2 && complexity >= 3) secureLevel = Math.max(secureLevel, 3)
    if (secureLevel >= 3 && complexity === 4) secureLevel = Math.max(secureLevel, 4)

    switch (secureLevel) {
      case 1:
        color = '[&.active]:bg-yellow-600'
        break
      case 2:
        color = '[&.active]:bg-amber-600'
        break
      case 3:
        color = '[&.active]:bg-green-600'
        break
      case 4:
        color = '[&.active]:bg-blue-600'
        break
      default:
        color = '[&.active]:bg-red-600'
    }

    status.value.new_password.color = color
    status.value.new_password.secure = secureLevel

    if (secureLevel > 2) {
      status.value.new_password.value = true
      status.value.new_password.error = false
    } else {
      status.value.new_password.value = false
      status.value.new_password.error = true
    }

    validate()
  }

  return { validatePassword }
}
