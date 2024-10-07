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

  // Ordenar por id DESC
  programs.sort((a, b) => b.programs_id - a.programs_id)

  return programs?.map((program) => ({
    id: program.programs_id,
    name: program.programs_name,
    start: program.programs_start,
    end: program.programs_end,
    user: program.programs_user,
    area: program.programs_area,
    status: program.programs_status,
    grade: program.programs_grade,
  }))
}
