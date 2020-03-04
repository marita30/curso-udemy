import React, { Component }  from 'react';
import classes from './BurgerIngredient.css'
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render () {

        let ingredient = null;

        /* Cambiar  */
        switch (this.props.type) {

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
} 


/* Agregando Papel de utileria(Validacion) */
BurgerIngredient.propTypes= {
  /*   Es requerido osea si alguna vez intentamos usar el componente de ingrediente sin pasar un tipo, obtendremos un error */
    type: PropTypes.string.isRequired
}



export default BurgerIngredient;