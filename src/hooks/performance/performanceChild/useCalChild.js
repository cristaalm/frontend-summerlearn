import { Baseurl } from '@/utils/global'

const token = localStorage.getItem('access_token')

// Función para actualizar la calificación de un beneficiario
export const updateScore = async (id, score) => {
  if (score === null || score === undefined) return // Permitir valores numéricos como 0

  try {
    const response = await fetch(`${Baseurl}performance-beneficiaries/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Colocar Authorization dentro de headers
      },
      body: JSON.stringify({ performance_beneficiaries_value: score })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error(`Error al registrar la calificación para ID ${id}:`, error)
  }
}

// Función para guardar todas las calificaciones válidas
export const saveAllScores = async (scores, performance, nota, valid) => {
  if (scores.length > 0) {
    try {
      const response = await fetch(`${Baseurl}performance-beneficiaries/save-scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Colocar Authorization dentro de headers
        },
        body: JSON.stringify({ scores })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Actualizar las calificaciones en performance
      scores.forEach((score) => {
        const index = performance.value.findIndex((p) => p.id === score.id)
        if (index !== -1) {
          performance.value[index].value = nota.value[score.id]
          nota.value[score.id] = performance.value[index].value
          valid.value[score.id] = false
        }
      })
    } catch (error) {
      console.error('Error al registrar las calificaciones:', error)
    }
  }
}
