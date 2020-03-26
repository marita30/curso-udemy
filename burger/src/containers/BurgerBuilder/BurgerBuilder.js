import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

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

        totalPrice: 4, /* precio base */
        purchasable: false ,/* se convierte en verdad cuando podemos comprar una hamburguesa osea que la ahmburguesa tenga al menos un ingrediente. */
        purchasing: false ,/* para saber si se hizo click en el boton OrderNow */
        loading: false //spinner
    

    }

    /* Actualizar el estado del purchasable , boton OrderNow */
    updatePurchasableState ( ingredients){
       
        const sum = Object.keys(ingredients) /* creamo una matriz del object */
            .map(igKey => {
                return ingredients[igKey]; /* igKey retorna la cantidad de ensalada , tocino o de cualquier ingrediente que este en la variale ingredients */

        })
        .reduce ((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});

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
        this.updatePurchasableState(updateIngredients); /* Para el botton ordernow */
    };

   /*  Eiminar ingrediente */
    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type]; /* Primero calculamos el contador viejo. */
        if (oldCount <= 0 ){
            return; 
       }
        const updatedCount= oldCount - 1; /*  despues /* actualizamos el contador viejo por updateCounted. */ 

        const updateIngredients = {
            ...this.state.ingredients /* los puntos son para distribuir las propiedades del antiguo estado de ingredientes. */
        };

        updateIngredients[type] = updatedCount; /* ACtualizar los ingredientes */

        const priceDeduction= INGREDIENT_PRICES[type]; /* Precio de la matriz INGREDIENT_PRICES */

        const oldPrice = this.state.totalPrice; /* ver el valor viejo que es el precio base 4 del state */

        const newPrice = oldPrice - priceDeduction; /* Calcular el precio nuevo  */

        this.setState({totalPrice: newPrice, ingredients: updateIngredients}); /* establecer el estado de totalPrice y de ingredients */

        this.updatePurchasableState(updateIngredients); /* Para el botton ordernow */

    };


     /* se activara siempre que nosotros hagamos click en el boton Order Now. */
    purchaseHnadler = () => {

        this.setState({purchasing: true}); /* establecer el estado del purchasing a true */

    }

    /* Para cerrar el telon de fondo */
    purchaseCancelHandler= () => {
        this.setState({purchasing: false}); /* establecer el estado del purchasing a false */

    }

    /* Para seguir continuando con la compra */
    purchaseContinueHandler = () => {
        //alert('You continue!');
        //Declaramos la const order para crear una estructura con la informacion que tendra en la base de datos para las ordenes.
        this.setState( {loading: true} );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'M.J',

                address: {
                    street: 'avenida vickuna mackena 2585',
                    zipCode: '2585',
                    country: 'Santiago'
                },

                email: 'marita@test.com'
            },

            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)//para agregarles las ordenes a firebase, le pasamos como parametros la const order.
        .then(response => {
            this.setState({loading: false, purchasing: false});

        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});

        });
    }


    render(){

        const disableInfo = {
            ...this.state.ingredients
        };
        for (let Key in disableInfo){ /* Cmprobaremos si es cero o menos y se actualizara para seahabilitar el boton. */

            disableInfo[Key] = disableInfo[Key] <= 0  /* Key es el puntero que contiene la informacion de los ingredientes de la hamburguesa. */
        }

        //para el spinner
        let orderSummary =   < OrderSummary  
            ingredients={this.state.ingredients} /* viene del archivo orderSummary.js */
            price={this.state.totalPrice}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}/>; 

        if(this.state.loading) {
            orderSummary = < Spinner />;

        }
            
            

        return(
            <Aux>
                <Modal show={this.state.purchasing}  modalClosed ={this.purchaseCancelHandler}>
                  {orderSummary}
                        
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable = {this.state.purchasable}
                    ordered={this.purchaseHnadler} /* viene del archivo js */
                    price={this.state.totalPrice}/>
                   
            </Aux>
        );
    }

};


export default BurgerBuilder;   