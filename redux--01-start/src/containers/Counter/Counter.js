import React, { Component } from 'react';
/* Conectando el store con react */
import { connect } from 'react-redux';

import  {increment} from '../../store/actions/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';


class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={ () => this.props.onStoreResult(this.props.ctr)}>Store Results</button>
                <ul>
                    {this.props.storedResults.map(strResult => (

                         <li key= {strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li> /* value y id viene del archivo reducer.js */
                    ))}
                   
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {

        ctr: state.ctr.counter, /* denme el valor del counter en nuestro global administrado  el .ctr que va en medio del state viene del archvo index.js */
        storedResults: state.res.results /* viene el results de reducer.js  el .res que va en medio del state viene del archvo index.js*/
        
    };
};

const mapDispatchToProps = dispatch => {
    return {

        onIncrementCounter: () => dispatch(increment()), /* viene del archivo actions.js */
        onDecrementCounter: () => dispatch ({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch ({type: actionTypes.ADD, value: 5}),
        onSubtractCounter: () => dispatch ({type: actionTypes.SUBTRACT, value: 5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}), /* result viene del archivo result.js */
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id}) //resultElId viene del archivo reducer.js

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);