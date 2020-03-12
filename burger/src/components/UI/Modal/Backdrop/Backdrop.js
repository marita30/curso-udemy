import React from 'react';
import classes from './Backdrop.css';

/* Para el telon de findNodeModule. */

const backdrop = (props) => (

    props.show ? <div className={classes.Backdrop} onClick={props.clicked}>  {/* archivo modals.js */}

    </div> : null /* Verificr si es verdadero o falso */
);


export default backdrop;