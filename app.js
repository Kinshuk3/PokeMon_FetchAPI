/*
This is a JS file which creates the whole layout for pokemn page and shows poups and closes them by accessing HTML DOM elements
*/
//get the whole body to work on
const my_pokedex = document.getElementById('my-pokedex');

//store cache data for ecah pokemon
const cache_info = {};

//an async function which fetches the data from Pokemon databse
const pokeFetch = async () => {

         const url = `https://pokeapi.co/api/v2/pokemon/?limit=150`; //url to fetch from with limit of 150

         const res = await fetch(url);
         const data = await res.json();

         //store the pokemon data in an object
         const pokeMon = data.results.map((result, index) =>({
             ...result,
             id: index + 1,
             image_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
         }));
         show_pokemon(pokeMon);
};

//function which access HTML DOM and shows us 150 pokemons
const show_pokemon = (pokemon) =>{
    // console.log(pokemon);
    const poke_string = pokemon.map(element => `
        <li class="card" onclick='choosePokemon(${element.id})'>
            <img class="card-image" src="${element.image_url}" alt='${element.name}'"/>
            <h2 class="card-head">${element.id}. ${element.name}</h2>
        </li>
    `).join("");
    my_pokedex.innerHTML = poke_string;
}

// once any one of 150 pokemon is clicked this method is called
const choosePokemon = async (id) =>{
         //if the data doesnt exists in cache memory, store it in
    if(!cache_info[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        cache_info[id] = data;
        makePopUp(data);
    }
     // else just display popup of the info of pokemon
    else{
        makePopUp(cache_info[id]);
    }
    
    
} 

// function called when pokemon is clicked, it takes in 'id' as param
const makePopUp = (data) =>{
     // store pokemon type here
    const type = data.types.map(type => 
        type.type.name).join(' , ');
         
    //store pokemon image here
    const image = data.sprites['front_default'];
    
    //draw into HTML DOM with this new fetched data
    const my_info = `
        <div class="popup">
            <button id='close' onclick='closePopUp()'>Close</button>
            <div class="card">
                <img class="card-image" src="${image}" alt='${data.name}'"/>
                <h2 class="card-head">${data.id}. ${data.name}</h2>
                <p>Height: ${data.height} | Weight: ${data.weight} | Type: ${type}
            </div>
        </div>
    `
    my_pokedex.innerHTML = my_info + my_pokedex.innerHTML;
};

// This function is called when close button is clikced and it removes the popup screen
const closePopUp = () =>{
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
// call the function
pokeFetch();
