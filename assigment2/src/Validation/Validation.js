import React from 'react';

const validation = (props) => {
    let validationMessage = 'Text long enough'

    if (props.inputLength <= 5) {
        validationMessage = "text too short"
    }

    return(
        <div>
            {/* Ternario, si el metodo que esta en App.js inputLength es mayor que si poner el primer parrafo de lo contrario el otro.  Tarea N03*/}
            
            {
               
            <p> {validationMessage}</p>
            }
           
        
        </div>
    );

};


export default validation;