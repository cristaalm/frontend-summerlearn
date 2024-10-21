// services/bills/getExcel.js
import { Baseurl } from '@/utils/global'

export const getPDF = async () => {
  const response = await fetch(`${Baseurl}/performance-beneficiaries/exportar-pdf/`, {
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