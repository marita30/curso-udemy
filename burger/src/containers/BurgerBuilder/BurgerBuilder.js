import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};



class BurgerBuilder extends Component {

    /* Este es una forma de hacer los ingredientes dinamicamente */

   /*  constructor(props){
        super(props);
        this.state = {...}
    } */

    /* Objeto */
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 4 /* precio base */

    }

    /* Agregar Ingrediente */
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; /* Primero calculamos el contador viejo. */
        const updatedCount= oldCount + 1; /*  despues /* actualizamos el contador viejo por updateCounted. */ 
        const updateIngredients = {
            ...this.state.ingredients /* los puntos son para distribuir las propiedades del antiguo estado de ingredientes. */
        };

        updateIngredients[type] = updatedCount; /* ACtualizar los ingredientes */

        const priceAddition = INGREDIENT_PRICES[type]; /* Precio de la matriz INGREDIENT_PRICES */

        const oldPrice = this.state.totalPrice; /* ver el valor viejo que es el precio base 4 del state */

        const newPrice = oldPrice + priceAddition; /* Calcular el precio nuevo  */

        this.setState({totalPrice: newPrice, ingredients: updateIngredients}); /* Establecer un estado , osea establecer el precio total para el nuevo precio de igual manera con os ingredientes.*/
    };

   /*  Eiminar ingrediente */
    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type]; /* Primero calculamos el contador viejo. */
        const updatedCount= oldCount - 1; /*  despues /* actualizamos el contador viejo por updateCounted. */ 
        const updateIngredients = {
            ...this.state.ingredients /* los puntos son para distribuir las propiedades del antiguo estado de ingredientes. */
        };

        updateIngredients[type] = updatedCount; /* ACtualizar los ingredientes */

        const priceDeduction= INGREDIENT_PRICES[type]; /* Precio de la matriz INGREDIENT_PRICES */

        const oldPrice = this.state.totalPrice; /* ver el valor viejo que es el precio base 4 del state */

        const newPrice = oldPrice - priceDeduction; /* Calcular el precio nuevo  */

        this.setState({totalPrice: newPrice, ingredients: updateIngredients});

    };


    render(){

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}/>
                   
            </Aux>
        );
    }

};


export default BurgerBuilder;   