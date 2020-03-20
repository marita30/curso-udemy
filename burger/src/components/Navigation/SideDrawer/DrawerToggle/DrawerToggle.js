import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div> /* props.clicked viene del archivo Toolbar.js */

);


export default drawerToggle;