import { Baseurl } from '@/../global';

export const recoveryPassword = async (key, password) => {
    try {
        const response = await fetch(`${Baseurl}update_password/${key}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password, // Envía la nueva contraseña
            }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el correo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null; // Retorna null en caso de error
    }
};
