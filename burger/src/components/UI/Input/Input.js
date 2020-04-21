import React from 'react';

import classes from './Input.css';
import ContactData from '../../../containers/Checkout/ContactData/ContactData';

const input = ( props) => {
    let inputElement = null;

    /* LOS PROPS VIENEN DEL ARCHIVO ContactData.JS */
    switch (props.elementType) {

        case ('input'):
            inputElement = <input 
                className={classes.InputElement} {...props.elementConfig} 
                value={props.value}/>; /* elelemnetConfig viene del archivo ContactData.js */
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes.InputElement} {...props.elementConfig} 
                value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select 

                    className={classes.InputElement} 
                    value={props.value}> 
                    {props.elementConfig.options.map(option => ( /* esto viene del orden del state  del object deliveryMethod del archivo ContactData.js */
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}

                </select>
            );
            break;
        default: 
            inputElement = <input 
                className={classes.InputElement} {...props.elementConfig} 
                value={props.value} />;
    }

    return(

        <div className={classes.Input}>

            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            
        </div>
    );

    
};


export default input;