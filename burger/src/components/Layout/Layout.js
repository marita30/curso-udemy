import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

/* vamos a convertir Layout en class donde podemos implementar el metodo para que podamos escuc har ambas Partes
o cerrar haciendo click en el fondo (telon) , elegimos aqui porque tiene a los dos el Toolbar y SideDrawer*/
class Layout extends Component {

    state={
        showSideDrawer: true
    }
    /* METODO PARA CERRAR EL SIDEDRAWER */
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})

    }


    render () {
        return(
            <Aux>

                <Toolbar/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                />

                <main className= {classes.Content}> 
                    {this.props.children}
                </main>

            </Aux>
        )
    }
} 
    




export default Layout;