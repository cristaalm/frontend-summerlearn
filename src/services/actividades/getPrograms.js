import { Baseurl } from '@/../global'

export const getPrograms = async () => {
  const response = await fetch(`${Baseurl}programs/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const programs = json

  programs.sort((a, b) => a.programs_id - b.programs_id) // Ordenar por id ASC

  return programs?.map((program) => ({
    id: program.programs_id,
    name: program.programs_name
  }))
}
