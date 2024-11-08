import { Baseurl } from '@/utils/global'

export const getProgramsActived = async () => {
  const response = await fetch(`${Baseurl}programs/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  const json = await response.json()
  const programas = json

  // Ordenar por programs_id en orden ascendente
  programas.sort((a, b) => a.programs_id - b.programs_id)

  // Transformar en un array de objetos con solo `id` y `name`
  return programas.map((program) => ({
    id: program.programs_id,
    name: program.programs_name
  }))
}