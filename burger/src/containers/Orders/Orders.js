import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-orders';

import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount () {

        this.props.onGetOrders(this.props.token, this.props.userId);
    }

       

    render (){
        let spinner = !this.props.loading ? null : <Spinner />;
        return (
            
            <div>
                {spinner}
                {/* outputting the orders */}
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients} 
                        price={order.price}
                    />
                ))}
            </div>

        );
    }

};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        /* Para que traiga las ordenes por medio del userId */
        userId: state.auth.userId
    }

};

const mapDispacthToProps = dispatch => {
    return{
        onGetOrders: (token, userId) => dispatch(actions.getOrders(token, userId))
    }
}




export default connect(mapStateToProps, mapDispacthToProps)(withErrorHanlder(Orders, axios));