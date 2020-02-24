import React from 'react';

const validation = (props) => {
    return(
        <div>
            {/* Ternario, si el metodo que esta en App.js inputLength es mayor que si poner el primer parrafo de lo contrario el otro. */}
            
            {
                props.inputLength > 5 ?
                <p> Text long enough </p>:
                <p> Text too short </p>
            }
           
        
        </div>
    );

};


export default validation;