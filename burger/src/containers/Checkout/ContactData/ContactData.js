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

        /* handling form submission para mandarlo despues a la base de datos firebase */
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; /* .value le decimos que solo queremos ese valor dependiendo del puntero formElementIdentifier este apuntando si en este caso apunta a name solo seria name={value} */
        }/* formElementIdentifier es name, street, email , ect de las llaves del orderForm del state. */

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, /* viene del archivo Checkout */
            orderData: formData
            
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


    /* handling user input */
    inputChangedHandler = (event, inputIdentifier) => {

      /*  copiar el formulario de pedido del state para actualizar */
      const updateOrderForm = {
          ...this.state.orderForm
      };
      /*       copia de un solo object del formulario del state , inputIdentifier ahor va hacer como key , las llaves osea name, street etc y dependiendo cual sea solo se le hara copia a ese. */
      const updateFormElement = { 
          ...updateOrderForm[inputIdentifier]
        };
         /* cambia el valor de la variable value que tiene cada object del state */
        updateFormElement.value = event.target.value;
        updateOrderForm[inputIdentifier] = updateFormElement;
        this.setState({orderForm: updateOrderForm});

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
            <form onSubmit={this.orderHandler}>                
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        defaultValue={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType='Success'>Order</Button>
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