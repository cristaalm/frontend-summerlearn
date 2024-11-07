// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourAdmin = async (router, id) => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        popover: {
          title: 'Bienvenidos a tu perfil de administrador',
          onPopoverRender: () => {
            router
              .push('/dashboard')
              .then(() => {
                // Espera que la nueva vista se haya montado
              })
              .catch((err) => {
                console.error('Error al cambiar de ruta:', err)
              })
          }
        }
      },
      {
        element: '#usersStats',
        popover: {
          title: 'Estadisticas de usuarios',
          description:
            'Se muestra la cantidad de usuarios registrados en la plataforma por cada rol.'
        }
      },
      {
        element: '#sideBar-donations',
        popover: {
          title: 'Estadisticas de donaciones',
          description: 'Se muestra las donaciones de Lunes a Viernes.',
          onNextClick: () => {
            // Asegúrate de manejar el avance al siguiente paso
            router
              .push('/dashboard/donations')
              .then(() => {
                // Espera que la nueva vista se haya montado
                nextTick(() => {
                  driverObj.moveNext()
                })
              })
              .catch((err) => {
                console.error('Error al cambiar de ruta:', err)
              })
          },
          onPrevClick: () => {
            // Asegúrate de manejar el retroceso al paso anterior
            router
              .push('/dashboard')
              .then(() => {
                // Espera que la nueva vista se haya montado
                nextTick(() => {
                  driverObj.movePrevious()
                })
              })
              .catch((err) => {
                console.error('Error al cambiar de ruta:', err)
              })
          }
        }
      },
      {
        element: '#ocho',
        popover: {
          title: 'Donaciones semanales',
          description: 'Se mostrara estadisticas de las donaciones de la semana.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      }
    ],

    onDestroyStarted: async () => {
      if (driverObj.hasNextStep()) {
        driverObj.destroy()

        try {
          const response = await fetch(`${Baseurl}users/${id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ users_tour: true })
          })

          if (!response.ok) {
            throw new Error('Error al actualizar el tour')
          }
        } catch (error) {
          console.error('Error en la solicitud PATCH:', error)
        }
      }
    }
  })
  await nextTick()
  driverObj.drive()
}
