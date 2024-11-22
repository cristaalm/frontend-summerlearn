// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourBenef = async (router, id, formattedMenu, activeMobileMenu, showToast) => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        // 0
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Bienvenidos a tu perfil de Beneficiario',
          onPopoverRender: () => {
            router.push({ name: 'dashboard' }).then(() => {})
          }
        }
      },
      {
        // 1
        element: '#containerChildren',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Niños registrados',
          description: 'Aquí podrás ver tus hijos registrados en la plataforma.',
          onNextClick: () => {
            // verificamos si existe un id llamado children
            if (document.getElementById('children')) {
              // si existe, lo seleccionamos, continuamos con el tour normal
              driverObj.moveNext()
            } else {
              // si no existe, saltamos al siguiente paso
              driverObj.moveTo(5)
            }
          }
        }
      },
      {
        // 2
        element: '#btnGrade',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de calificaciones',
          description: 'Aquí podrás ver las calificaciones de tus hijos.'
        }
      },
      {
        // 3
        element: '#btnEdit',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de editar',
          description: 'Aquí podrás editar los datos de tus hijos.'
        }
      },
      {
        // 4
        element: '#btnDelete',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de eliminar',
          description: 'Aquí podrás eliminar a tus hijos de la plataforma.'
        }
      },
      {
        // 5
        element: '#btnAddChild',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de agregar hijo',
          description: 'Aquí podrás agregar a tus hijos a la plataforma.',
          onPrevClick: () => {
            // verificamos si existe un id llamado btnDelete
            if (document.getElementById('btnDelete')) {
              // si existe, lo seleccionamos, continuamos con el tour normal
              driverObj.movePrevious()
            } else {
              // si no existe, saltamos al paso anterior
              driverObj.moveTo(1)
            }
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
        // 6
        element: '#sideBar-programsActivities',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de programas',
          description: 'En este menú podrás ver los programas disponibles para tus hijos.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'programsActivities' }).then(() => {
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
        // 7
        element: '#containerProgramsActivities',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Programas y actividades',
          description:
            'Aquí podrás ver los programas y actividades disponibles para tus hijos por área.',
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
              router.push({ name: 'programsActivities' }).then(() => {
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
