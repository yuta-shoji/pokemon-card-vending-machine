// const axios = require("axios").default;

class Pokemonager {
  constructor() {
    // const allPokemonBtn = document.querySelector('#allPokemonBtn');
    // allPokemonBtn.addEventListener("click", () => this.createPokemonCard(200));
    // this.containerEl = document.querySelector('#container');
    // this.pokemonSingle = new PokemonSingle;
  }

  async getPokemons(n) {
    console.log("getPokemons!!");
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${n}&offset=0`;
    try {
      return await axios.get(url);
      // const data = await fetch(url);
      // return await data.json();
    } catch (err) {
      throw new Error("error");
    }
  }

  async createPokemonCard(n) {
    console.log("createPokemonCard started");

    const typeArray = {
      grass: "rgb(115, 185, 115)",
      poison: "rgb(126, 86, 132)",
      fire: "rgb(245, 142, 87)",
      flying: "rgb(156, 243, 253)",
      water: "rgb(110, 159, 249)",
      bug: "rgb(181, 211, 143)",
      normal: "rgb(228, 228, 228)",
      electric: "rgb(211, 207, 81)",
      ground: "rgb(177, 176, 157)",
      fairy: "rgb(241, 179, 250)",
      fighting: "rgb(255, 86, 86)",
      psychic: "rgb(243, 147, 135)",
      rock: "rgb(179, 153, 130)",
      steel: "rgb(128, 148, 179)",
      ice: "rgb(139, 207, 255)",
      ghost: "rgb(142, 123, 196)",
      dragon: "rgb(87, 110, 203)",
      dark: "rgb(109, 109, 109)",
    };

    try {
      this.containerEl.innerHTML = "";
      const pokemonsObj = await this.getPokemons(n);
      let pokeData, cardEl, imgEl, idEl, nameEl, typeEl, allType;
      let flg = false;

      for (const pokeObj of pokemonsObj.data.results) {
        pokeData = await axios.get(pokeObj.url);
        !flg ? ((flg = true), console.log(pokeData.data)) : "";

        cardEl = document.createElement("a");
        cardEl.className = "card";
        cardEl.style.backgroundColor =
          typeArray[pokeData.data.types[0].type.name];
        // cardEl.href = './pokemon.html';
        cardEl.addEventListener("click", {
          pokemon: pokeData.data,
          element: this.containerEl,
          handleEvent: this.pokemonSingle.single,
        });

        idEl = document.createElement("div");
        idEl.className = "pokemonId";
        idEl.innerText = "#" + pokeData.data.id;

        imgEl = document.createElement("img");
        imgEl.className = "pokemonImg";
        imgEl.src = pokeData.data.sprites.front_default;

        nameEl = document.createElement("div");
        nameEl.className = "pokemonName";
        nameEl.innerText = pokeData.data.name;

        typeEl = document.createElement("div");
        typeEl.className = "pokemonType";
        // pokeData.data.types.forEach(type => allType += type.type.name + ' ');
        // typeEl.innerText = allType.trim();
        // allType = '';
        typeEl.innerText = pokeData.data.types[0].type.name;

        cardEl.append(idEl, imgEl, nameEl, typeEl);
        this.containerEl.append(cardEl);
      }
    } catch (err) {
      throw new Error("error");
    }
  }

  async findNames(n) {
    try {
      // const pokemonsObj = await fetch(url);
      const pokemonsObj = await this.getPokemons(n);
      console.log("pokemonsObj: ", pokemonsObj);
      return pokemonsObj.data.results.map((pokemon) => pokemon.name);
    } catch (err) {
      throw new Error("error");
    }
  }

  async findUnderWeight(weight) {
    const names = await this.findNames(10);
    const result = [];
    const url = "https://pokeapi.co/api/v2/pokemon/";

    try {
      for (const name of names) {
        const pokemonsObj = await axios.get(url + name);
        // console.log('pokemonsObj: ', pokemonsObj);
        pokemonsObj.data.weight < weight ? result.push(pokemonsObj.data) : "";
      }
      return result;
    } catch (err) {
      throw new Error("error");
    }
  }

  // async getAllPokemon() {
  //   const allPokemon = (
  //     await axios
  //       .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
  //       .catch((error) => console.log(error))
  //   ).data.results;

  //   // const allPokemonUrl = allPokemon.map((pokemon) => pokemon.url);

  //   const allPokemonObj = await Promise.all(
  //     allPokemon.map((pokemon) => axios.get(pokemon.url))
  //   ).catch((error) => console.log(error));
  //   console.log('allPokemonObj: ', allPokemonObj);

  //   const allPokemonBook = allPokemonObj.map((pokemon) => pokemon.data);

  //   console.log('allPokemonBook: ', allPokemonBook);
  //   return allPokemonBook;
  // }
}

class PokemonSingle {
  async single() {
    this.element.innerHTML = "";
    const singleId = document.querySelector("#pokeSingleId");
    const singleName = document.querySelector("#pokeSingleName");
    const singleType = document.querySelector("#pokeSingleType");
    const singleImg = document.querySelector("#pokeSingleImg");
    singleId.innerText = this.pokemon.id;
    singleName.innerText = this.pokemon.name;
    singleType.innerText = this.pokemon.types[0].type.name;
    singleImg.src = this.pokemon.sprites.front_default;
  }
}

const pokeAll = new Pokemonager();

window.Pokemonager = Pokemonager;
// module.exports = Pokemonager;

//1126
