// async function pokeFetch(url){
//     let response = await fetch(url);
//     let data = await response.json();

//     console.log(data); // all data

//     let num = data.id;
//     // console.log(num); // get the poke id

//     let name = data.name;
//     // console.log(name); // name

//     document.getElementById('canvas').innerHTML += `<h2>${num}. ${name}</h2>`; // get name/id into DOM 

//     let types = data.types; //array of object of types
//     const array_types = [];

//     types.forEach(element => { //get the types of pokemon separately in an array
//         let all_type = element.type.name;
//         array_types.push(all_type);

//     });

//     // console.log(array_types);
//     document.getElementById('canvas').innerHTML += `<p>Types: ${array_types[0]} ${array_types[1]}</p>`;

//     let image_url = data.sprites.front_default;
//     document.getElementById('canvas').innerHTML += `<img src = ${image_url} alt = ${name}>`; //get the pokemon's image
// }

// pokeFetch('https://pokeapi.co/api/v2/pokemon/1');

const my_pokedex = document.getElementById('my-pokedex');
console.log(my_pokedex);

const pokeFetch = () => {

    const promises = [];

    for (let i = 1; i <= 100; i++) {

        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()))
    }
    
    Promise.all(promises).then(results =>{
        const get_pokemon = results.map((data) =>({
            name: data.name,
            id: data.id,
            image_url: data.sprites.front_default,
            type: data.types.map(element => element.type.name)
                .join(', ')
        }))
        console.log(show_pokemon(get_pokemon));
    })

};

const show_pokemon = (pokemon) =>{
    console.log(pokemon);
    const poke_string = pokemon.map(element => `
        <li class="card">
            <img class="card-image" src="${element.image_url}" alt='${element.name}'"/>
            <h2 class="card-head">${element.id}. ${element.name}</h2>
            <p class="card-bottom">Types: ${element.type}</p>
        </li>
    `).join("");
    my_pokedex.innerHTML = poke_string;
}

pokeFetch();