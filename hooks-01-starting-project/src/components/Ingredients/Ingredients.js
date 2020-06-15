import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

const Ingredients = () =>  {
  /* ingredients es para obtener los userIngredientes y setUserIngredients es para actualizar la matriz que esta en useState cuando el usuario ingrese nuevos ingredientes.s */
  const [userIngredients, setUserIngredients] = useState([]); 


  /* Agregar ingredients */

  const addIngredientHandler = ingredient => {
                                          /* es un operadr de propagacion que toma todos los elementos de nuestra matriz anterior y lo agrega como elementos a esta nueva matriz */
    setUserIngredients(prevIngredients => [...prevIngredients,
         {id: Math.random().toString(), ...ingredient}
        ]);
  };

  /* Remove Ingredients */

  const removeIngredientsHandler = ingredientId => {
                                                                                    /*  Si no es igual ingrediente.id a ingredientId */
    setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId ));
  };



  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler} />

      <section>
        <Search />
          <IngredientList ingredients = {userIngredients} onRemoveItem = { removeIngredientsHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
