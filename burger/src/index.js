import React from 'react';
import ReactDOM from 'react-dom';
/* Para envolve la aplicacion */
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Para envolver la aplicacion-- osea para conectar redux con react */
import { Provider } from 'react-redux'; 
/* Creando el store */
import { createStore } from 'redux';
/* importando reducer.js */
import reducer from './store/reducer';
                                    /* PARA SABER EL ESTADO DE NUESTRA APLICACION CON REDUX DEVTOOLS */
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
