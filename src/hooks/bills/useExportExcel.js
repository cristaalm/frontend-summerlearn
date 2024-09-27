// hooks/bills/useExportExcel.js
import { ref } from 'vue'
import { getExcel } from '@/services/bills/getExcel'

export function useExportExcel({ showToast }) {
  const loadingExportExcel = ref(false)
  const errorExportExcel = ref('')

  const loadExportExcel = async () => {
    loadingExportExcel.value = true
    errorExportExcel.value = ''
    showToast('Generando archivo Excel...')

    try {
      const blob = await getExcel()

      // Crear una URL temporal para el blob
      const url = window.URL.createObjectURL(blob)

      // Crear un elemento <a> temporal para iniciar la descarga
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'bills.xlsx') // Nombre del archivo descargado

      // Hacer clic en el enlace para iniciar la descarga
      link.click()

      // Liberar la URL del objeto
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      errorExportExcel.value = 'Error al exportar a Excel'
      console.error(errorExportExcel.value)
    } finally {
      loadingExportExcel.value = false
    }
  }

  return {
    loadExportExcel,
    loadingExportExcel,
    errorExportExcel
  }
}
