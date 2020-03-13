import React from 'react';
import classes from './Button.css'

const button = (props) => (

    <button
        className={[classes.Button, classes[props.btnType]]} /* string */
        onClick={props.clicked}>{props.children}

    </button>
); /* donde devuelvo jsx ()*/


export default button;