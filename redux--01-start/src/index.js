import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
// para conectar la store
import { Provider } from 'react-redux';

import reducer from './store/reducer';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


/* create store */
const store = createStore(reducer);


/* instalando la tienda en la aplicacion React. */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
