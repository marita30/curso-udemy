import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    /* Object tiene un metodo clave que extrae las claves de un objeto dado y las convierte en una matriz , por ejemplo en este 
    caso covertira el state de los ingredientes en un string, luego lo mapeamos porque ya es una matriz para poder recorrerla, igKey ES NUESTRO PUNTERO*/
     /* Object.keys(props.ingredients) es para pasar los ingredientes de forma de un arreglo */
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        /* esparcir o crear una nueva  matriz con tres espacios libres (3) en este caso es el espacio que nos dara props.ingredients luego otra vez mapiamos los elementos del nuevo arrego
        usaremos (_) para indicar que el indice de ese elemento es importante para mi.*/
        return[...Array(props.ingredients[igKey])].map((_, i) =>{
           return <BurgerIngredient key={igKey + i} type= {igKey} />;
           /* Esto crea una llave unica para cada ingrediente. igKey + 1 el igKey hace referencia al valor ejemplo salad
           y la i hace referencia al subindice del arreglo en este caso o */

        }); 
    })
   /*  solo arreglo que contega los valores del anterior ... reducir la logica de transformedIngredients... arr es el valor anterior y el es el valor actual
   arr tendra los valores actualizados  */
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);/*  arreglo vacio */
    /* Agregando un if para vaidar que si esta en cero ingredientes que muestre un msj diciendo Please star adding ingredients. */
    if (transformedIngredients.length === 0){

        transformedIngredients = <p>Please Start Adding Ingredients :)</p>;
    }
   
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