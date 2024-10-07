// services/bills/getExcel.js
import { Baseurl } from '@/../global'

export const getExcel = async () => {
  const response = await fetch(`${Baseurl}/bills/exportar-excel/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const blob = await response.blob()
  return blob
}
