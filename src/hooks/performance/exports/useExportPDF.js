// hooks/bills/useExportExcel.js
import { inject, ref } from 'vue'
import { getPDF } from '@/services/performance/getPdf'

export function useExportPDF() {
  const loadingExportPDF = ref(false)
  const errorExportPDF = ref('')
  const showToast = inject('showToast')
  
  const loadExportPDF = async () => {
    loadingExportPDF.value = true
    errorExportPDF.value = ''
    showToast({ message: 'Generando archivo PDF...', tipo: 'info' })

    try {
      const blob = await getPDF()

      // Crear una URL temporal para el blob
      const url = window.URL.createObjectURL(blob)

      // Crear un elemento <a> temporal para iniciar la descarga
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'performance.pdf') // Nombre del archivo descargado

      // Hacer clic en el enlace para iniciar la descarga
      link.click()

      // Liberar la URL del objeto
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      errorExportPDF.value = 'Error al exportar a PDF'
      showToast({ message: errorExportPDF.value, tipo: 'error' })
    } finally {
      loadingExportPDF.value = false
    }
  }

  return {
    loadExportPDF,
    loadingExportPDF
  }
}