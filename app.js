async function pokemonLookup(userInput) {
    const apiEndpoint = "https://pokeapi.co/api/v2/pokemon/"

    const response = await fetch(`${apiEndpoint}/${userInput.toLowerCase()}`);
    console.log(`${apiEndpoint}/${userInput}`)
    //API Request Error Checking
    if (response.status !== 200) {
        throw new Error('Cannot fetch data');
    }

    //Turn response JSON into a JavaScript object
    const data = await response.json();

    console.log(data.forms);
    console.log(data.forms)
}


let userInput = "Charizard";
pokemonLookup(userInput);
