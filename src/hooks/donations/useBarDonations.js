export function useBarDonations(donations) {

    // Dinero Total donado y total de donaciones

    let totalDonations = 0
    let totalDonated = 0

    for (let i in donations) {
        totalDonations += donations[i].quanty
        totalDonated += 1
    }

    // Ultima donacion

    const lastDonation = donations[donations.length - 1]
    const lastDonationDate = lastDonation.date
    const lastDonationAmount = lastDonation.quanty

    // List

    const list = {
            lastDonationDate: lastDonationDate,
            lastDonationAmount: lastDonationAmount,
            totalDonations: totalDonations,
            totalDonated: totalDonated
        }

    
    return list
}