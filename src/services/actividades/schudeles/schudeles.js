import { Baseurl } from '@/utils/global'

export const getSchudelesActivity = async (actividadId) => {
  const response = await fetch(
    `${Baseurl}days-activities/get-schedules-activity/?id_activity=${actividadId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  )

  // Verifica si la respuesta fue exitosa
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const json = await response.json()
  const days = json

  // Ordenar días por id
  days.sort((a, b) => a.id - b.id) // Cambiar 'day_id' a 'id'

  // Mapear la estructura de días y sus horarios
  return days.map((day) => ({
    id: day.id,
    description: day.description,
    schedules: day.schedules.map((schedule) => ({
      start: schedule.start,
      end: schedule.end
    }))
  }))
}
