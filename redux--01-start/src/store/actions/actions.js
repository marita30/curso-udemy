
// EXPORTANDO TODAS LAS ACCIONES.
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

/* Creacion del action create -- es slo una funcion que devuelve una accion o que crea una accion contra el nombre */

export const increment = () => {
    return {
        type: INCREMENT

    };
};

export const decrement = () => {
    return {
        type: DECREMENT

    };
};

export const add = (valor) => {
    return {
        type: ADD,
        value: valor

    };
};

export const subtract = (valor) => {
    return {
        type: SUBTRACT,
        value: valor

    };
};
/* Para la configuracion del redux-thunk */
export const saveResult = (res) => {
    return {
        type: STORE_RESULT,
        result: res 
    }
}

export const storeResult= (res) => {
    return dispatch => {
         /* Configurando para qejecutar los tiemposde espera y solo despues de dos segundos queremos almacenar el resultado */
        setTimeout(() => {
            dispatch(saveResult(res))
    
         },2000);

    }

};

export const deleteResult= (resElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resElId

    };
};