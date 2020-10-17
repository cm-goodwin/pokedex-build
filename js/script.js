const pokemonList = [
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

// pokemonList.push({
//   name: "Combusken",
//   height: 2.9,
//   type: ["Fire", "Fighting"],
// });
// pokemonList.push({
//   name: "Blaziken",
//   height: 6,
//   type: ["Fire", "Fighting"],
// });
// pokemonList.push({
//   name: "Marshtomp",
//   height: 2,
//   type: ["Water", "Ground"],
// });
// pokemonList.push({
//   name: "Swampert",
//   height: 4.9,
//   type: ["Water", "Ground"],
// });
// pokemonList.push({ name: "Grovyle", height: 2.9, type: "Grass" });
// pokemonList.push({ name: "Sceptile", height: 5.7, type: "Grass" });
// pokemonList.push({
//   name: "Rayquaza",
//   height: 23,
//   type: ["Dragon", "Flying"],
// });

console.log("pokemonList: ", pokemonList);

// for loop to iterate over pokemon list
for (let i = 0; i < pokemonList.length; i++) {
  // conditional logs pokemon with a height over 20
  if (pokemonList[i].height > 20) {
    document.write(
      `<p class="pokemon">${pokemonList[i].name} (Height: ${pokemonList[i].height}) - Wow, like OMG, that's so big!</p>`
    );
  } else {
    document.write(
      `<p class="pokemon">${pokemonList[i].name} (Height: ${pokemonList[i].height})</p>`
    );
  }
}
