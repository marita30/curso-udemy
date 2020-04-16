import React from 'react';

import classes from './Input.css';
import ContactData from '../../../containers/Checkout/ContactData/ContactData';

const input = ( props) => {
    let inputElement = null;

    /* LOS PROPS VIENEN DEL ARCHIVO ContactData.JS */
    switch (props.inputtype) {

        case ('input'):
            inputElement = <input className={classes.InputElement} {...props} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props}  />;
            break;
        default: 
            inputElement = <input className={classes.InputElement} {...props}  />;
    }

    return(

        <div className={classes.Input}>

            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            
        </div>
    );

    
};


export default input;