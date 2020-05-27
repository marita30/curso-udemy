import React from 'react';
import ReactDOM from 'react-dom';
/* Para envolve la aplicacion */
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Para envolver la aplicacion-- osea para conectar redux con react */
import { Provider } from 'react-redux'; 

/* Importando thunk que es un middleware que nos permite codigo asincrono */
import thunk from 'redux-thunk';

/* Creando el store */
import { createStore, applyMiddleware, compose } from 'redux';
/* importando reducer.js */
import burgerBuilderReducer from './store/reducers/burgerBuilder';

/* thunk  */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

                                    /* PARA SABER EL ESTADO DE NUESTRA APLICACION CON REDUX DEVTOOLS */
const store = createStore(burgerBuilderReducer, composeEnhancers( 
    applyMiddleware(thunk)
));

const app = (

    <Provider store={store}>
        <BrowserRouter>

             <App />
    
        </BrowserRouter>
    </Provider>

);

ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
