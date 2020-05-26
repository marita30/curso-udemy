
// EXPORTANDO TODAS LAS ACCIONES.
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

/* Creacion del action create -- es slo una funcion que devuelve una accion o que crea una accion contra el nombre */

const increment = () => {
    return {
        type: INCREMENT

    };
};