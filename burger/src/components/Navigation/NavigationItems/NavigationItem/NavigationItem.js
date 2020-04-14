 import React from 'react';
import classes from './NavigationItem.css';

import { NavLink } from 'react-router-dom';


 const navigationItem = (props) => (
     
   <li className={classes.NavigationItem}>
      <NavLink
         to={props.link} /* viene del archivo NavigationItems.js */
         exact={props.exact} /* viene del archivo NavigationItems.js */
         activeClassName={classes.active}>{props.children} {/* si props.active es true que pasa a classes.active de lo contrario null */}
      </NavLink>
   </li>
);

 export default navigationItem;