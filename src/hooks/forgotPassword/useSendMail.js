import { Baseurl } from '@/../global'

export const sendMail = async (email) => {
  let response // Declara la variable response aquí

  try {
    response = await fetch(`${Baseurl}send_mail/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })

    if (!response.ok) {
      if (response.status === 404) {
        // Verificar si el error es 404
        throw new Error('Correo no encontrado') // Lanzar error personalizado para 404
      }

      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al enviar el correo.')
    }

    const data = await response.json()
    return { success: true, message: data.message || 'Correo enviado correctamente.' }
  } catch (error) {
    console.error('Error:', error)
    return { success: false, message: error.message, status: response ? response.status : null } // Usar response aquí
  }
}
