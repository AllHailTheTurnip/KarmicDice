// Karmic Dice, by All Hail the Turnip.
// Creates an array of integers 1-X, which are shuffled.
// Increasing weight increases chance of getting same number more than once in a row.
// You can not include a destination if you just want to generate a random number.
// You can call roll remotely, even if you don't want to inject the button into your page.
const faces = 20;
const multiples = 2;
let results = [];
let index = 0;
let presentResult;

// Populate the array.
let totalResults = faces * multiples;
let absoluteSum = 0;
for (let i = 0; i < totalResults; i++) {
    let value = (i % faces) + 1;
    results.push(value);

    absoluteSum += value;
}

// Adds the dice roller to the element 'KarmicDiceRoller'.
function InjectKarmicDiceRollerIntoElement() {
    const divider = document.getElementById('KarmicDiceRoller');
    divider.innerHTML =
        `
        Dice Roller.
        <br>
        <button onclick="RollKarmicDice()">Roll</button>
        <p id="KarmicDiceResult"></p>
        `;
}

function ShuffleResults() {
    let randResult = [];
    for (let i = 0; i < totalResults; i++) {

        // Pull a random number from the array.
        let randIndex = Math.floor(Math.random() * results.length);
        let grab = results[randIndex];

        // Add it to the new array.
        randResult.push(grab);

        // Remove it from the old array.
        results.splice(randIndex, 1);
    }

    // Make results into randResult.
    results = randResult;
}

// Assigns the result variable to the page.
function SetResults(result, destination) {
    document.getElementById(destination).innerHTML = result;
}

// Proves that the method works by adding all the possible results together
// and comparing.
function ShuffleTest() {
    ShuffleResults();

    // Print out results.
    let output = "";
    for (let i = 0; i < totalResults; i++) {
        output += results[i] + "<br>";
    }

    // Check for duplicates.
    let comparisonSum = 0;
    for (let i = 0; i < totalResults; i++) {
        comparisonSum += results[i];
    }

    output += "Total: " + absoluteSum + "/" + comparisonSum;


    SetResults(output);
}

function RollKarmicDice(destination) {
    // Get the result and move onto the next iteration.
    let singleRoll = results[index];
    presentResult = singleRoll;
    index++;

    // Reset when all results have been used.
    if (index === results.length) {
        index = 0;
        ShuffleResults();
    }

    // Update the page with the result.
    if (destination !== null)
        SetResults(singleRoll, destination);
}

// Automatically shuffles the results at the beginning.
ShuffleResults();




