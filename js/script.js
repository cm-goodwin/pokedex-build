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

  // pokemonList.forEach(function (pokemon) {
  //   console.log(
  //     "Name: " +
  //       pokemon.name +
  //       " , Height: " +
  //       pokemon.height +
  //       " , Type: " +
  //       pokemon.type
  //   );
  //   document.write(
  //     "<p class='pokemon'>" +
  //       "Name: " +
  //       pokemon.name +
  //       " , Height: " +
  //       pokemon.height +
  //       " , Type: " +
  //       pokemon.type +
  //       "</p>"
  //   );
  // });

  //Cant seem to get this to work the right way Im goin kind of crazy :/ right now :)
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys(pokemon) !== "name" &&
      Object.keys(pokemon) !== "height" &&
      Object.keys(pokemon) !== "type"
    ) {
      pokemonList.push(pokemon);
    }
  }

  function findByName(name) {
    const search = pokemonList.filter((pokemon) => pokemon.name === name);
    return search;
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add,
    getAll,
    findByName,
  };
})();

pokemonRepo.getAll().forEach((pokemon) => {
  console.log(
    "Name: " +
      pokemon.name +
      " , Height: " +
      pokemon.height +
      " , Type: " +
      pokemon.type
  );
  document.write(
    "<p class='pokemon'>" +
      "Name: " +
      pokemon.name +
      " , Height: " +
      pokemon.height +
      " , Type: " +
      pokemon.type +
      "</p>"
  );
});

// pokemonRepo.add({
//   name: "potato",
// });

//Wasnt sure what it meant by having the forEachLoop inside and outside of the iife cause if i un comment the section below it says the list isnt defined since it has been put locally in the iife

// pokemonList.forEach(function (pokemon) {
//   );
// });
