import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>


        {/* Si isAuthenticated es verdadero que se le muestre el boton de orders de lo contrario que no lo muestre  */}
        { props.isAuthenticated
        ? <NavigationItem link="/orders">Orders</NavigationItem>
        : null }


        {/* Si esta authenticado o no  */}
        { !props.isAuthenticated
        ? <NavigationItem link="/auth"> Authentication </NavigationItem>
        : <NavigationItem link="/logout"> Logout </NavigationItem> }
       
    </ul>

);

export default navigationItems;