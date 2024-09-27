import { ref } from "vue";
import { Baseurl } from '@/../global';
import getIdByToken from '@/logic/getIdByToken';

export function useSetBill() {
    const setBillError = ref(null);

    const addBill = async (billData) => {
        const access_token = localStorage.getItem('access_token');
        const userId = getIdByToken(access_token).user_id;

        try {
            // Validación de datos
            if (!billData.concept || !billData.amount || !billData.date || !billData.donations) {
                throw new Error("Faltan datos requeridos");
            }

            const amount = parseFloat(billData.amount);
            if (isNaN(amount)) {
                throw new Error("El campo 'amount' debe ser un número válido.");
            }

            if (!Array.isArray(billData.donations) || billData.donations.length === 0) {
                throw new Error("El campo 'donations' debe ser un array y no estar vacío.");
            }

            // Agregar el gasto
            const response = await fetch(`${Baseurl}bills/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    bills_concept: billData.concept,
                    bills_date: billData.date,
                    bills_user: userId, // Envía el ID de usuario
                    bills_amount: amount,
                    bills_donations: billData.donations[0].id, // Solo se envía el ID de la primera donación
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error de servidor:", errorData);
                setBillError.value = errorData.message || "Error al registrar el gasto";
                return { success: false };
            }

            const data = await response.json();

            // Comienza la lógica para actualizar el spent en las donaciones
            let remainingAmount = amount;  // Variable que guardará el residuo del gasto

            const updatePromises = billData.donations.map(async (donation) => {
                if (remainingAmount <= 0) {
                    return { success: true }; // Si ya no queda gasto por aplicar, no se hace más
                }

                // Calcular cuánto podemos asignar a esta donación
                const availableAmount = donation.quanty - donation.spent; // Cantidad disponible para gastar
                const amountToUpdate = Math.min(remainingAmount, availableAmount); // La cantidad a asignar

                // Restar la cantidad aplicada al restante
                remainingAmount -= amountToUpdate;
                // Actualizamos el 'spent' de la donación
                const spentUpdateResponse = await fetch(`${Baseurl}donations/${donation.id}/`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}` // Incluir el token de acceso
                    },
                    body: JSON.stringify({
                        donations_spent: donation.spent + amountToUpdate, // Sumar el gasto a lo que ya tenía gastado
                    }),
                });

                if (!spentUpdateResponse.ok) {
                    const errorData = await spentUpdateResponse.json();
                    console.error("Error actualizando donación:", errorData);
                    setBillError.value = errorData.message || "Error al actualizar la donación";
                    return { success: false };
                }

                return { success: true }; 
            });

            // Esperar que todas las actualizaciones se completen
            const updateResults = await Promise.all(updatePromises);
            if (updateResults.some(result => !result.success)) {
                return { success: false };
            }

            return { success: true, data };
        } catch (error) {
            setBillError.value = error.message;
            return { success: false };
        }
    };

    return { addBill, setBillError };
}
