export const unformatPhone = (formattedNumber) => {
  // Elimina cualquier cosa que no sea un número
  return formattedNumber.replace(/\D/g, '')
}

export const formatPhone = (rawNumber) => {
  if (!rawNumber) {
    return ''
  }
  // Asegúrate de que el número tiene 10 dígitos
  if (rawNumber.length !== 10) {
    return rawNumber // Devuelve el número sin cambios si no tiene 10 dígitos
  }

  // Formatear el número (###) ### ####
  return `(${rawNumber.slice(0, 3)}) ${rawNumber.slice(3, 6)} ${rawNumber.slice(6, 10)}`
}
