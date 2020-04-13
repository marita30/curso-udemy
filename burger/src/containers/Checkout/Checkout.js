import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';

class Checkout extends Component {

    state ={
        ingredients: {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search); /* le decimos que busque la locacion de search que esta en el BurgerBuilder.js que incluye el signo de interrogacion, etc */
        /* Declaramos ingredients con un object vacio */
        const ingredients = {};
 /*        luego hacemo un for que os parametros que tiene search que ahora los tiene query entren y se vayan ordenando conforme 
        ingredients[param[0]] = +params[1]; que seria ingredients{} params[0] seria salad y +param[1] seria 0 , {"salad:0"} y asi sucesivamente. */
        for (let param of query.entries()){
            //['salad', '1']
            ingredients[param[0]] = +param[1];
        }

        this.setState({ingredients: ingredients});
    }

 


    /* Para el boton cancell e la ruta /checkout*/
    checkoutCancelledHandler = () => {

        this.props.history.goBack();/*  esto simplemente regresa a la ultima pagina osea al home donde cremos la hamburguesa */

    }

    /* Para el boton continue de la ruta /checkout */
    checkoutContinuedHandler = () => {

        this.props.history.replace('/checkout/contact-data');/*  aqui decimos que reemplace la ruta actual con una nueva ruta  */

    }

    render (){
        return (
            <div>
                <CheckoutSummary 
                 ingredients={this.state.ingredients}
                 checkoutCancelled={this.checkoutCancelledHandler}
                 checkoutContinued={this.checkoutContinuedHandler} /* vienen del archivo CheckoutSummary */
                />
            </div>
        );
    }
    
}



export default Checkout; 