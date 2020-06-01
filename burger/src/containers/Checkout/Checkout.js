import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // state ={
    //     ingredients:null,
    //     price: 0
        
        
    // }

//     UNSAFE_componentWillMount () {
//         const query = new URLSearchParams(this.props.location.search); /* le decimos que busque la locacion de search que esta en el BurgerBuilder.js que incluye el signo de interrogacion, etc */
//         /* Declaramos ingredients con un object vacio */
//         const ingredients = {};
//         let price = 0;
//  /*        luego hacemo un for que os parametros que tiene search que ahora los tiene query entren y se vayan ordenando conforme 
//         ingredients[param[0]] = +params[1]; que seria ingredients{} params[0] seria salad y +param[1] seria 0 , {"salad:0"} y asi sucesivamente. */
//         for (let param of query.entries()){
//             //['salad', '1']
//             //Precio
//             if (param[0] === 'price'){
//                 price = param[1]
//             }else{
//                 ingredients[param[0]] = +param[1];
//             }
           
//         }

//         this.setState({ingredients: ingredients, totalPrice: price});
//     }

    /* Para el boton cancell e la ruta /checkout*/
    checkoutCancelledHandler = () => {

        this.props.history.goBack();/*  esto simplemente regresa a la ultima pagina osea al home donde cremos la hamburguesa */

    }

    /* Para el boton continue de la ruta /checkout */
    checkoutContinuedHandler = () => {

        this.props.history.replace('/checkout/contact-data');/*  aqui decimos que reemplace la ruta actual con una nueva ruta  contact-data viene del archivo ContactData.js*/

    }

    render (){
        let summary =  <Redirect to="/" />
        if (this.props.ings) {
            summary = (
             <div>
                    <CheckoutSummary 
                        /*  cambiamos el .state.ingredients por .props.ings que viene del metodo mapStateToProps*/
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} /* vienen del archivo CheckoutSummary */
                    />

                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                            // render={(props)=> ( <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} 
                        component= {ContactData}/> {/*  {...props} aquis e tomara todos los datos de contactData.js que tomara props.history*/}
                    />
             </div>

            );
        }

        return summary;
    }
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }

};



export default connect(mapStateToProps)(Checkout); 