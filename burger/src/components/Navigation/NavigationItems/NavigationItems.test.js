import React from 'react';


/* enzyme nos permite  simplemente renderizar componente  */
import { configure, shallow } from 'enzyme';
import Adapter  from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';



/* LO que hace es que adaptador se instancia con un nuevo adaptador y eso es todo. */
configure({adapter: new Adapter()})


describe('<NavigationItems />', () => {

    let wrapper;
    /* Esta es na funcion que e ejecutara automaticamente  */
    beforeEach(() => {
        wrapper = shallow (<NavigationItems />);
    });


    /* it lo que hace es que describe o le permite escribir una prueba individul. */
    it('should render  two <NavigationItem /> elements if not authenticated', () => {
        /* Esto es para encontrar navigationItem, la longuitud que esperamos encontrar con el toHaveLength es 2  */
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });


    /* Queremos tener tres elemento de navegacion si estmos authenticados  */
    it('should render  three <NavigationItem /> elements if authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        /* Esto es para encontrar navigationItem, la longuitud que esperamos encontrar con el toHaveLength es 2  */
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    /* Para verificar que cuando el usuario este authenticated se le muestre el logout */
    it('should render  three <NavigationItem /> elements if authenticated', () => {
         wrapper.setProps({isAuthenticated: true});
        /* Esto es para encontrar el Logout, toEqual puedo verificar si esto dos igual verdadero  le ponemos true , encontrarlo si estamos authenticados  */
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });


});