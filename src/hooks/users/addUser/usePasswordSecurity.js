export function usePasswordSecurity({ status, validate }) {
  const validatePassword = (e) => {
    const { name, value } = e.target
    const passwordRegex = status.value.password.Regex

    // Validaciones requeridas para la contraseña
    const validations = {
      length: '8 caracteres',
      uppercase: 'una letra mayúscula',
      lowercase: 'una letra minúscula',
      number: 'un número',
      special: 'un caracter especial',
      secuential: 'no puede contener secuencias de números',
      noRepeat: 'no puede contener caracteres repetitivos'
    }

    let missingRequirements = []

    let secureLevel = 0
    let color = 'gray'

    // Comenzamos a validar la contraseña y a llenar los requisitos faltantes
    if (!passwordRegex.length.test(value)) {
      missingRequirements.push(validations.length)
    } else {
      secureLevel = 1
    }

    if (!passwordRegex.uppercase.test(value)) {
      missingRequirements.push(validations.uppercase)
    }

    if (!passwordRegex.lowercase.test(value)) {
      missingRequirements.push(validations.lowercase)
    }

    if (!passwordRegex.number.test(value)) {
      missingRequirements.push(validations.number)
    }

    if (!passwordRegex.special.test(value)) {
      missingRequirements.push(validations.special)
    }

    if (!passwordRegex.secuentialNumbers.test(value)) {
      missingRequirements.push(validations.secuential)
      secureLevel = 0 // Reset de nivel si contiene secuencias
    }

    if (!passwordRegex.noRepeat.test(value)) {
      missingRequirements.push(validations.noRepeat)
      secureLevel = 0 // Reset de nivel si contiene caracteres repetidos
    }

    // Mensaje final para indicar qué falta en la contraseña
    if (missingRequirements.length > 0) {
      status.value.password.message = `La contraseña debe incluir al menos: ${missingRequirements.join(', ')}.`
    } else {
      status.value.password.message = 'La contraseña es segura.'
    }

    // Complejidad basada en características
    let complexity = 0
    if (passwordRegex.uppercase.test(value)) complexity++
    if (passwordRegex.lowercase.test(value)) complexity++
    if (passwordRegex.number.test(value)) complexity++
    if (passwordRegex.special.test(value)) complexity++

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

    status.value.password.color = color
    status.value.password.secure = secureLevel

    if (secureLevel > 2) {
      status.value[name].value = true
      status.value[name].error = false
    } else {
      status.value[name].value = false
      status.value[name].error = true
    }

    validate()
  }

  return {
    validatePassword
  }
}
