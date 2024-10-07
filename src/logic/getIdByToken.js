export default function parseJwt(token) {
  // Divide el token en sus tres partes
  const base64Url = token.split('.')[1]

  // Reemplaza caracteres no válidos en base64
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  // Decodifica la cadena base64 a un objeto JSON
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload) // Retorna el payload como un objeto
}
