import React from 'react';

import classes from './Input.css';



const input = ( props) => {
    let inputElement = null;
    /* agregando CSS. */
    const inputClasses = [classes.InputElement];
     /* agregando CSS.  props invalid viene del archivo contactData.js y props.shouldValidate igual lo que hacemos es verificar que uno de los object del state del contactaData no tiene reglas por que es un menu desplegable
     props.touched es para validar si el usuario ha dado click en algun input si es true no se establezca la classe pero si es false que si se establezca.*/
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid); 
    }

    /* LOS PROPS VIENEN DEL ARCHIVO ContactData.JS */
    switch (props.elementType) {

        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} {...props.elementConfig} 
                value={props.defaultValue} onChange={props.changed}/>; /* elelemnetConfig viene del archivo ContactData.js */
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses} {...props.elementConfig} 
                value={props.defaultValue} onChange={props.changed} />; /* props.changed viene del archivo ContactData.js */
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses} 
                    value={props.defaultValue}
                    onChange={props.changed}> 
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
                className={inputClasses} {...props.elementConfig} 
                value={props.defaultValue}  onChange={props.changed}/>;
    }

    return(

        <div className={classes.Input}>

            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            
        </div>
    );

    
};


export default input;