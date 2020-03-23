import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    /* Creamos un componente de que solo se actualice si se muestran cambios. */
    shouldComponentUpdate(nextProps, nextState){
            return nextProps.show !== this.props.show;
        } /* esto quiere decir que si nextProps.show si eso es igual a this.props.show entonces para el estado anterior quiero devolver true */
    
    /* Ahora creamos otro componente para confirmar si funciona */ /* Esto es para que se actualice solo cuando le demos al boton OrderNow  */
    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render (){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/> {/* para agregar el telon de fondo */} {/* clicked viene del archivo modal.js y modalClosed del archivo BurgerBuilder.js*/}
                <div className={classes.Modal}
                    style={{
                        
                        transform: this.props.show ?  'translateY(0)' : 'translateY(-100vh)',/* transformacion si Show es verdadero, si es tru translateY
                        (0) y si no el otro.  */
                        opacity: this.props.show ? '1' : '0'
                    }}>

                    {this.props.children}

                </div>
            </Aux>
        );
    }
}
export default Modal;