import { type Icon } from '@/components/base/Lucide/Lucide.vue'; 
import { defineStore } from 'pinia';

// Función para obtener el rol del token desencriptado
async function getRoleFromToken(): Promise<string | null> {
    const encryptedToken = localStorage.getItem('access_token');

    if (encryptedToken) {
        try {
            // Split the token to access the payload
            const payloadBase64 = encryptedToken.split('.')[1]; // Get the payload (second element of JWT)
            const payloadJson = JSON.parse(atob(payloadBase64)); // Decode and convert to JSON object
            
            // Ensure that the role is present in the payload
            const encryptedRole = payloadJson.rol ? String(payloadJson.rol) : null; // Convert to string or assign null
            
            console.log("Rol encriptado:", encryptedRole);
            
            if (encryptedRole) {
                try {
                    // Prepare the request for decryption
                    const response = await fetch('http://127.0.0.1:8001/api/decrypt/', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem('access_token')}`

                        },
                        body: JSON.stringify({ encrypted_text: encryptedRole })
                    });

                    // Check if the response is ok
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    // Parse the JSON response
                    const data = await response.json();
                    const role = data.decrypted_text; // Adjust this depending on your API response structure
                    
                    console.log("Rol desencriptado:", role);
                    return role; // Return the decrypted role
                } catch (decryptError) {
                    console.error('Error al desencriptar el rol:', decryptError);
                    return null; // Handle error as needed
                }
            }
        } catch (error) {
            console.error('Error al procesar el access_token:', error);
            return null;
        }
    }
    return null; // If no token in localStorage
}


// Obtén el rol desde el token desencriptado
const role = await getRoleFromToken(); // await se pone para las
console.log("Rol desencriptado1:", role);

export interface Menu {
    icon: Icon;
    title: string;
    badge?: number;
    pageName?: string;
    subMenu?: Menu[];
    ignore?: boolean;
}

export interface MenuState {
    value: Array<Menu | string>;
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    value: [] // Menú vacío inicialmente
  }),

  actions: {
    async loadMenu() {
      const role = await getRoleFromToken(); // Llama a la función para obtener el rol desencriptado

      if (!role) {
        console.warn('No se pudo cargar el rol.');
        this.value = [];
        return;
      }

      // Construir el menú dependiendo del rol
      let menuItems: Array<Menu | string> = [];
      switch (role) {
        case '1':
          menuItems = [
            'GESTIÓN DE USUARIOS',
            {
              icon: 'SquareUser',
              pageName: 'users',
              title: 'Usuarios',
            },
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'Album',
              pageName: 'programs',
              title: 'Programas',
              subMenu: [
                {
                  icon: 'LayoutPanelTop',
                  pageName: 'areas',
                  title: 'Áreas',
                },
                {
                  icon: 'BookMarked',
                  pageName: 'activities',
                  title: 'Actividades',
                }
              ]
            },
            'GESTIÓN GENERAL',
            {
              icon: 'PiggyBank',
              pageName: 'donations',
              title: 'Donaciones',
              subMenu: [
                {
                  icon: 'ReceiptText',
                  pageName: 'expenses',
                  title: 'Gastos',
                }
              ]
            },
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones',
            },
            {
              icon: 'BarChartBig',
              pageName: 'performance',
              title: 'Desempeño',
            },
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat',
            }
          ];
          break;
        case '2':
          menuItems = [
            'GESTIÓN DE PROGRAMAS',
            {
              icon: 'Album',
              pageName: 'programs',
              title: 'Programas',
              subMenu: [
                {
                  icon: 'LayoutPanelTop',
                  pageName: 'areas',
                  title: 'Áreas',
                },
                {
                  icon: 'BookMarked',
                  pageName: 'activities',
                  title: 'Actividades',
                }
              ]
            },
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones',
            },
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat',
            }
          ];
          break;
        case '3':
          menuItems = [
            'GESTIÓN GENERAL',
            {
              icon: 'PiggyBank',
              pageName: 'donations',
              title: 'Donaciones',
              subMenu: [
                {
                  icon: 'ReceiptText',
                  pageName: 'expenses',
                  title: 'Gastos',
                }
              ]
            },
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat',
            }
          ];
          break;
        case '4':
          menuItems = [
            'GESTIÓN GENERAL',
            {
              icon: 'BookMarked',
              pageName: 'activities',
              title: 'Actividades-Vista',
            },
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones',
            },
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat',
            }
          ];
          break;
        case '5':
          menuItems = [
            'GESTIÓN GENERAL',
            {
              icon: 'BookMarked',
              pageName: 'activities',
              title: 'Actividades-Vista',
            },
            {
              icon: 'Notebook',
              pageName: 'subscriptions',
              title: 'Suscripciones',
            },
            {
              icon: 'MessagesSquare',
              pageName: 'chat',
              title: 'Chat',
            }
          ]
          break;
        default:
          console.warn('Rol desconocido:', role);
          break;
      }

      // Actualiza el estado del menú
      this.value = menuItems;
    }
  }
});
