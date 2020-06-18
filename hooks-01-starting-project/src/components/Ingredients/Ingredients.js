import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

import ErrorModal from '../UI/ErrorModal';

/* Usando el useReducer */
const ingredientReducer = (currentIngredients, action) => {

  switch (action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':  
    /* si el id de ingredientes no es igual deben mantenerse  y el ue sea igual se eliminara de la nueva lista. */
    return currentIngredients.filter(ing => ing.id !== action.id);
    default: 
      throw new Error('SHOULD NO GET THERE!');
  }

};

const httpReducer = (curHttpState, action) => {

  switch(action.type) {
    case 'SEND':
      return { loading: true, error: null}; 
    case 'RESPONSE':
      return { ...curHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...curHttpState, error: null };
    default:
      throw new Error('SHOULD NOT BE REACHED!');
  }

};

const Ingredients = () =>  {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  /* ingredients es para obtener los userIngredientes y setUserIngredients es para actualizar la matriz que esta en useState cuando el usuario ingrese nuevos ingredientes.s */
  /* const [userIngredients, setUserIngredients] = useState([]); */ 
 /*  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(); */

    useEffect(() => {
      console.log('RENDERING INGREDIENTS', userIngredients);
    }, [userIngredients]);


    /* Para filter -- search */
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
      /* setUserIngredients(filteredIngredients) */
      dispatch( { type: 'SET', ingredients: filteredIngredients } );
    }, []);

    
 

  /* Agregar ingredients */

  const addIngredientHandler = ingredient => {

    dispatchHttp({ type: 'SEND'});
    /* HACER LA PETICION CON RECAT HOOK A FIREBASE */
    fetch('https://react-hooks-562ed.firebaseio.com/ingredients.json', {
      method: 'POST',
      /* Tomara una cadena o matriz y lo convertira a json */
      body: JSON.stringify(ingredient),
      headers:  { 'Content-Type': 'application/json' }
    })

    .then(response => {

      dispatchHttp({ type: 'RESPONSE'});
      return response.json();

    })

    .then(responseData => {
                               /* es un operadr de propagacion que toma todos los elementos de nuestra matriz anterior y lo agrega como elementos a esta nueva matriz */
      /* setUserIngredients(prevIngredients => [...prevIngredients,
        {id: responseData.name, ...ingredient}
      ]); */
      dispatch({ 

        type: 'ADD', 
        ingredient: { id: responseData.name, ...ingredient } 

      });
    });
  };
    

  /* Remove Ingredients */

  const removeIngredientsHandler = ingredientId => {
    dispatchHttp({ type: 'SEND'});
    /* HACER LA PETICION CON REACT HOOK A FIREBASE */
    fetch(`https://react-hooks-562ed.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE'});
                                                                                      /*  Si no es igual ingrediente.id a ingredientId */
      /* setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId )); */
      dispatch({ type: 'DELETE', id: ingredientId });

    }).catch(error => {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!'});
    });
    
  };

  /* Error */
  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };



  return (
    <div className="App">
      {/* Verificamos si el error es verdadero */}
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient = {addIngredientHandler}  
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/> {/* onLoadINgredients viene del archivo search.js */}
          <IngredientList ingredients = {userIngredients} onRemoveItem = { removeIngredientsHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
