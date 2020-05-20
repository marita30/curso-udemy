import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat:0
    },
    totalPrice: 4
};

const reducer  = (state= initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 /* en el primer [action.ingredientName] recibimos la llave de los ingredients bacon, salad, etc y luego de los : recibimos el valor + 1 */
                }

            };
        case actionTypes.REMOVE_INGREDIENT:
            return {

            };
        default: 
            return state;
    }
};


export default reducer;