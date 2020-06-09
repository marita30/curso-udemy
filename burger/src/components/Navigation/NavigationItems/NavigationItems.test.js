import React from 'react';


/* enzyme nos permite  simplemente renderizar componente  */
import { configure, shallow } from 'enzyme';
import Adapter  from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';



/* LO que hace es que adaptador se instancia con un nuevo adaptador y eso es todo. */
configure({adapter: new Adapter()})


describe('<NavigationItems />', () => {
    /* it lo que hace es que describe o le permite escribir una prueba individul. */
    it('should render  two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow (<NavigationItems />);
        /* Esto es para encontrar navigationItem, la longuitud que esperamos encontrar con el toHaveLength es 2  */
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});