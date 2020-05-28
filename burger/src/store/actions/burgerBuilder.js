
import * as actionTypes from './actionTypes';
/* Axios */
import axios from '../../axios-orders';


/* Add Ingredients */

export const addIngredients = (ingsName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingsName
    }
};

/* Remove ingredients */

export const removeIngredients= (ingsName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingsName
    }
};


/* Utilizando thunk  */
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients

    };
};

/* Error */
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

/* Utilizando thunk  para codigo asincrono*/

export const initIngredients = () => {
    return dispatch =>  {
        axios.get('https://burger-1e5b1.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        }); 

    }
}
