import React from 'react';

import classes from './Order.css';
import Orders from '../../containers/Orders/Orders';

const order = (props) => {

    /* Tranformar los ingredientes */
    const ingredients = [];

    for (let ingredientName in props.ingredients ){

        ingredients.push(
            { 
                name: ingredientName,
                amount: props.ingredients[ingredientName] /* amount para almacenar la cantidad */
            }
        ); /* la llave ingredientName hace referencia a la llave que seria los ingredients , bacon , cheese etc y props.ingredients[ingredientName] hace referencia al valor osea la cantidad ejemplo cheese:1 , bacon:3 */
    } /* props.ingredients viene del archivo Orders.js */

    /* Dar salidas a los ingredientes */
    const ingredientOutput = ingredients.map(ig => {
    return <span 
        style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px ',
                border: '1px solid #ccc',
                padding: '5px'}}
        key={ig.name} >{ig.name} ({ig.amount})</span>;
    });

    return (
    
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p> {/* props.price viene del archivo orders.js // parseFloat es oara transformar todo el string a un numero*/}
        </div>

    );
    
};

/* https://lodash.com/docs/4.17.15 */
/* letterresult = []
for (let letters in props.data){

    letterresult.push(props.data[letters][0].b.c)

} */


export default order;