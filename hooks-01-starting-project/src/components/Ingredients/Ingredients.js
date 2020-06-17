import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

const Ingredients = () =>  {
  /* ingredients es para obtener los userIngredientes y setUserIngredients es para actualizar la matriz que esta en useState cuando el usuario ingrese nuevos ingredientes.s */
  const [userIngredients, setUserIngredients] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  /* Para cuando uno le de refresh los ingredientes no se borren */
    useEffect(() => { 

      fetch('https://react-hooks-562ed.firebaseio.com/ingredients.json').then(
          response => response.json()
      ).then(responseData => {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            });
          }
           setUserIngredients(loadedIngredients); 
      })
      
    }, []);

    useEffect(() => {
      console.log('RENDERING INGREDIENTS', userIngredients);
    }, [userIngredients]);


    /* Para filter -- search */
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
      setUserIngredients(filteredIngredients)
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
      setUserIngredients(prevIngredients => [...prevIngredients,
        {id: responseData.name, ...ingredient}
      ]);
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
      setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId ));

    });
    
  };



  return (
    <div className="App">
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
