import axios from 'axios';

const instance = axios.create({
    
    baseURL: 'https://burger-1e5b1.firebaseio.com/'
});


export default instance;