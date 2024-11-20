// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourVolun = async (router, id, formattedMenu, activeMobileMenu, showToas) => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        popover: {
          title: 'Bienvenidos al perfil de voluntario',

          onNextClick: () => {
            router
              .push('/dashboard')
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
        element: '#PanelVoluntario',
        popover: {
          title: 'Vista de actividades',
          description: 'En esta seccion veras las actividades en las que estas suscrito.'
        }
      },
      {
        element: '#buscarActividades',
        popover: {
          title: 'Buscar actividades',
          description: 'Puedes buscar las actividades.'
        }
      },
      {
        element: '#filtrarActividades',
        popover: {
          title: 'Filtro de actividades',
          description: 'Aqui se puede filtrar las actividades dependiendo al area.'
        }
      },
      {
        element: '#cardActividades',
        popover: {
          title: 'Tarjeta de actividades',
          description:
            'Puedes ver con mas detalle la informacion del programa como el horario, el objetivo y los niños suscrito a esa actividad.'
        }
      },
      {
        element: '#suscritoActividades',
        popover: {
          title: 'Suscribirse a actividades',
          description: 'En este boton podras suscribirte a una actividad si es que no te has suscrito.',
          onNextClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.moveNext()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-performance',
        popover: {
          title: 'Desempeño',
          description: 'Entramos al apartado de desempeño.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'performance' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            setTimeout(() => {
              router.push({ name: 'dashboard' }).then(() => {
                driverObj.movePrevious()
              })
            }, 100)
          }
          
        }
      },
      {
        element: '#filtrarCalf',
        popover: {
          title: 'Buscar alumnos',
          description: 'En este campo podras buscar el nombre del estudiante.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#table-performance',
        popover: {
          title: 'Tabla de desempeño de los alumnos',
          description: 'Se muestra la tabla donde salen todos los alumnos y se muestran el nombre, la actividad y la calificacion correspondiente.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#addCalf',
        popover: {
          title: 'Calificaciones',
          description:
            'Aqui se mostrara las calificaciones o podras asignar calificaciones si es que no se le ha asignado una.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#btnIndividual',
        popover: {
          title: 'Boton de calificaciones',
          description: 'En este boton podras asignar la calificacion de un solo alumno, si en caso de que ya tenga una, solo mostrara un texto de calificado.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#btnAll',
        popover: {
          title: 'Guardad todas las calificaciones',
          description: 'Aqui podras asignar calificaciones a todo los alumnos en general.',
          onNextClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.moveNext()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-chat',
        popover: {
          title: 'Panel de chat',
          description: 'Aqui sera la seccion donde se mostrara tus chat y llevaras tus conversaciones.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'chat' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            setTimeout(() => {
              router.push({ name: 'performance' }).then(() => {
                driverObj.movePrevious()
              })
            }, 100)
          }
        }
      },
      {
        element: '#chat',
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
        element: '#panelContactos',
        popover: {
          title: 'Contactos',
          description:
            'Aqui sera la seccion donde podras ver tus contactos con los que podras chatear.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#buscarChat',
        popover: {
          title: 'Buscar chat',
          description: 'Aqui puedes buscar el nombre del chat que ocupes.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#listaConversaciones',
        popover: {
          title: 'Lista de conversaciones',
          description: 'Se mostrara los contacto con los que has chateado.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
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
