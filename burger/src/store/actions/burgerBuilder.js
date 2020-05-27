

import * as actionTypes from './actionTypes';


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

