import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

/* Athentication */
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import Orders from './containers/Orders/Orders';

class App extends Component{
  render() {
    return (
      <div>
        <Layout>

          <Switch>

            {/* Uthenticate */}
            <Route  path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/Checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> {/* el boton para que se direccione aqui esta en el archivo NavigationItems.js */}
            <Route path="/" exact component={BurgerBuilder} />

          </Switch>
        

        </Layout>
      
      </div>
    );
  }
}

export default App;
