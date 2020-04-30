import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import reducer from './store/reducer';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


/* create store */
const store = createStore(reducer);



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
