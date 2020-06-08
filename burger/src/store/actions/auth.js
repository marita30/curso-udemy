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

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

/* Validar  el tiempo del token */
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());

        }, expirationTime * 1000);

    };

};


/* redirecting the user to the checkout page */
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


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

                                          // new Date().getTime() trae la fecha en timeStamp     
           const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            /* Trabajand con localstore para guardar el token , setItem es para almacenar un elemento local , en este caso el token*/
            localStorage.setItem('token', response.data.idToken);
            /* Cuando caduca e token */
            localStorage.setItem('expirationDate', expirationDate);


            dispatch(authSucess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
           
            dispatch(authFail(error.response.data.error));
        });

    };
};