export function formatMessageDate(dateString: string): string {
  const date = new Date(dateString) // Convertir fecha con la zona horaria incluida
  const now = new Date()

  // Obtener el desplazamiento de la zona horaria en minutos y ajustarlo en horas
  const timeZoneOffset = date.getTimezoneOffset() // Diferencia en minutos entre UTC y la fecha

  // Ajustar la fecha para tener en cuenta la zona horaria local (sumar/restar)
  date.setMinutes(date.getMinutes() - timeZoneOffset)

  // Ajustar la fecha actual también
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

  // Verificar si es hoy
  const isToday = date.toDateString() === now.toDateString()

  // Verificar si fue ayer
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday = date.toDateString() === yesterday.toDateString()

  // Verificar si es dentro de los últimos 7 días (pero no ayer)
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(now.getDate() - 7)
  const isWithinLastWeek = date > oneWeekAgo

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  if (isToday) {
    // Si es hoy, devolver solo la hora
    return date.toLocaleString('es-ES', timeOptions)
  } else if (isYesterday) {
    // Si fue ayer, devolver "Ayer"
    return 'Ayer'
  } else if (isWithinLastWeek) {
    // Si es dentro de la última semana (pero no ayer), devolver el nombre del día
    const dayOfWeekOptions: Intl.DateTimeFormatOptions = { weekday: 'long' }
    return date.toLocaleString('es-ES', dayOfWeekOptions)
  } else {
    // Si es anterior a la última semana, devolver la fecha en formato DD/MM/YYYY
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    return date.toLocaleString('es-ES', dateOptions)
  }
}
