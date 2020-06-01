import * as actionTypes from "./actionTypes";

import axios from '../../axios-orders';
import order from "../../components/Order/Order";


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


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};



/* Orders */

export const ordersGetFails = (error) => {
    return {
        type: actionTypes.ORDERS_GET_FAIL,
        error: error

    };
};

export const ordersGetSuccess = (orderData) => {
    return {
        type: actionTypes.ORDERS_GET_SUCESS,
        orders: orderData
    };
};

export const getOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then(res => {
                const fetcheOrders = [];
                /* me va a traer todas las ordenes que estan en el backend en firebase, key hace refencia a los id de las ordenes */
                for (let key in res.data){

                    fetcheOrders.push({
                        ...res.data[key],
                        id: key
                    });

                }

                dispatch(ordersGetSuccess(fetcheOrders));

            })
            .catch(error => {

                dispatch(ordersGetFails(error));

            });

    }
    }

