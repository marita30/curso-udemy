 import React from 'react';
import classes from './NavigationItem.css';


 const navigationItem = (props) => (
     
   <li className={classes.NavigationItem}>
      <a 
         href={props.link}
         className={props.active ? classes.active : null }>{props.children} {/* si props.active es true que pasa a classes.active de lo contrario null */}
      </a>
   </li>
);

 export default navigationItem;