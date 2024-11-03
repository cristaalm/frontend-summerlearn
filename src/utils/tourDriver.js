// src/utils/tourDriver.js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { nextTick } from 'vue';

export const startTour = async (router) => {
    const driverObj = driver({
        showProgress: true,
        steps: [
            {
                popover: {
                    title: 'Bienvenidos al perfil de donador',
                    description: 'This is the first step. Next element will be loaded dynamically.',
                    onNextClick: () => {

                        router.push('/dashboard').then(() => {
                            // Espera que la nueva vista se haya montado
                            nextTick(() => {
                                driverObj.moveNext();
                            });
                        }).catch(err => {
                            console.error('Error al cambiar de ruta:', err);
                        });
                    },
                },
            },
            {
                element: '#uno',
                popover: {
                    title: 'Target Element',
                    description: 'Este es el elemento al que apuntamos.',
                },
            },
            {
                element: '#dos',
                popover: {
                    title: 'Target Element',
                    description: 'Este es el elemento al que apuntamos.',
                },
            },
            {
                element: '#tres',
                popover: {
                    title: 'Target Element',
                    description: 'Este es el elemento al que apuntamos.',
                },
            },
            {
                element: '#cuatro',
                popover: {
                    title: 'Target Element',
                    description: 'Este es el elemento al que apuntamos.',
                },
            },
            {
                element: '#cinco',
                popover: {
                    title: 'Target Element',
                    description: 'Este es el elemento al que apuntamos.',
                },
            },
            {
                element: '#seis',
                popover: {
                    title: 'Target Element',
                    description: 'Este es el elemento al que apuntamos.',
                },
            },
            {
                element: '#siete',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {
                        // Asegúrate de manejar el avance al siguiente paso
                        router.push('/dashboard/donations').then(() => {
                            // Espera que la nueva vista se haya montado
                            nextTick(() => {
                                driverObj.moveNext();
                            });
                        }).catch(err => {
                            console.error('Error al cambiar de ruta:', err);
                        });
                    },
                },
            },
            {
                element: '#ocho',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#nueve',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#diez',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#once',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#doce',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#trece',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#catorce',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#quince',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        router.push('/dashboard/chat').then(() => {
                            // Espera que la nueva vista se haya montado
                            nextTick(() => {
                                driverObj.moveNext();
                            });
                        }).catch(err => {
                            console.error('Error al cambiar de ruta:', err);
                        });
                    },
                },
            },
            {
                element: '#dieciseis',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#diecisiete',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#dieciocho',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
            {
                element: '#diecinueve',
                popover: {
                    title: 'Finalizando el paso siete',
                    description: 'Serás redirigido a otra vista.',
                    onNextClick: () => {

                        driverObj.moveNext();

                    },
                },
            },
        ]
    });
    await nextTick();
    driverObj.drive();
};
