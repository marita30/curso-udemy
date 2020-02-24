import React, { Component } from 'react';
import './App.css';

 class App extends Component {
  state = {
    /* Declaras una variable llamada userInput */
    userInput: " "
  }
   /* Cambia el valor de la variable userInput */
  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.handler});
  }

   render() {
      return (
       
        <div className="App">
          <ol>
            <li> create an input field (in App component) with a change listener which outputs the length of the entered text below it(e.g in a pharagraph)</li>
            <li>Create a new component(=>ValidationComponent) which receives the text length as a prop</li>
            <li>Inside the validationComponent, either output "Text long enough" depending on the text length (e.g. take 5 as a minimun length) </li>
           <li> Create another component (=> CharComponent) and style it as an inline box(=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid.</li>
           <li>Render a list of CharComponent where each CharComponent receives a different letter of the entered text(in the initial input fiel) as a prop</li>
           <li>When you click a CharComponent, it should be removed from the entered text.</li>
         </ol>
         <p>Hint: Keep in mind that Javascript strings are basically array!</p>
         <hr />
         <input type= "text" onChange={this.inputChangedHandler} />
       </div>
       
      );
    }
  }

export default App;
