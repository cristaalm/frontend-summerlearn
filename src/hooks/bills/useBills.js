import { ref } from 'vue'
import { getBills } from '@/services/bills/bills'
import { Baseurl } from '@/../global';

export function useBills() {
  const bills = ref([])
  const loading = ref(false)
  const errorBills = ref(null)

  const loadBills = async () => {
    loading.value = true
    try {
      bills.value = await getBills()
      console.log(bills.value)
    } catch (e) {
      errorBills.value = e
    } finally {
      loading.value = false
    }
  }

  const deleteBill = async (bills_id) => {
    try {
        const response = await fetch(`${Baseurl}/bills/${bills_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la factura');
        }

        // Opcionalmente, puedes recargar la lista de facturas después de eliminar
        loadBills(); // O manejarlo según tu lógica
    } catch (error) {
        console.error('Error:', error);
    }
};

    return { bills, loading, loadBills, deleteBill, errorBills };
}
