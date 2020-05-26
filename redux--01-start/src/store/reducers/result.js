import * as actionTypes from '../actions/actionTypes';


const initialState = {
    results: []
}

const reducer  = (state = initialState, action) => {

    switch (action.type){
        
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result}) /* utilizamos concat para actualizar la matriz, es casi igual a push , pero lo que hace push es que toca el resultado original en el state original y concat no , entonces le decimos que le pase a la matriz results(state.counter). */

            }
        case actionTypes.DELETE_RESULT:
            /* const id = 1;
            /* copia de mi matriz results */
            /* const newArray = [...state.results];
            newArray.splice(id,1)  */
            //metodo de carpeta.
            const updatedArray = state.results.filter(result => result.id !== action.resultElId); /* filter devuelve una nueva matriz, no toca la anterior, devuelve una nueva filtrada 
            por lo tanto metemelo los id    ue sean diferente con action.resultELId  FILTER ES COMO UN SELECT*/
            return {
                ...state,
                results: updatedArray
            }
    }
   

    return state;
}

export default reducer;