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
                 value: '',
                 /* le decimos que este campo no debe de estar vacio. */
                 validation: {
                     required: true
                 },
                 valid: false,
                 touched: false
             },
             street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            } ,
             zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
             },
             country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
             },
             email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false /* es para verificar si el usuario toco un input */

             },
             deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}

                    ]
                },
                value: '',
                validation:{},
                valid: true

             }

        },
        /* Para el boton order del contactaData para que habilite cuando todos lo campos esten llenos. */
        formIsValid: false,
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

    /* Para la cnfiguracion del validation que los campos no deben de ir vacio. */
    checkValidity (value, rules) {
        
        let isValid = true;
        if (!rules){
            return true;

        }

        if (rules.required){ /* si esto es cierto entonces */
            isValid = value.trim() !== '' && isValid; /* que si isValid es igual a la comparacion de los valores deberia ser igual si no es igual a una cadena vacia, si no es igual entonces isValid es true. trim remueve todos los espacios en blancos */

        }

        /* para validar la langitud de los input */
        if (rules.minLength){
            isValid = value.length >= rules.minLength
        }

         /* para validar la langitud de los input */
         if (rules.maxLength){
            isValid = value.length <= rules.maxLength
        }


        return isValid;

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
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;
        console.log(updateFormElement);

        /* Para validar el boton que se active cuando todos los capos del formulario esten llenos. */
        let formIsValid = true;
        for (let  inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});

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
                        valid={formElement.config.valid} /* para dar css en el archivo input que muestre de un color los input cuando esten false y cuando esten true de otro color */
                        shouldValidate= {formElement.config.validation} /* Para saber que el ultimo object no tiene regla porque es un menu desplegable. */
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
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