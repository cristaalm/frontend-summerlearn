// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourCoord = async (router, id, formattedMenu, activeMobileMenu, showToast) => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Bienvenidos a tu perfil de coordinador',
          onPopoverRender: () => {
            router.push({ name: 'dashboard' }).then(() => {})
          }
        }
      },
      {
        element: '#table-performance',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Tabla de rendimiento',
          description: 'En esta tabla podrás ver el rendimiento de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          },
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de chat',
          description: 'En este menú podrás comunicarte con los usuarios de la plataforma.',
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
        element: '#sectionSelect',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Selección de apartado',
          description: 'Aquí puedes seleccionar entre los chats y los contactos.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#chatList',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Lista de chats',
          description:
            'Aquí será la seccion donde se mostrará tus chat y llevaras tus conversaciones.'
        }
      },
      {
        element: '#searchChat',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Buscador de chat',
          description: 'Podras buscar un chat en especifico.'
        }
      },
      {
        element: '#chat',
        popover: {
          prevBtnText: 'Anterior',
          doneBtnText: 'Finalizar',
          title: 'Chat',
          description: 'Aquí podrás ver el chat seleccionado y enviar mensajes.',
          onNextClick: async () => {
            router.push({ name: 'dashboard' }).then(() => {})
            // Marcar la función como async para poder usar await
            driverObj.destroy()

            showToast({ message: '¡Felicidades! Has completado el tour.', type: 'success' })

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
      }
    }
  })
  await nextTick()
  driverObj.drive()
}
