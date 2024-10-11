import { Baseurl } from '@/utils/global'

export const getObjectivesById = async (id_activity) => {
  // Recibe id_activity como argumento
  const response = await fetch(`${Baseurl}objectives/get-objectives/?id_activity=${id_activity}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  const json = await response.json()
  const objectives = json

  objectives.sort((a, b) => b.objectives_id - a.objectives_id) // Ordenar por id ASC

  return objectives?.map((objective) => ({
    id: objective.objectives_id,
    description: objective.objectives_description
  }))
}
