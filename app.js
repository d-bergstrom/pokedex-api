/*====================== Async Pokemon Lookup Function ======================*/

async function pokemonLookup(userInput) {
    const apiEndpoint = "https://pokeapi.co/api/v2/pokemon/"
    const response = await fetch(`${apiEndpoint}${userInput}`);

    //API Request Error Checking
    if (response.status !== 200) {
        throw new Error('Cannot fetch data');
    }

    //Turn response JSON into a JavaScript object
    const data = await response.json();

    console.log(data);

    return data;
}



/* ======== Get user input from Form text field and run Async code ======== */

const userInput = document.querySelector('.user-input');
userInput.addEventListener('submit', event => {
    //Prevent default refresh submit action
    event.preventDefault();

    //Grab the value in the text form field
    const pokemonName = userInput.pokemon.value.toLowerCase();
    console.log(pokemonName);

    //Clear text entry after submission
    userInput.reset();

    pokemonLookup(pokemonName)
        .then(data => updateUI(data))
        .catch(err => console.log("Error:", err));
});




/* ======================= Update the UI DOM Details ======================= */

const container = document.querySelector('.container');
const card = document.querySelector('.card');
const displayedInfo = document.querySelector('.displayed-info');
const pokeball = document.querySelector('.pokeball');


const updateUI = data => {

    // Store values from Pokemon API
    const pokemonName = (data.name)[0].toUpperCase() + data.name.substring(1);
    const pokedexID = data.id;
    const pokemonFrontSprite = data.sprites.front_default;
    const pokemonTypes = () => {
        const types = [];
        data.types.forEach(element => {
            console.log(element);
            types.push(element.type.name);
        });
        return types;
    };


    //Display Pokemon Name and Number to DOM
    displayedInfo.innerHTML =
        `
        <h3 class="mt-3 mb-0">${pokemonName} <span class="text-muted"> ID#${pokedexID}</span></h3>
        <img src=${pokemonFrontSprite} class="pokemon-sprite mt-3 mb-0" />
        <br/>
        `;

    //Display Pokemon Types to DOM
    pokemonTypes().forEach(element => {
        displayedInfo.innerHTML += `<span class="type text-white p-2"> ${(element)[0].toUpperCase() + element.substring(1)}</span><span> </span>`
    });

    const spanElements = document.querySelectorAll('.type');

    spanElements.forEach(item => {
        console.log(typeof item.innerHTML);
        switch (item.innerHTML.trim()) {
            case "Normal":
                item.style.backgroundColor = '#A8A878'
                break;
            case "Fire":
                item.style.backgroundColor = '#F08030'
                break;
            case "Water":
                item.style.backgroundColor = '#6890F0'
                break;
            case "Grass":
                item.style.backgroundColor = '#78C850';
                break;
            case "Electric":
                item.style.backgroundColor = '#F8D030'
                break;
            case "Ice":
                item.style.backgroundColor = '#98D8D8'
                break;
            case "Fighting":
                item.style.backgroundColor = '#C03028'
                break;
            case "Fighting":
                item.style.backgroundColor = '#C03028'
                break;
            case "Poison":
                item.style.backgroundColor = '#A040A0'
                break;
            case "Ground":
                item.style.backgroundColor = '#E0C068'
                break;
            case "Flying":
                item.style.backgroundColor = '#A890F0'
                break;
            case "Psychic":
                item.style.backgroundColor = '#F85888'
                break;
            case "Bug":
                item.style.backgroundColor = '#A8B820'
                break;
            case "Rock":
                item.style.backgroundColor = '#B8A038'
                break;
            case "Ghost":
                item.style.backgroundColor = '#705898'
                break;
            case "Dark":
                item.style.backgroundColor = '#705848'
                break;
            case "Dragon":
                item.style.backgroundColor = '#7038F8'
                break;
            case "Steel":
                item.style.backgroundColor = '#B8B8D0'
                break;
            case "Fairy":
                item.style.backgroundColor = '#F0B6BC'
                break;
        }
    });


    //Add or Remove Info & Ball Logic
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
    if (!pokeball.classList.contains('d-none')) {
        pokeball.classList.add('d-none');
    }

}




/* ======================= Close Button Behavior ======================= */

const clear = document.querySelector(".close-button");
clear.addEventListener('click', event => {

    if (!card.classList.contains('d-none')) {
        card.classList.add('d-none');
    }
    if (pokeball.classList.contains('d-none')) {
        pokeball.classList.remove('d-none');
    }
});