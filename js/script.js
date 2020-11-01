let pokemonRepo = (function () {
  let pokemonList = [
    {
      name: "Combusken",
      height: 2.9,
      type: ["Fire", "Fighting"],
    },
    {
      name: "Blaziken",
      height: 6,
      type: ["Fire", "Fighting"],
    },
    {
      name: "Marshtomp",
      height: 2,
      type: ["Water", "Ground"],
    },
    {
      name: "Swampert",
      height: 4.9,
      type: ["Water", "Ground"],
    },
    { name: "Grovyle", height: 2.9, type: "Grass" },
    { name: "Sceptile", height: 5.7, type: "Grass" },
    {
      name: "Rayquaza",
      height: 23,
      type: ["Dragon", "Flying"],
    },
  ];
  //Adds pokemon
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
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
    let pokeList = document.querySelector("ul");
    let listItem = document.createElement("li");
    //Adds a button and an event listener
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-dark");
    1;
    button.classList.add("button");
    button.addEventListener("click", function (showDetails) {
      console.log(pokemon);
    });
    pokeList.appendChild(button);
    pokeList.appendChild(listItem);
  }
  //Show details function
  function showDetails(pokemon) {
    console.log(pokemon);
    return { pokemon };
  }

  return {
    add,
    getAll,
    findByName,
    addListItem,
    showDetails,
  };
})();

pokemonRepo.getAll().forEach((pokemon) => {
  pokemonRepo.addListItem(pokemon);
});
