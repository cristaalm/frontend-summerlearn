import { Baseurl } from '@/utils/global'

export const getAreas = async () => {
  const response = await fetch(`${Baseurl}areas/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const areas = json

  // Ordenar por id DESC
  areas.sort((a, b) => b.areas_id - a.areas_id)

  return areas?.map((area) => ({
    id: area.areas_id,
    date: area.areas_date,
    name: area.areas_name,
    user: area.areas_user,
    status: area.areas_status
  }))
}
