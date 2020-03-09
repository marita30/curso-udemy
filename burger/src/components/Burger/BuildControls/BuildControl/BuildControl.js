import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className = {classes.BuildControl}>
        <div className = {classes.Label}>{props.label}</div>
        <button className = {classes.Less} onClick={props.removed}>Less</button> {/* Agregar */}
        <button className = {classes.More} onClick={props.added}>More</button> {/* Eliminar */} {/* props.added viene del archivo BuildControls */}
    </div>

);
 
export default buildControl;