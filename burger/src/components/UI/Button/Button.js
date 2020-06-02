import React from 'react';
import classes from './Button.css';

const button = (props) => {
    console.log(props)
    return (
            <button
            disabled={props.disabled} /* viene del archivo contactData.js */
            className={[classes.Button, classes[props.btnType]].join('')} /* string */
            onClick={props.clicked} /* viene del aechivo orderSummary */
        >{props.children}</button>
        

    )
    
}; /* donde devuelvo jsx ()*/


export default button;