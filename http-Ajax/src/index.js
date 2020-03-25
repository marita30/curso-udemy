import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


//Global configuration.
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com' //Guardamos la url base para que axios.get('/posts') del archivo blog.js, newpost.js y fullpost.js lo lea.
axios.dafaults.headers.common['Authorization'] = 'AUTH TOKEN'; //PARA EL TOKEN si tenemos.
axios.dafaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    console.log(request);

    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
