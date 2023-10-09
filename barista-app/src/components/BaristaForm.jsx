import React, {Component, useState} from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";


/**
 * 
 * BaristaForm is a component that renders a form for the user to input their drink order
 * ingredients is an object that contains the different options for each ingredient for users to choose from
 * 
 * @returns a div contains a form for the user to input their drink order
 *          this will be used to make different inputs via radio buttons, so we need to pass in the different answer choices to the radio buttons as props.
 *          We also need to save the user's selection from this nested component (the radio buttons) back in our parent component BaristaForm (as state). 
 *          Because we are passing in a list of choices to be displayed as radio buttons, 
 *          we can use .map() to match each choice with a radio button.
 */


const BaristaForm = () => {
    // drink order state
    const [drink, setDrink] = useState({
        "temperature": "",
        "syrup": "",
        "milk": "",
        "blended": "",
    });

    // ingredients object
    const ingredients = {
        "temperature": ['hot', 'lukewarm', 'cold'],
        "syrup": ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        "milk": ['cow', 'oat', 'goat', 'almond', 'none'],
        "blended": ['yes', 'no'],
    }

    // current drink order, take in string
    const [currentDrink, setCurrentDrink] = useState("");

    // drink recipe, take in object
    const [trueRecipe, setTrueRecipe] = useState({});

    // keep tract of whether we have the correct temperature, syrup, milk, and blended
    const [correctTemperature, setCorrectTemperature] = useState('');
    const [correctSyrup, setCorrectSyrup] = useState('');
    const [correctMilk, setCorrectMilk] = useState('');
    const [correctBlended, setCorrectBlended] = useState('');

    // function to select another random drink called getNextDrink()
    const getNextDrink = () => {
        // get a random drink from json file
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        // set the currentDrink to the random index of the drinksJson
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        // set the trueRecipe to the currentDrink's recipe
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    };

    // function to handle change when different inputs are selected so that the selections get saved within the BaristaForm component's state
    const onNewDrink = () => {
        setDrink({
            "temperature": "",
            "syrup": "",
            "milk": "",
            "blended": "",
        });
        getNextDrink();
        setCorrectTemperature('');
        setCorrectSyrup('');
        setCorrectMilk('');
        setCorrectBlended('');
    };
    const onCheckAnswer = () => {
        if (!ingredients['temperature'].includes(drink['temperature'])) {
            setCorrectTemperature('incorrect');
        } 
        else if (trueRecipe.temp != drink['temperature'])
        {
            setCorrectTemperature('partial-correct');
        }
        else {
            setCorrectTemperature('correct');
        }
        
        if (!ingredients['syrup'].includes(drink['syrup'])) {
            setCorrectSyrup('incorrect');
        } 
        else if (trueRecipe.syrup != drink['syrup'])
        {
            setCorrectSyrup('partial-correct');
        }
        else {
            setCorrectSyrup('correct');
        }
        
        if (!ingredients['milk'].includes(drink['milk'])) {
            setCorrectMilk('incorrect');
        } 
        else if (trueRecipe.milk != drink['milk'])
        {
            setCorrectMilk('partial-correct');
        }
        else {
            setCorrectMilk('correct');
        }
        
        if (!ingredients['blended'].includes(drink['blended'])) {
            setCorrectBlended('incorrect');
        } 
        else if (trueRecipe.blended != drink['blended'])
        {
            setCorrectBlended('partial-correct');
        }
        else {
            setCorrectBlended('correct');
        }
        
    };
  
  return (
    <div>
        <h2>Hi! I would like to order a: </h2>
        <div className="drink-container">
            <h2 className="mini-header">{currentDrink}</h2>
            <button 
                type="new-drink-button"
                className="button newdrink"
                onClick={onNewDrink}
            >
                🔄
            </button>
        </div>
        <form className="container">
            <div className="mini-container">
                <h3>Temperature</h3>
                <div className="answer-space" id={correctTemperature}>
                    {drink["temperature"]} 
                </div>
                <RecipeChoices
                    handleChange={(e) => setDrink((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="temperature"
                    choices={ingredients["temperature"]}
                    currentVal={drink["temperature"]}
                />
            </div>
            <div className="mini-container">
                <h3>Syrup Option</h3>
                <div className="answer-space" id={correctSyrup}>
                    {drink["syrup"]}
                </div>
                <RecipeChoices
                handleChange={(e) => setDrink((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="syrup"
                    choices={ingredients["syrup"]}
                    currentVal={drink["syrup"]}
                />
            </div>
            <div className="mini-container">
                <h3>Milk</h3>
                <div className="answer-space" id={correctMilk}>
                    {drink["milk"]}
                </div>
                <RecipeChoices
                    handleChange={(e) => setDrink((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="milk"
                    choices={ingredients["milk"]}
                    checked={drink["milk"]}
                    currentVal={drink["milk"]}
                />
            </div>
            <div className="mini-container">
                <h3>Blended</h3>
                <div className="answer-space" id={correctBlended}>
                    {drink["blended"]}
                </div>
                <RecipeChoices
                    handleChange={(e) => setDrink((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="blended"
                    choices={ingredients["blended"]}
                    currentVal={drink["blended"]}
                />
            </div>
        </form>

        
        <button 
            type="submit" 
            className="button submit" 
            onClick={onCheckAnswer}
        >
            Check Answer
        </button>

    </div>
  );
  
};

export default BaristaForm;