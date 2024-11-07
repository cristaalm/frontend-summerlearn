import { Baseurl } from '@/utils/global'

export const getLastPrograms = async () => {
  const response = await fetch(`${Baseurl}programs/last-programs/`, {
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
