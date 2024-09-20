import { ref } from "vue";
import { getBills } from '@/services/bills/bills';

export function useBills() {
    const bills = ref([]);
    const loading = ref(false);
    const error = ref(null);


    const loadBills = async () => {
        loading.value = true;
        try {
            bills.value = await getBills();
            console.log(bills.value);
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    };

    return { bills, loading, error, loadBills };
}