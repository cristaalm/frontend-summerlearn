// hooks/bills/useExportExcel.js
import { ref, inject } from 'vue'
import { getExcel } from '@/services/actividades/getExcel'

export function useExportExcel() {
  const loadingExportExcel = ref(false)
  const errorExportExcel = ref('')
  const showToast = inject('showToast')

  const loadExportExcel = async () => {
    loadingExportExcel.value = true
    errorExportExcel.value = ''
    showToast({ message: 'Generando archivo Excel...', type: 'info' })

    try {
      const blob = await getExcel()

      // Crear una URL temporal para el blob
      const url = window.URL.createObjectURL(blob)

      // Crear un elemento <a> temporal para iniciar la descarga
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'actividades.xlsx') // Nombre del archivo descargado

      // Hacer clic en el enlace para iniciar la descarga
      link.click()

      // Liberar la URL del objeto
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      errorExportExcel.value = 'Error al exportar a Excel'
      showToast({ message: errorExportExcel.value, type: 'error' })
    } finally {
      loadingExportExcel.value = false
    }
  }

  return {
    loadExportExcel,
    loadingExportExcel
  }
}
