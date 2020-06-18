import React, { useReducer, useState, useEffect, useCallback } from 'react';

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

}

const Ingredients = () =>  {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  /* ingredients es para obtener los userIngredientes y setUserIngredients es para actualizar la matriz que esta en useState cuando el usuario ingrese nuevos ingredientes.s */
  /* const [userIngredients, setUserIngredients] = useState([]); */ 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState();

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

    setIsLoading(true);
    
    /* HACER LA PETICION CON RECAT HOOK A FIREBASE */
    fetch('https://react-hooks-562ed.firebaseio.com/ingredients.json', {
      method: 'POST',
      /* Tomara una cadena o matriz y lo convertira a json */
      body: JSON.stringify(ingredient),
      headers:  { 'Content-Type': 'application/json' }
    })

    .then(response => {

      setIsLoading(false);
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
    setIsLoading(true);
    /* HACER LA PETICION CON REACT HOOK A FIREBASE */
    fetch(`https://react-hooks-562ed.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false);
                                                                                      /*  Si no es igual ingrediente.id a ingredientId */
      /* setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId )); */
      dispatch({ type: 'DELETE', id: ingredientId });

    }).catch(error => {
      setIsError('Something went wrong!');
      setIsLoading(false);
    });
    
  };

  /* Error */
  const clearError = () => {
    setIsError(null); 
  }



  return (
    <div className="App">
      {/* Verificamos si el error es verdadero */}
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient = {addIngredientHandler}  
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/> {/* onLoadINgredients viene del archivo search.js */}
          <IngredientList ingredients = {userIngredients} onRemoveItem = { removeIngredientsHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
