import { ref } from 'vue'
import { getDonations } from '@/services/donations/donations'
import { useBarDonations } from './useBarDonations'
import { Baseurl } from '@/utils/global'
import { useGraphicDonations } from './useGraphiDonation'

export function useDonations() {
  const donations = ref([]);
  const loading = ref(false);
  const errorDonations = ref(null);
  let barDonations = ref({});
  let graphicDonations = ref({});
  // Inicializa graphicDonations con valores predeterminados
 

  const loadDonations = async () => {
    loading.value = true;
    try {
      donations.value = await getDonations();
      barDonations.value = useBarDonations(donations.value);
      graphicDonations.value = useGraphicDonations(donations.value);
    } catch (e) {
      errorDonations.value = e;
    } finally {
      loading.value = false;
    }
  }

  const deleteDonation = async (donations_id) => {
    try {
      const response = await fetch(`${Baseurl}/donations/${donations_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la donación');
      }

      // Opcionalmente, puedes recargar la lista de donaciones después de eliminar
      loadDonations(); // O manejarlo según tu lógica
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return { graphicDonations, barDonations, donations, loading, errorDonations, loadDonations, deleteDonation };
}
