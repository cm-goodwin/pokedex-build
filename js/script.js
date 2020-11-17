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
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }

  //Retrieves the whole array of data
  function getAll() {
    return pokemonList;
  }

  //Adds pokemon to list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button", "btn", "btn-dark");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    listPokemon.classList.add("group-list-item");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
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
        item.name = details.name;
        item.imageUrl = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
        let container = document.querySelector("#image-container");
        let myImage = document.createElement("img");
        myImage.src = item.imageUrl;

        container.appendChild(myImage);
      });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty(); //empty the title - this is important as they may add up
    modalBody.empty(); //empty the body - this is important as they may add up

    let nameElement = $("<h1>" + item.name + "</h1>");
    //Creating an image element
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrl);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);

    //creating element for height in modal content
    let heightElement = $("<p> " + "height : " + item.height + "</p>");
    //creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
  }

  //calls data to modal and console
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
      console.log(item);
    });
  }
  return {
    loadList: loadList,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadDetails: loadDetails,
    findByName: findByName,
  };
})();

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});
