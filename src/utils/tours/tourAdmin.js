// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourAdmin = async (router, id, formattedMenu, activeMobileMenu, showToast) => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        popover: {
          title: 'Bienvenidos a tu perfil de administrador',
          onPopoverRender: () => {
            router.push('/dashboard').then(() => {})
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
        element: '#programList',
        popover: {
          title: 'Lista de programas',
          description: 'Una lista de los ultimos programas creados en la plataforma.'
        }
      },
      {
        element: '#donationsList',
        popover: {
          title: 'Lista de donaciones',
          description: 'Una lista de las ultimas donaciones realizadas en la plataforma.'
        }
      },
      {
        element: '#billsList',
        popover: {
          title: 'Lista de gastos',
          description: 'Una lista de los ultimos gastos generadas en la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.moveNext()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-users',
        popover: {
          title: 'Menu de usuarios',
          description: 'En este menu podras administrar los usuarios de la plataforma.',
          onNextClick: () => {
            // Asegúrate de manejar el avance al siguiente paso
            activeMobileMenu.value = false
            router.push('/dashboard/users').then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            router.push('/dashboard').then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#table-users',
        popover: {
          title: 'Tabla de usuarios',
          description: 'En esta tabla podras ver y gestionar los usuarios de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-add-user',
        popover: {
          title: 'Boton de agregar usuario',
          description: 'Con este boton podras agregar un nuevo usuario a la plataforma.',
          onNextClick: () => {
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'users'
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
        element: '#sideBar-users-request',
        popover: {
          title: 'Menu de solicitudes',
          description: 'En este menu podras gestionar las solicitudes de los usuarios.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push('/dashboard/users/request').then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'users' }).then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#table-users-request',
        popover: {
          title: 'Tabla de solicitudes',
          description: 'En esta tabla podras ver y gestionar las solicitudes de los usuarios.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-acept-request-user',
        popover: {
          title: 'Boton de aceptar solicitud',
          description: 'Con este boton podras aceptar la solicitud de un usuario.'
        }
      },
      {
        element: '#button-reject-request-user',
        popover: {
          title: 'Boton de rechazar solicitud',
          description:
            'Con este boton podras rechazar la solicitud de un usuario, Ten en cuenta que el usuario sera eliminado de la plataforma.',
          onNextClick: () => {
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'users'
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
        element: '#sideBar-programs',
        popover: {
          title: 'Menu de programas',
          description: 'En este menu podras administrar los programas de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'programs' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'users'
            })
            formattedMenu[index].activeDropdown = true
            setTimeout(() => {
              router.push({ name: 'users-request' }).then(() => {
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
          description: 'En esta tabla podras ver y gestionar los programas de la plataforma.',
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
          title: 'Boton de agregar programa',
          description: 'Con este boton podras agregar un nuevo programa a la plataforma.',
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
        element: '#sideBar-areas',
        popover: {
          title: 'Menu de areas',
          description: 'En este menu podras administrar las areas de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'areas' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'programs'
            })
            formattedMenu[index].activeDropdown = false
            setTimeout(() => {
              router.push({ name: 'programs' }).then(() => {
                driverObj.movePrevious()
              })
            }, 100)
          }
        }
      },
      {
        element: '#table-areas',
        popover: {
          title: 'Tabla de areas',
          description: 'En esta tabla podras ver y gestionar las areas de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-add-area',
        popover: {
          title: 'Boton de agregar area',
          description: 'Con este boton podras agregar una nueva area a la plataforma.',
          onNextClick: () => {
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
          title: 'Menu de actividades',
          description: 'En este menu podras administrar las actividades de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'activities' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'areas' }).then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#table-activities',
        popover: {
          title: 'Tabla de actividades',
          description: 'En esta tabla podras ver y gestionar las actividades de la plataforma.',
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
          title: 'Boton de agregar actividad',
          description: 'Con este boton podras agregar una nueva actividad a la plataforma.',
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
          title: 'Menu de rendimiento',
          description: 'En este menu podras ver el rendimiento de la plataforma.',
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
          description: 'En esta tabla podras ver el rendimiento de la plataforma.',
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
          title: 'Boton de agregar rendimiento',
          description: 'Con este boton podras agregar un nuevo rendimiento a la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.moveNext()
            }, 100)
          }
        }
      },
      {
        element: '#sideBar-donations',
        popover: {
          title: 'Menu de donaciones',
          description: 'En este menu podras administrar las donaciones de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'donations' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'performance' }).then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#donationsGraph',
        popover: {
          title: 'Donaciones semanales',
          description: 'Se mostrara estadisticas de las donaciones de la semana.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#bar-donations',
        popover: {
          title: 'Barras de donaciones',
          description:
            'Aqui se mostrara inforamacion relevante, como cantidad de donaciones, monto total, ultima donacion y la ultima fecha.'
        }
      },
      {
        element: '#table-donations',
        popover: {
          title: 'Historial de donaciones',
          description: 'Se muestran el historia de todas tus donaciones.'
        }
      },
      {
        element: '#button-add-donation',
        popover: {
          title: 'Boton de agregar donacion',
          description: 'Con este boton podras agregar una nueva donacion a la plataforma.',
          onNextClick: () => {
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'donations'
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
        element: '#sideBar-expenses',
        popover: {
          title: 'Menu de gastos',
          description: 'En este menu podras administrar los gastos de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'expenses' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'donations'
            })
            formattedMenu[index].activeDropdown = false
            setTimeout(() => {
              router.push({ name: 'donations' }).then(() => {
                driverObj.movePrevious()
              })
            }, 100)
          }
        }
      },
      {
        element: '#table-expenses',
        popover: {
          title: 'Tabla de gastos',
          description: 'En esta tabla podras ver y gestionar los gastos de la plataforma.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          }
        }
      },
      {
        element: '#button-add-expense',
        popover: {
          title: 'Boton de agregar gasto',
          description: 'Con este boton podras agregar un nuevo gasto a la plataforma.',
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
          title: 'Menu de chat',
          description: 'En este menu podras comunicarte con los usuarios de la plataforma.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'chat' }).then(() => {
              driverObj.moveNext()
            })
          },
          onPrevClick: () => {
            activeMobileMenu.value = false
            const index = formattedMenu.findIndex((item) => {
              return item.pageName === 'donations'
            })
            formattedMenu[index].activeDropdown = true
            setTimeout(() => {
              router.push({ name: 'expenses' }).then(() => {
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
            'Aqui sera la seccion donde se mostrara tus chat y llevaras tus conversaciones.'
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
          description: 'Aqui podras ver el chat seleccionado y enviar mensajes.',
          onNextClick: async () => {
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
