const my_pokedex = document.getElementById('my-pokedex');

const cache_info = {};

const pokeFetch = async () => {

         const url = `https://pokeapi.co/api/v2/pokemon/?limit=150`;

         const res = await fetch(url);
         const data = await res.json();

         const pokeMon = data.results.map((result, index) =>({
             ...result,
             id: index + 1,
             image_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
         }));
         show_pokemon(pokeMon);
};

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

const choosePokemon = async (id) =>{
    if(!cache_info[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        cache_info[id] = data;
        makePopUp(data);
    }
    else{
        makePopUp(cache_info[id]);
    }
    
    
} 

const makePopUp = (data) =>{
    const type = data.types.map(type => 
        type.type.name).join(' , ');

    const image = data.sprites['front_default'];

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

const closePopUp = () =>{
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
pokeFetch();