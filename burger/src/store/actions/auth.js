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

    };
};