import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

/* Redux */
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

/* Soinner */
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                /* le decimos que este campo no debe de estar vacio. */
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password',
                },
                value: '',
                /* le decimos que este campo no debe de estar vacio. */
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
            
        },
        isSignup: true 
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {

        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

    }

    /*  Para el boton singin*/
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })

    }


    render () {
         /* Para el nuevo state con muchos object */
         const formElementsArray= [];
         for (let key in this.state.controls){ /* Key es el identificador de las llaves de los object que estan en el this.state, name, street, zip code etc. */
 
             formElementsArray.push({
                 id: key,
                 config: this.state.controls[key]
             });
         }

         let form = formElementsArray.map( formElement => (
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

         ));

         /* spinner */
         if (this.props.loading){
             form = <Spinner />
         };

         /* Error */
         let errorMessage = null;
         if (this.props.error){
             errorMessage = (
                 /* .message solo esta disponible porque estamos utilizando el error que proviene de firebase */
                 <p>{this.props.error.message}</p>
             );    
         }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" > SUBMIT  </Button>   
                </form>
                <Button 
                    clicked= {this.switchAuthModeHandler} /* clicked viene del archivo Button.js */
                    btnType="Danger"> SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
            </div>

        );
    }
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading, /* Viene del reducer auth */
        error: state.auth.error

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);