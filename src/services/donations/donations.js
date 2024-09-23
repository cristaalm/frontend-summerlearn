import { Baseurl } from '@/../global';

export const getDonations = async () => {
  const response = await fetch(`${Baseurl}donations/`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  const json = await response.json();
  return json?.map((donation) => ({
    id: donation.donations_id,
    concept: donation.donations_concept,
    quanty: donation.donations_quantity,
    date: donation.donations_date,
    user: donation.donations_user,
  })) || []; // Asegúrate de devolver un array vacío si no hay datos
};
