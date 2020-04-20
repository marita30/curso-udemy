import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

/* Para hacer dinamicamente los input del ContactData. */
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state={

        orderForm: {

             name: {
                 elementType: 'input',
                 elementConfig: {
                     type: 'text',
                     placeholder: 'Your Name',
                 },
                 value: ''
             },
             street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: ''
            } ,
             zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: ''
             },
             country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
             },
             email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: ''

             },
             deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}

                    ]
                },
                value: ''

             }

        },
        loading: false
    }
    /* Cuando haga click en el boton Order envie el pedido al servidor. */
    orderHandler = (event) => {

        event.preventDefault();

         //Declaramos la const order para crear una estructura con la informacion que tendra en la base de datos para las ordenes.
        this.setState( {loading: true} );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, /* viene del archivo Checkout */
            
        }
        axios.post('/orders.json', order)//para agregarles las ordenes a firebase, le pasamos como parametros la const order.
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');/*  Para que luego que le click al boton order de la ruta /checkout/Contact-data se redireccione a home */

        })
        .catch(error => {
            this.setState({loading: false});

        });
       


    }

    render (){
        /* Para el nuevo state con muchos object */
        const formElementsArray= [];
        for (let key in this.state.orderForm){ /* Key es el identificador de las llaves de los object que estan en el this.state, name, street, zip code etc. */

            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        /* Para el spinner */
        let form = (
            <form>                
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
               
            </div>
        );
    }
} 



export default ContactData;