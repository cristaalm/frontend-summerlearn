import { Baseurl } from '@/utils/global'
import getIdByToken from '@/logic/getIdByToken'

export const getLastProgramsUnasigned = async () => {
  const token = localStorage.getItem('access_token')
  const { user_id: id } = getIdByToken(token)
  const response = await fetch(`${Baseurl}programs/programs-unassigned/?id_user=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const programs = json

  return programs || []
}
