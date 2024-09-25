import { Baseurl } from '@/../global';

export const getDonationsFilter = async () => {
  const response = await fetch(`${Baseurl}donations/available-donations/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  });

  const json = await response.json();

  // Supongo que 'spent' es una propiedad adicional que se encuentra en cada donación en el JSON
  return json?.map((donation) => {
    const spent = donation.donations_spent || 0; // Valor gastado, por defecto 0 si no está disponible
    const remaining = donation.donations_quantity - spent; // Calculamos la cantidad restante

    return {
      id: donation.donations_id,
      concept: donation.donations_concept,
      quanty: donation.donations_quantity,
      spent: spent, // Incluimos la cantidad gastada
      remaining: remaining, // Residuo o cantidad restante
      date: donation.donations_date,
      user: donation.donations_user,
    };
  }) || []; // Asegúrate de devolver un array vacío si no hay datos
};
