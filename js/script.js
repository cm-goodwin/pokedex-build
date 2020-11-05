let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Adds pokemon
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else console.log("Pokemon is not correct");
  }

  //Lets you search by name
  function findByName(name) {
    const search = pokemonList.filter((pokemon) => pokemon.name === name);
    return search;
  }

  //Retrieves the whole array of data
  function getAll() {
    return pokemonList;
  }

  //Adds pokemon to list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-dark");
    button.classList.add("button");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //loads list
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //loads Details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Adding the details to the item
        item.imageUrl = details.sprites.front_default;
        item.imageUrl = details.sprites.front_shiny;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Show details function
  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    loadList: loadList,
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadDetils: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});
