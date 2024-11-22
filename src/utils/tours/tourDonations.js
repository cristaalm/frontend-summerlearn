// src/utils/tourDriver.js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { nextTick } from 'vue'
import { Baseurl } from '@/utils/global'

export const startTourDonor = async (router, id, formattedMenu, activeMobileMenu, showToast) => {
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
        element: '#graficaBarra',
        popover: {
          title: 'Grafica de barras',
          description: 'En esta grafica podras ver tus donaciones de manera mas general.'
        }
      },
      {
        element: '#filtrarFecha',
        popover: {
          title: 'Filtrar por fecha',
          description: 'Puedes seleccionar para filtrar por dias, semanas y meses.'
        }
      },
      {
        element: '#barraDonaciones',
        popover: {
          title: 'Barras de donaciones',
          description: 'Aqui se mostrara las donacion dependiendo a la opcion seleccionada.'
        }
      },
      {
        element: '#graficaDona',
        popover: {
          title: 'Grafica de dona',
          description:
            'En esta seccion mostrara la relacion entre tus donaciones y los gastos hechos con ellas mismas.'
        }
      },
      {
        element: '#relacionDonaciones',
        popover: {
          title: 'Relacion de donaciones',
          description:
            'Se mostrara en azul tus donaciones y en verde los gastos hecho con ellas y aparte cuanto de tus donaciones estan disponible.'
        }
      },
      {
        element: '#ultimasDonaciones',
        popover: {
          title: 'Ultimas donaciones',
          description: 'Aqui se muestran las ultimas 6 donaciones.'
        }
      },
      {
        element: '#formatoDonacion',
        popover: {
          title: 'Formato de donaciones',
          description:
            'Se te mostrara la ultima donacion con su concepto, el monto y la fecha de realizacion.',
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
          title: 'Donaciones',
          description: 'Entramos al apartado de donaciones.',
          onNextClick: () => {
            activeMobileMenu.value = false
            router.push({ name: 'donations' }).then(() => {
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
        element: '#donacionSemanal',
        popover: {
          title: 'Donaciones semanales',
          description: 'Se mostrara estadisticas de las donaciones de la semana.',
          onPrevClick: () => {
            activeMobileMenu.value = true
            setTimeout(() => {
              driverObj.movePrevious()
            }, 100)
          },
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#estadisticasDonaciones',
        popover: {
          title: 'Estadisticas de donaciones',
          description: 'Se muestra las donaciones de Lunes a Viernes.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#barDonaciones',
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
        element: '#historialDonaciones',
        popover: {
          title: 'Historial de donaciones',
          description: 'Se muestran el historia de todas tus donaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#buscarDonaciones',
        popover: {
          title: 'Buscar donaciones',
          description: 'Aqui podras buscar la donacion por su concepto.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#exportarDonaciones',
        popover: {
          title: 'Exportar donaciones',
          description: 'Aqui podras exportar en PDF o Excel tu historia de donaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#donacion',
        popover: {
          title: 'Donacion',
          description: 'Aqui se mostrar todas tu donaciones.',
          onNextClick: () => {
            driverObj.moveNext()
          }
        }
      },
      {
        element: '#agregarDonacion',
        popover: {
          title: 'Agregar donacion',
          description: 'En este boton podras hacer una nueva donacion.',
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
              router.push({ name: 'donations' }).then(() => {
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
