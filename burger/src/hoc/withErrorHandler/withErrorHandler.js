import React, { Component }from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {                 //que reciba como entrada WrappedComponent y como salida lo que tiene props.
    return  class extends Component {

        state = {

            error: null
        }

        // gancho de ciclo de vida.
        UNSAFE_componentWillMount () {
            this.reqInteceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;

            }); //Interceptor para una solicitud... borrar cualquier error.
            this.resInteceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error}); // el primer error es de state y el egundo es del puntero.

            }); //Interceptor global para el error

        }
        //Eliminar interceptors.
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInteceptor);
            axios.interceptors.response.eject(this.resInteceptor);

        }

        // clicked.
        errorConfirmedHandler = () => {

            this.setState({error: null})
        }

        render () {
            return (
                < Aux >
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>  
                        {this.state.error ? this.state.error.message : null} {/* si this.state.error es nulo, entonces generare el message de lo contrario generare nulo. */}
                    </Modal>
                    < WrappedComponent {...this.props} />                {/* distribuir cualquier accesorios que WrapedComponent pueda recibir */}
                  
                </Aux>
            );
        }
    }
}


export default withErrorHandler;