const redux = require('redux');
const createStore = redux.createStore; //crear una tienda.

const initialState = {
    counter: 0
}


// Reducer

const rootReducer = (state = initialState, action) => {
    return state; //devuelve el estado que ya tenia.
}; //Es una funcion que recibe dos argumentos.


//Store

const store = createStore(rootReducer);
console.log(store.getState()); // extraera el estado de la tienda.





//Dispatching Action


//Subcription

