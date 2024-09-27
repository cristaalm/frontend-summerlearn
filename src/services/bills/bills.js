import { Baseurl } from "@/../global";


export const getBills = async () => {
    
    const response = await fetch(`${Baseurl}bills/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    });


    const json = await response.json();
    const bills = json;

    return bills?.map(bill => ({
        id: bill.bills_id,
        concept: bill.bills_concept,
        date: bill.bills_date,
        amount: bill.bills_amount,
        donation: bill.bills_donations,
    }));   
}