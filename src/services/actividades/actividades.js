import { Baseurl } from '../../../global'

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
  // console.log(activities)

  activities.sort((a, b) => a.activities_id - b.activities_id) // Ordenar por id ASC

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
      program_name: actividades.activities_program.name
    }
  })
}