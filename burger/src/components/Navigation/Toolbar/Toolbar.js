import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import  NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}> 
        <DrawerToggle clicked={props.drawerToggleClicked}/> {/* adding a sideDrawer toggle button , props.drawerToggleCliked viene del archivo Layout.js*/}
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
           <NavigationItems />
        </nav>
    </header> /* encabezado */

);  /* jsx */



export default toolbar;