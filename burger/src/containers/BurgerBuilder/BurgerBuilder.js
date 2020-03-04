import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    /* Este es una forma de hacer los ingredientes dinamicamente */

   /*  constructor(props){
        super(props);
        this.state = {...}
    } */

    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 2,
            meat: 2
        }

    }
    render(){

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Aux>
        );
    }

};


export default BurgerBuilder;   