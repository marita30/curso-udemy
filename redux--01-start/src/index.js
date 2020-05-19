import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';
// para conectar la store
import { Provider } from 'react-redux';

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


/* create store */
const store = createStore(rootReducer);


/* instalando la tienda en la aplicacion React. */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
