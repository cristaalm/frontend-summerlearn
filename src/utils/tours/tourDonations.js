// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourDonor = async (router, id) => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        popover: {
          title: 'Bienvenidos al perfil de donador',

          onNextClick: () => {
            router
              .push({ name: 'dashboard' })
              .then(() => {
                // Espera que la nueva vista se haya montado
                nextTick(() => {
                  driverObj.moveNext()
                })
              })
              .catch((err) => {
                console.error('Error al cambiar de ruta:', err)
              })
          }
        }
      },
      {
        element: '#uno',
        popover: {
          title: 'Grafica de barras',
          description: 'En esta grafica podras ver tus donaciones de manera mas general.'
        }
      },
      {
        element: '#dos',
        popover: {
          title: 'Filtrar por fecha',
          description: 'Puedes seleccionar para filtrar por dias, semanas y meses.'
        }
      },
      {
        element: '#tres',
        popover: {
          title: 'Barras de donaciones',
          description: 'Aqui se mostrara las donacion dependiendo a la opcion seleccionada.'
        }
      },
      {
        element: '#cuatro',
        popover: {
          title: 'Grafica de dona',
          description:
            'En esta seccion mostrara la relacion entre tus donaciones y los gastos hechos con ellas mismas.'
        }
      },
      {
        element: '#cinco',
        popover: {
          title: 'Relacion de donaciones',
          description:
            'Se mostrara en azul tus donaciones y en verde los gastos hecho con ellas y aparte cuanto de tus donaciones estan disponible.'
        }
      },
      {
        element: '#seis',
        popover: {
          title: 'Ultimas donaciones',
          description: 'Aqui se muestran las ultimas 6 donaciones.'
        }
      },
      {
        element: '#siete',
        popover: {
          title: 'Formato de donacione',
          description:
            'Se te mostrara la ultima donacion con su concepto, el monto y la fecha de realizacion.'
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
              .push({ name: 'donations' })
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
              .push({ name: 'dashboard' })
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
      },
      {
        element: '#nueve',
        popover: {
          title: 'Estadisticas de donaciones',
          description: 'Se muestra las donaciones de Lunes a Viernes.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#diez',
        popover: {
          title: 'Barras de donaciones',
          description:
            'Aqui se mostrara inforamacion relevante, como cantidad de donaciones, monto total, ultima donacion y la ultima fecha.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#once',
        popover: {
          title: 'Historial de donaciones',
          description: 'Se muestran el historia de todas tus donaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#doce',
        popover: {
          title: 'Buscar donaciones',
          description: 'Aqui podras buscar la donacion por su concepto.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#trece',
        popover: {
          title: 'Exportar donaciones',
          description: 'Aqui podras exportar en PDF o Excel tu historia de donaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#catorce',
        popover: {
          title: 'Donacion',
          description: 'Aqui se mostrar todas tu donaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#quince',
        popover: {
          title: 'Agregar donacion',
          description: 'En este boton podras hacer una nueva donacion.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#sideBar-chat',
        popover: {
          title: 'Estadisticas de donaciones',
          description: 'Se muestra las donaciones de Lunes a Viernes.',
          onNextClick: () => {
            router
              .push({ name: 'chat' })
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
              .push({ name: 'donations' })
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
        element: '#dieciseis',
        popover: {
          title: 'Panel de chat',
          description: 'Aqu podras alternar entre chats y los contectos.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#diecisiete',
        popover: {
          title: 'Chat',
          description:
            'Aqui sera la seccion donde se mostrara tus chat y llevaras tus conversaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#dieciocho',
        popover: {
          title: 'Buscar chat',
          description: 'Aqui puedes buscar el nombre del chat que ocupes.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#diecinueve',
        popover: {
          title: 'Lista de conversaciones',
          description: 'Se mostrara los contacto con los que has chateado.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#veinte',
        popover: {
          title: 'Finalizar tour',
          description: 'Espero que te haya gustado y tengas una lindas experiencia con nosotros.',
          onNextClick: async () => {
            // Marcar la función como async para poder usar await
            driverObj.destroy()

            try {
              const response = await fetch(`${Baseurl}users/${id}/`, {
                // Esperar la respuesta de fetch
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
