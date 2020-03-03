import React from 'react';
import classes from './BurgerIngredient.css'

const burgerIngredient = (props) => {
    let ingredient = null;

    /* Cambiar  */
    switch (props.type) {

        /* Aqui creamos el pan del fondo */
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom }></div>;
            break;

            /* Aqui creamos el pan top y luego las ensaladas. */
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;

        case ('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;

        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;

        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;

        case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;

            /* De lo contrario */
        default:
            ingredient = null;       
    }

    return ingredient;
}




export default burgerIngredient;