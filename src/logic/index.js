// aqui se importan y exportan las funciones de la carpeta logic
// para poder importarlas todas desde un solo lugar
import calculateAge from './calculateAge'

export { calculateAge }

// ejemplo de muchas funciones exportadas desde un solo lugar
/*
import { getUsers } from './users'
import { getRoles } from './roles'
import { getDonations } from './donations'
import { getVolunteers } from './volunteers'
import { getBeneficiaries } from './beneficiaries'
import { getCoordinators } from './coordinators'
import { getAdmins } from './admins'
import { getDonors } from './donors'
import { getEvents } from './events'

export {
    getUsers,
    getRoles,
    getDonations,
    getVolunteers,
    getBeneficiaries,
    getCoordinators,
    getAdmins,
    getDonors,
    getEvents
    }

    de esta manera se pueden importar todas las funciones desde un solo lugar
*/
