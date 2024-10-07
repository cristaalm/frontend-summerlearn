import { Baseurl } from '@/../global'

export const getGrades = async () => {
  const response = await fetch(`${Baseurl}grades/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const grades = json

  // Ordenar por id DESC
  grades.sort((a, b) => b.grades_id - a.grades_id)

  return grades?.map((grade) => ({
    id: grade.grades_id,
    description: grade.grades_description
  }))
}
