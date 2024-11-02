import { ref, inject } from 'vue'
import { getBills } from '@/services/bills/bills'
import { Baseurl } from '@/utils/global'

export function useBills() {
  const bills = ref([])
  const loadingBills = ref(false)
  const errorBills = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadBills = async () => {
    if (loadingBills.value) return
    if (firstLoad.value) {
      loadingBills.value = true
      firstLoad.value = false
    }
    try {
      bills.value = await getBills()
    } catch (e) {
      errorBills.value = e
      showToast({ message: 'A ocurrido un error al cargar los gastos', type: 'error' })
    } finally {
      loadingBills.value = false
    }
  }

  /*********************************************************/
  const deleteBill = async (bills_id) => {
    try {
      const response = await fetch(`${Baseurl}/bills/${bills_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la factura')
      }

      // Opcionalmente, puedes recargar la lista de facturas después de eliminar
      loadBills() // O manejarlo según tu lógica
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return { bills, loadingBills, loadBills, deleteBill, errorBills }
}
