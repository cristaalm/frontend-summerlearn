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
          title: 'Bienvenidos a tu perfil de coordinador',
          onPopoverRender: () => {
            router.push('/dashboard').then(() => {})
          }
        }
      },
      {
        element: '#programsAsignedList',
        popover: {
          title: 'Lista de programas asignados',
          description: 'Aquí podrás ver los programas que tienes asignados.'
        }
      },
      {
        element: '#programList',
        popover: {
          title: 'Lista de programas',
          description: 'Una lista de los últimos programas creados en la plataforma.'
        }
      },
      {
        element: '#activitiesList',
        popover: {
          title: 'Lista de actividades',
          description: 'Una lista de las últimas actividades creadas en la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.moveNext()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-subscriptions',
        popover: {
          title: 'Menú de suscripciones',
          description: 'En este menú podrás administrar las suscripciones de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'subscriptions' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'dashboard' }).then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#containerSubscriptions',
        popover: {
          title: 'Tabla de suscripciones',
          description: 'En esta tabla podrás ver y gestionar las suscripciones de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-programs',
        popover: {
          title: 'Menú de programas',
          description: 'En este menú podrás administrar los programas de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'programs' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            setTimeout(() => {
              router.push({ name: 'subscriptions' }).then(() => {
                driverObj.movePrevious()
              })
            }, 100)
          }
        }
      },
      {
        element: '#table-programs',
        popover: {
          title: 'Tabla de programas',
          description: 'En esta tabla podrás ver y gestionar los programas de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-add-program',
        popover: {
          title: 'Botón de agregar programa',
          description: 'Con este botón podrás agregar un nuevo programa a la plataforma.',
          onNextClick: () => {
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'programs'
            })
            formattedMenu[index].activeDropdown = true
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.moveNext()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-activities',
        popover: {
          title: 'Menú de actividades',
          description: 'En este menú podrás administrar las actividades de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'activities' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'programs' }).then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#table-activities',
        popover: {
          title: 'Tabla de actividades',
          description: 'En esta tabla podrás ver y gestionar las actividades de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-add-activity',
        popover: {
          title: 'Botón de agregar actividad',
          description: 'Con este botón podrás agregar una nueva actividad a la plataforma.',
          onNextClick: () => {
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'programs'
            })
            formattedMenu[index].activeDropdown = false
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
          title: 'Menú de rendimiento',
          description: 'En este menú podrás ver el rendimiento de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'performance' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'programs'
            })
            formattedMenu[index].activeDropdown = true
            setTimeout(() => {
              router.push({ name: 'activities' }).then(() => {
                driverObj.movePrevious()
              })
            }, 100)
          }
        }
      },
      {
        element: '#table-performance',
        popover: {
          title: 'Tabla de rendimiento',
          description: 'En esta tabla podrás ver el rendimiento de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-add-performance',
        popover: {
          title: 'Botón de agregar rendimiento',
          description: 'Con este botón podrás agregar un nuevo rendimiento a la plataforma.',
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
          title: 'Lista de chats',
          description:
            'Aquí será la seccion donde se mostrará tus chat y llevaras tus conversaciones.'
        }
      },
      {
        element: '#searchChat',
        popover: {
          title: 'Buscador de chat',
          description: 'Podras buscar un chat en especifico.'
        }
      },
      {
        element: '#chat',
        popover: {
          title: 'Chat',
          description: 'Aquí podrás ver el chat seleccionado y enviar mensajes.',
          onNextClick: async () => {
            router.push('/dashboard').then(() => {})
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
              } else {
                console.log('Tour actualizado exitosamente')
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
