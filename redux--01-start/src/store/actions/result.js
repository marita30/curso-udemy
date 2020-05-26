import * as actionTypes from './actionTypes';

/* Para la configuracion del redux-thunk */
export const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res 
    }
}

export const storeResult= (res) => {
    return (dispatch, getState) => {
        /* obteniendo el contador antiguo ejecutando el estado get  */
        const oldCounter = getState().ctr.counter;
        console.log(oldCounter);
         /* Configurando para qejecutar los tiemposde espera y solo despues de dos segundos queremos almacenar el resultado */
        setTimeout(() => {
            dispatch(saveResult(res))
    
         },2000);

    }

};

export const deleteResult= (resElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId

    };
};