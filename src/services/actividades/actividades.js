import { Baseurl } from '@/utils/global'

export const getActividades = async () => {
  const response = await fetch(`${Baseurl}activities/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const activities = json

  activities.sort((a, b) => b.activities_id - a.activities_id) // Ordenar por id ASC

  return activities?.map((actividades) => {
    // Formatear la fecha
    const dateParts = actividades.activities_date.split('-')
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

    // Retornar el objeto con la fecha formateada
    return {
      id: actividades.activities_id,
      name: actividades.activities_name,
      description: actividades.activities_description,
      date: formattedDate, // Fecha formateada
      status: actividades.activities_status,
      area_name: actividades.activities_program.area,
      program_name: actividades.activities_program.name,
      num_beneficiario: actividades.num_son,
      num_voluntario: actividades.num_volun,
      activities_user: actividades.activities_user.id
    }
  })
}
