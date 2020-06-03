import * as actionTypes from "./actionTypes";

import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START

    };
};

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        idToken: token,
        userId: userId
    };

};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        /* Para el isSignup que significa signin o singup */
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJGbf9wGCpGCwcG9bGkqHhaqOocoTQTds';
        if( !isSignup ){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJGbf9wGCpGCwcG9bGkqHhaqOocoTQTds';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSucess(response.data.idToken, response.data.localId));
        })
        .catch(error => {
           
            dispatch(authFail(error.response.data.error));
        });

    };
};