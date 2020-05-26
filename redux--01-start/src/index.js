import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// para conectar la store
import { Provider } from 'react-redux';

/* Para code asincrono redux-thunk */
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Para combinar los reducers
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
})


/* AGREGANDO MIDDLEWARE */
const logger = store  => {
    return  next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

/* Para ver el estado de nuestra aplicacion */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* create store */
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


/* instalando la tienda en la aplicacion React. */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
