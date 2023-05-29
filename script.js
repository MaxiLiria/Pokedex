async function getPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150");
    const resPokemons = await res.json();
    getDetailPokemons(resPokemons.results);
  }
  
  async function getDetailPokemons(pokemons) {
    const pokemonsPromises = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    const detailPokemons = await Promise.all(pokemonsPromises);
    pintar(detailPokemons);
  }
  
  function pintar(detailPokemons) {
    const ol$$ = document.querySelector("#pokedex");
    ol$$.innerHTML = ""; 
  
    for (const pokemon of detailPokemons) {
      const li$$ = document.createElement("li");
      li$$.className = "card";
      li$$.innerHTML = `<img class="card-image" src="${pokemon.sprites.front_default}"> <p class="card-subtitle">${pokemon.id}</p> <h2 class="card-title">${pokemon.name}</h2> <p class="card-subtitle">${getTypes(pokemon)}</p>`;
      ol$$.appendChild(li$$);
    }
  }
  
  function getTypes(pokemon) {
    return pokemon.types.map(type => type.type.name).join(", ");
  }
  
    function searchPokemons() {
    const searchValue = document.querySelector(".buscador").value.toLowerCase();
    const cards = document.querySelectorAll(".card");
  
    for (const card of cards) {
      const name = card.querySelector(".card-title").textContent.toLowerCase();
      const id = card.querySelector(".card-subtitle").textContent;
      const types = card.querySelector(".card-subtitle").nextSibling.textContent.toLowerCase();
  
      if (name.includes(searchValue) || id.includes(searchValue) || types.includes(searchValue)) {
        card.style.display = "block";
        
      } else {
        card.style.display = "none";
      }
    }
  }
  
  document.querySelector(".buscador").addEventListener("input", searchPokemons);
  
  getPokemons();
  