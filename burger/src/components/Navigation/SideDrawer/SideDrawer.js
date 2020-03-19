import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
    return(
        < Aux >
            <Backdrop show={props.open} clicked={props.closed}/> {/* /* viene del archivo Backdrop.js y el show es de la condicion que si props.show es verdadero que se active una clase si no que retorne null es para el telon.*/}
            <div className={classes.SideDrawer}>  {/* /* closed viene del archivo Layout.js del metodo  sideDrawerClosedHandler. de igual forma props.open */}

                <div className={classes.Logo}>

                    <Logo />

                </div>

                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Aux>
    );

}; /* Componente funcional normal en el que obtenemos algo y devolvemos algo. */


export default sideDrawer;