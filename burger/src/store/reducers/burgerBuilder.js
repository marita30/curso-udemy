import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4, 
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer  = (state= initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 /* en el primer [action.ingredientName] recibimos la llave de los ingredients bacon, salad, etc y luego de los : recibimos el valor + 1 */
                },
                /* Actualizar el precio */
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 /* en el primer [action.ingredientName] recibimos la llave de los ingredients bacon, salad, etc y luego de los : recibimos el valor + 1 */
                },
                /* Actualizar el precio */
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            };
            /* Llamamos a los ingredientes establecidos */
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false

            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }

        default: 
            return state;
    }
};


export default reducer;