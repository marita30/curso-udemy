import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

/* Para hacer dinamicamente los input del ContactData. */
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            this.setState({loading: false});
            this.props.history.push('/');/*  Para que luego que le click al boton order de la ruta /checkout/Contact-data se redireccione a home */

        })
        .catch(error => {
            this.setState({loading: false});

        });
       


    }

    render (){
        /* Para el spinner */
        let form = (
            <form>
                <Input  inputtype= "input" type="text" name="name" placeholder="Your Name" />
                <Input  inputtype= "input" type="email" name="email" placeholder="Your Mail" />
                <Input  inputtype= "input" type="text" name="street" placeholder="Street" />
                <Input  inputtype= "input" type="text" name="postal" placeholder="Postal Code" />
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