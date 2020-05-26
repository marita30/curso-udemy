import * as actionTypes from './actionTypes';

/* Creacion del action create -- es solo una funcion que devuelve una accion o que crea una accion contra el nombre */

export const increment = () => {
    return {
        type: actionTypes.INCREMENT

    };
};

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT

    };
};

export const add = (valor) => {
    return {
        type: actionTypes.ADD,
        value: valor

    };
};

export const subtract = (valor) => {
    return {
        type: actionTypes.SUBTRACT,
        value: valor

    };
};