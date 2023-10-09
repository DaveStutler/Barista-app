import React, { Component, useEffect, useState } from "react";

/**
 * 
 * @param {handleChange, label, choices, checked} param0 
 * @returns this will be used to make different inputs via radio buttons, so we need to pass in the different answer choices to the radio buttons as props.
 *          We also need to save the user's selection from this nested component (the radio buttons) back in our parent component BaristaForm (as state). 
 *          Because we are passing in a list of choices to be displayed as radio buttons, 
 *          we can use .map() to match each choice with a radio button.
 *         We need to pass in the following props:
 *              handleChange: a function that will be called when the user selects a radio button
 *                              How we will handle change when different inputs are selected so that the selections get saved within the BaristaForm component's state
 *              label: the name of the ingredient that the user is selecting
 *                      A label describing the corresponding ingredient (e.g., "milk")
 *              choices: the list of choices that the user can select from
 *              checked: the current choice that the user has selected
 */

const RecipeChoices = ({ handleChange, label, choices, currentVal }) => {
    return (
      <div className="radio-buttons">
        <input
          type="text"
          name={label}
          value={currentVal}
          placeholder="Guess the ingredient..."
          onChange={handleChange}
          className = "textbox"
        />
        {choices && choices.map((choice) => (
          <li key={choice}>
            {choice}
          </li>
        ))}
      </div>
    );
};

export default RecipeChoices;