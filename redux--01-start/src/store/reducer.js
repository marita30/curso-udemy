import * as actionTypes from './actions';


const initialState = {
    counter:0,
    results: []
}

const reducer  = (state = initialState, action) => {

    switch (action.type){

        case actionTypes.INCREMENT:
            
            const newState = Object.assign({}, state); /* lo que hace esto es que paso un object vacio, y el antiguo object que queremos copiar como el segundo state. */
            newState.counter = state.counter + 1
            return newState;

        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }   
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter}) /* utilizamos concat para actualizar la matriz, es casi igual a push , pero lo que hace push es que toca el resultado original en el state original y concat no , entonces le decimos que le pase a la matriz results(state.counter). */

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