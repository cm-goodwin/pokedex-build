let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.innerHTML = "";

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
    button.classList.add("btn");
    button.classList.add("btn-dark");
    button.classList.add("button");
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
        item.imageUrlShiny = details.sprites.front_shiny;
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

  //Show details function

  //Modal
  // function showModal(title, text) {
  //   let modal = document.createElement("div");
  //   modal.classList.add("modal");

  //   let closeButtonElement = document.createElement("button");
  //   closeButtonElement.classList.add("modal-close");
  //   closeButtonElement.innerText = "Close";
  //   closeButtonElement.addEventListener("click", hideModal);
  //   let titleElement = document.createElement("h1");
  //   titleElement.innerText = title;
  //   let contentElement = document.createElement("p");
  //   contentElement.innerText = text;
  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(titleElement);
  //   modal.appendChild(contentElement);
  //   modalContainer.appendChild(modal);

  //   modalContainer.classList.add("is-visible");
  // }

  function showModal(item) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = item.name || "";

    let contentElement = document.createElement("p");
    contentElement.innerText = `height: ${item.height}
    weight: ${item.weight}`;

    let imageElementFront = document.createElement("img");
    imageElementFront.setAttribute("src", item.imageUrl);

    let imageElementBack = document.createElement("img");
    imageElementBack.setAttribute("src", item.imageUrlShiny);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElementFront);
    modal.appendChild(imageElementBack);

    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }

  //hides modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  function showDialog(title, text) {
    showModal(title, text);

    //adds confirm and cancel buttons to modal

    let modal = modalContainer.querySelector(".modal");

    let confirmButton = document.createElement("button");
    confirmButton.classList.add("modal-confirm");
    confirmButton.innerText = "Confirm";

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-cancel");
    cancelButton.innerText = "Cancel";

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();
  }

  //escape key hides modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  //click anywhere to close modal

  modalContainer.innerHTML = "";
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
    showDialog: showDialog,
  };
})();

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});
