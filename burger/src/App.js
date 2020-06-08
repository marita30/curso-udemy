import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

/* Athentication */
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import Orders from './containers/Orders/Orders';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component{

  componentDidMount () {
    this.props.onAutoLogin();
  }

  render() {

    /* Para hacer la configuracion de que si no esta authenticado el usuario no puede ir a la routes orders hasta ue este authenticado y si le da orders lo va a redirect a home */
    let routes = (
      <Switch>
        <Route  path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    /* Si esta authenticado */
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            {/* Uthenticate */}
            <Route path="/logout" component={Logout} />
            <Route path="/Checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> {/* el boton para que se direccione aqui esta en el archivo NavigationItems.js */}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
            
      </Switch>
      );

    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

/* PARA EL DISPATCH DE ACTIONS/AUTH */
const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch (actions.authCheckState())

  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
