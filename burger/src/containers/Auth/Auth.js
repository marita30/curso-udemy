import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

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
            
        }   
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

         const form = formElementsArray.map( formElement => (
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

        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success" > SUBMIT  </Button>
                    
                </form>
            </div>

        );
    }
    
}

export default Auth;