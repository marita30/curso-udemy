import * as actionTypes from "./actionTypes";

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)//para agregarles las ordenes a firebase, le pasamos como parametros la const order.
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            /* this.props.history.push('/');/*  Para que luego que le click al boton order de la ruta /checkout/Contact-data se redireccione a home */ 

        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
          /*   this.setState({loading: false}); */

        });
    };

};