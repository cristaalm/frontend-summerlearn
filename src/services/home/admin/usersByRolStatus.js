import { Baseurl } from '@/utils/global'

export const getUsersByRolStatus = async () => {
  const response = await fetch(`${Baseurl}users/by-rol-status/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const users = json

  return users || []
}
