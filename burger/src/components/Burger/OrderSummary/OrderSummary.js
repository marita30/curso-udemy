import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    /* Metodo para ver cuando esto realmente se actualiza */
    componentWillUpdate(){
        /* se va actualizar cada que le damos click a cualquier boton que tenga la aplicacion. */
        console.log('[OrderSummary] WillUpdate');
    }



    render (){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}> 
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        }   );

        return(

            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the fallowing ingredients:</p>
                <ul> 
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}> CANCEL</Button> {/* btnType viene del archivo Button.js  y Clicked del archivo BurgerBuilder.js*/} 
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
           </Aux>

        );
    }
}

export default OrderSummary;         