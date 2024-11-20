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
          },
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente'
        }
      },
      {
        element: '#usersStats',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Estadísticas de usuarios',
          description:
            'Se muestra la cantidad de usuarios registrados en la plataforma por cada rol.'
        }
      },
      {
        element: '#programList',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Lista de programas',
          description: 'Una lista de los últimos programas creados en la plataforma.'
        }
      },
      {
        element: '#donationsList',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Lista de donaciónes',
          description: 'Una lista de las últimas donaciónes realizadas en la plataforma.'
        }
      },
      {
        element: '#billsList',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Lista de gastos',
          description: 'Una lista de los últimos gastos generados en la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de usuarios',
          description: 'En este menú podrás administrar los usuarios de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Tabla de usuarios',
          description: 'En esta tabla podrás ver y gestionar los usuarios de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de agregar usuario',
          description: 'Con este botón podrás agregar un nuevo usuario a la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de solicitudes',
          description: 'En este menú podrás gestionar las solicitudes de los usuarios.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'users-request' }).then(() => {
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Tabla de solicitudes',
          description: 'En esta tabla podrás ver y gestionar las solicitudes de los usuarios.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de aceptar solicitud',
          description: 'Con este botón podrás aceptar la solicitud de un usuario.'
        }
      },
      {
        element: '#button-reject-request-user',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de rechazar solicitud',
          description:
            'Con este botón podrás rechazar la solicitud de un usuario, Ten en cuenta que el usuario será eliminado de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
        element: '#sideBar-areas',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de áreas',
          description: 'En este menú podrás administrar las áreas de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Tabla de áreas',
          description: 'En esta tabla podrás ver y gestionar las áreas de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de agregar área',
          description: 'Con este botón podrás agregar una nueva área a la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
            router.push({ name: 'areas' }).then(() => {
              driverObj.movePrevious()
            })
          }
        }
      },
      {
        element: '#table-activities',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
        element: '#buttonOptionsActivities',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Opciones de actividades',
          description:
            'Aqui puedes agregar los horarios, agregar los objetivos ademas de editar o eliminar la actividad.'
        }
      },
      {
        element: '#button-add-activity',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
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
        element: '#sideBar-donations',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de donaciónes',
          description: 'En este menú podrás administrar las donaciónes de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Donaciones semanales',
          description: 'Se mostrará estadísticas de las donaciónes de la semana.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Barras de donaciónes',
          description:
            'Aquí se mostrará inforamacion relevante, como cantidad de donaciónes, monto total, última donación y la última fecha.'
        }
      },
      {
        element: '#table-donations',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Historial de donaciónes',
          description: 'Se muestran el historia de todas tus donaciónes.'
        }
      },
      {
        element: '#button-add-donation',
        popover: {
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de agregar donación',
          description: 'Con este botón podrás agregar una nueva donación a la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Menú de gastos',
          description: 'En este menú podrás administrar los gastos de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Tabla de gastos',
          description: 'En esta tabla podrás ver y gestionar los gastos de la plataforma.',
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
          prevBtnText: 'Anterior',
          nextBtnText: 'Siguiente',
          title: 'Botón de agregar gasto',
          description: 'Con este botón podrás agregar un nuevo gasto a la plataforma.',
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
