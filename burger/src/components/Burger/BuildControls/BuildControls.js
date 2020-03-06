import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


/* Creando una matriz */

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },

];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        {controls.map(ctrl =>(  /* Mapeamos la matriz llamada controls y luego ctrl que es el puntero del .map como el .each , luego a la etiqueta le asignamos el puntero ctrl.label que 
        label es un identificador unico. */
            <BuildControl 
            key ={ctrl.label} 
            label={ctrl.label} 
            added={ () => props.ingredientAdded(ctrl.type)} /> /* viene del archivo BurgerBuilder.js */
        ))}

        
    </div>

);


export default buildControls;