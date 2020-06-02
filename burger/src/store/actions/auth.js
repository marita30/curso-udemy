import * as actionTypes from "./actionTypes";

import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START

    };
};

export const authSucess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        authData: authData
    };

};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJGbf9wGCpGCwcG9bGkqHhaqOocoTQTds', authData)
        .then(response => {
            console.log(response);
            dispatch(authSucess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });

    };
};