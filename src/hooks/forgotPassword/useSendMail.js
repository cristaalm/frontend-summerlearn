import { Baseurl } from '@/../global';

export const sendMail = async (email) => {
    console.log(email);
    try {
        const response = await fetch(`${Baseurl}send_mail/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }), // Asegúrate de convertir el objeto en JSON
        });

        if (!response.ok) {
            const errorData = await response.json(); // Asumiendo que el backend retorna un JSON con información del error
            throw new Error(errorData.message || 'Error al enviar el correo'); // Mensaje de error adecuado
        }

        // Si la respuesta es exitosa, puedes retornar algún dato o mensaje
        const data = await response.json();
        return { success: true, message: data.message || 'Correo enviado correctamente' }; // Retornar mensaje de éxito

    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: error.message }; // Retornar mensaje de error
    }
};
