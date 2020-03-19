import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {

    let  attachedClasses = [classes.SideDrawer, classes.Close]; /* classes.Close y classes.SideDrawer viene del archivo SideDrawer.css */
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];

    }
    return(
        < Aux >
            <Backdrop 
                show={props.open} 
                clicked={props.closed}
            /> {/* /* viene del archivo Backdrop.js y el show es de la condicion que si props.show es verdadero que se active una clase si no que retorne null es para el telon.*/}
            
            <div className={attachedClasses.join(' ')}>  {/* /* closed viene del archivo Layout.js del metodo  sideDrawerClosedHandler. de igual forma props.open */}

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