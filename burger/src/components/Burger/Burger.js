import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    /* Object tiene un metodo clave que extrae las claves de un objeto dado y las convierte en una matriz , por ejemplo en este 
    caso covertira el state de los ingredientes en un string, luego lo mapeamos porque ya es una matriz para poder recorrerla, igKey ES NUESTRO PUNTERO*/
     /* Object.keys(props.ingredients) es para pasar los ingredientes de forma de un arreglo */
     console.log(props.ingredients)
    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        /* esparcir o crear una nueva  matriz con tres espacios libres (3) en este caso es el espacio que nos dara props.ingredients luego otra vez mapiamos los elementos del nuevo arrego
        usaremos (_) para indicar que el indice de ese elemento es importante para mi.*/
        
        return[...Array(props.ingredients[igKey])].map((_, i) =>{
            console.log(i)
           return <BurgerIngredient key={igKey + i} type= {igKey} />;/* Esto crea una llave unica para cada ingrediente. */

        }); 
    });
    return(
       /*  Agregando los ingredientes del archivo BurgerIngredient pero no dinamicamente. */
        <div className={classes.Burger}>
            <BurgerIngredient type= "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type= "bread-bottom"/>

        </div>
    );
};


export default burger;