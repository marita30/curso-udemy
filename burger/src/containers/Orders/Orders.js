import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-orders';

import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {

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

                this.setState({loading: false, orders: fetcheOrders});

            })
            .catch(error => {

                this.setState({loading: false});

            });

    }

    render (){
        return (

            <div>
                {/* outputting the orders */}
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>

        );
    }

}


export default withErrorHanlder(Orders, axios);