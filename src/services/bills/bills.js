import { Baseurl } from "@/../global";


export const getBills = async () => {
    
    const response = await fetch(`${Baseurl}bills/`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    });


    const json = await response.json();
    const bills = json;

    console.log(json)

    return bills?.map(bill => ({
        id: bill.bills_id,
        concept: bill.bills_concept,
        date: bill.bills_date,
        donation: bill.bills_donations,
    }));   
}