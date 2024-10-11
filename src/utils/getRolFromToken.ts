import { Baseurl } from '@/utils/global'

export async function getRoleFromToken(): Promise<string | null> {
  const encryptedToken = localStorage.getItem('access_token')

  if (encryptedToken) {
    try {
      // Split the token to access the payload
      const payloadBase64 = encryptedToken.split('.')[1] // Get the payload (second element of JWT)
      const payloadJson = JSON.parse(atob(payloadBase64)) // Decode and convert to JSON object

      // Ensure that the role is present in the payload
      const encryptedRole = payloadJson.rol ? String(payloadJson.rol) : null // Convert to string or assign null

      if (encryptedRole) {
        try {
          // Prepare the request for decryption
          const response = await fetch(`${Baseurl}api/decrypt/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ encrypted_text: encryptedRole })
          })

          // Check if the response is ok
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          // Parse the JSON response
          const data = await response.json()
          const role = data.decrypted_text // Adjust this depending on your API response structure
          return role // Return the decrypted role
        } catch (decryptError) {
          console.error('Error al desencriptar el rol:', decryptError)
          return null // Handle error as needed
        }
      }
    } catch (error) {
      console.error('Error al procesar el access_token:', error)
      return null
    }
  }
  return null // If no token in localStorage
}
