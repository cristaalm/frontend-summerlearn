import { Baseurl } from '@/utils/global'

export const getSchedules = async (actividadId, diaId) => {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      throw new Error('Token de autenticación no encontrado')
    }

    const response = await fetch(
      `${Baseurl}schedules/get-available-schedules/?id_activity=${actividadId}&id_day=${diaId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`)
    }

    const json = await response.json()
    const schedules = json.available_schedules || []

    // schedules.sort((a, b) => a.schedules_id - b.schedules_id)

    return schedules.map((schedule) => ({
      id: schedule.schedules_id,
      start: schedule.schedules_start,
      end: schedule.schedules_end
    }))
  } catch (error) {
    console.error('Error al obtener los horarios:', error)
    return []
  }
}
