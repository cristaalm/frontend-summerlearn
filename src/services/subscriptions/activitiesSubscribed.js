import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export const activitiesSubscribed = async () => {
  const access_token = localStorage.getItem('access_token')

  // Get userId from the token
  const userId = getIdByToken(access_token)?.user_id

  // Add userId as a query parameter
  const response = await fetch(`${Baseurl}activities/activities-subscribed/?id_user=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })

  const json = await response.json()
  const activities = json

  // Sort activities by id in descending order
  activities.sort((a, b) => b.activities_id - a.activities_id)

  // Format each activity and return the formatted array
  return activities?.map((actividades) => {
    return {
      id: actividades.activities_id,
      name: actividades.activities_name,
      description: actividades.activities_description,
      status: actividades.activities_status,
      area_name: actividades.activities_program_area,
      program_name: actividades.activities_program,
      sus: actividades.suscrito
    }
  })
}
