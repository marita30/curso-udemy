import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

/* Axios */
import axios from '../../axios-orders';

/* Para conectar el reducer al burgerBuilder */
import { connect } from 'react-redux';

/* PARA LOS EVENTOS QUE TIENE ACTION */
import * as actions from '../../store/actions/index';


import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {

    /* Este es una forma de hacer los ingredientes dinamicamente */

   /*  constructor(props){
        super(props);
        this.state = {...}
    } */

    /* Objeto */
    state = {
        // purchasable: false ,/* se convierte en verdad cuando podemos comprar una hamburguesa osea que la ahmburguesa tenga al menos un ingrediente. */
        purchasing: false ,/* para saber si se hizo click en el boton OrderNow */
       /*  loading: false,//spinner
        error: false //error. */
    

    }
    //obtener los ingredeintes desde el back end
    componentDidMount () {

        this.props.onInitIngredients();
         
    }

    /* Actualizar el estado del purchasable , boton OrderNow */
    updatePurchaseState ( ingredients){
       
        const sum = Object.keys(ingredients) /* creamo una matriz del object */
            .map(igKey => {
                return ingredients[igKey]; /* igKey retorna la cantidad de ensalada , tocino o de cualquier ingrediente que este en la variale ingredients */

        })
        .reduce ((sum, el) => {
            return sum + el;
        }, 0);

        // this.setState({purchasable: sum > 0});
        // REDUX
        return sum > 0;

    }

    /* Agregar Ingrediente */
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]; /* Primero calculamos el contador viejo. */
    //     const updatedCount= oldCount + 1; /*  despues /* actualizamos el contador viejo por updateCounted. */ 
    //     const updateIngredients = {
    //         ...this.state.ingredients /* los puntos son para distribuir las propiedades del antiguo estado de ingredientes. */
    //     };

    //     updateIngredients[type] = updatedCount; /* ACtualizar los ingredientes */

    //     const priceAddition = INGREDIENT_PRICES[type]; /* Precio de la matriz INGREDIENT_PRICES */

    //     const oldPrice = this.state.totalPrice; /* ver el valor viejo que es el precio base 4 del state */

    //     const newPrice = oldPrice + priceAddition; /* Calcular el precio nuevo  */

    //     this.setState({totalPrice: newPrice, ingredients: updateIngredients}); /* Establecer un estado , osea establecer el precio total para el nuevo precio de igual manera con os ingredientes.*/
    //     this.updatePurchasableState(updateIngredients); /* Para el botton ordernow */
    // };

   /*  Eiminar ingrediente */
    // removeIngredientHandler = (type) => {

    //     const oldCount = this.state.ingredients[type]; /* Primero calculamos el contador viejo. */
    //     if (oldCount <= 0 ){
    //         return; 
    //    }
    //     const updatedCount= oldCount - 1; /*  despues /* actualizamos el contador viejo por updateCounted. */ 

    //     const updateIngredients = {
    //         ...this.state.ingredients /* los puntos son para distribuir las propiedades del antiguo estado de ingredientes. */
    //     };

    //     updateIngredients[type] = updatedCount; /* ACtualizar los ingredientes */

    //     const priceDeduction= INGREDIENT_PRICES[type]; /* Precio de la matriz INGREDIENT_PRICES */

    //     const oldPrice = this.state.totalPrice; /* ver el valor viejo que es el precio base 4 del state */

    //     const newPrice = oldPrice - priceDeduction; /* Calcular el precio nuevo  */

    //     this.setState({totalPrice: newPrice, ingredients: updateIngredients}); /* establecer el estado de totalPrice y de ingredients */

    //     this.updatePurchasableState(updateIngredients); /* Para el botton ordernow */

    // };


     /* se activara siempre que nosotros hagamos click en el boton Order Now. */
    purchaseHandler = () => {

        this.setState({purchasing: true}); /* establecer el estado del purchasing a true */

    }

    /* Para cerrar el telon de fondo */
    purchaseCancelHandler= () => {
        this.setState({purchasing: false}); /* establecer el estado del purchasing a false */

    }

    /* Para seguir continuando con la compra */
    purchaseContinueHandler = () => {
        //alert('You continue!')
       /*  lo que hace history es cambiar el componente dependiendo de la ruta que establezca, cambiar la porcion de la paginaque su pagina tiene en esa Pila. */
        /* Codificar los ingredientes a esta nueva hamburguesa. */
    //    const queryParams = [];
    //   /*  lt i es un puntero que apuntara a las llaves (ingredients) por ejemplo i apunta ala primera llave bacon luego pasa a queryParams.push 
    //    que el encodeURIComponent solo te pasa ls valores en un string y te dice que encodeURIComponent(i) hace referencia ala primer llave que es 
    //    bacon + '=' que seria bacon= + encodeURIComponent(this.state.ingredients[i]) hace referencia al valor que es 0 , entonces quedaria
    //    "bacon=0" y asi sucesivamente. */

    //    for (let i in this.state.ingredients){
    //        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); /* encodeURIComponent hace que te renderiza un string para que lo lea la url */
    //    }
    //    /* vamos a pasar tambien el precio. */
    //    queryParams.push('price=' + this.state.totalPrice);
    //    /* Union es que los va a separar con un & por ejemplo "bacon=0&cheese=1&met=2&salad=0"*/
    //     const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search:'?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');


    }


    render(){

        const disableInfo = {
           /*  cambiamos el .state.ingredients por la nueva configuracion de redux */
            ...this.props.ings
        };
        for (let Key in disableInfo){ /* Cmprobaremos si es cero o menos y se actualizara para seahabilitar el boton. */

            disableInfo[Key] = disableInfo[Key] <= 0  /* Key es el puntero que contiene la informacion de los ingredientes de la hamburguesa. */
        }
        //Para solucionar el error de la variable ingredients, que ahora esta como null en el state
        let orderSummary = null;
        //Para solucionar el error de la variable ingredients, que ahora esta como null en el state y que los ingredientes esten en firebase.
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        /*  cambiamos el .state.ingredients por la nueva configuracion de redux */
        if(this.props.ings) { // si el state ingredients no son nulos que muestre el bloque del burger.
            burger = (
                <Aux>
            
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                     /*  cambiamos el .this.addIngredientHandler por la nueva configuracion de redux del mapDispatchToProps */
                        ingredientAdded={this.props.onIngredientsAdded} 
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        disabled={disableInfo}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} /* viene del archivo js */
                         /*  cambiamos el .state.totalrce por .props.price que viene del metodo mapStateToProps*/
                        price={this.props.price}/>
                </Aux>    
            );
           //Para solucionar el error de la variable ingredients, que ahora esta como null en el state y que lo ingredientes esten en frebase
            orderSummary =   < OrderSummary  
             /*  cambiamos el .state.ingredients por la nueva configuracion de redux */
                ingredients={this.props.ings} /* viene del archivo orderSummary.js */
                price={this.props.price}  /*  cambiamos el .state.totalrce por .props.price que viene del metodo mapStateToProps*/
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
            />; 
        }

       /*  //para el spinner
        
        if(this.state.loading) {
            orderSummary = < Spinner />;

        } */
        
        return(
            <Aux>
                <Modal show={this.state.purchasing}  modalClosed ={this.purchaseCancelHandler}>
                  {orderSummary}   
                </Modal>
                {burger}
               
               
                   
            </Aux>
        );
    }

};

/* Creando los dos metodos de redux */
const mapStateToProps = state  => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}
const mapDispatchToProps =  dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredients(ingName)), /* ingredientName viene del archivo reducer.js */
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));   