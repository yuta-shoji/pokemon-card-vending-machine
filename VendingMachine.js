// your class here
// const Pokemonager = require("./pokemonager");
// const axios = require("axios").default;
let pokemonager = new Pokemonager();

class VendingMachine {
  constructor() {
    this.balance = 1000;

    this.inventory = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
    };

    this.typeArray = {
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

    this.pokedex = {};
    this.firstFlg = false;
    this.met = 5;
  }

  async allPokemon() {
    console.log("allPokemon!!!!!!!");
    let all = await pokemonager.getPokemons(1126);
    let jsonDataArray = [];
    let jsonData;
    for (const data of all.data.results) {
      jsonData = await axios.get(data.url);
      jsonDataArray.push(jsonData);
    }
    for (const pokemon of jsonDataArray) {
      if (pokemon.data.id <= 151) {
        this.inventory.a.push(pokemon);
      } else if (pokemon.data.id <= 251) {
        this.inventory.b.push(pokemon);
      } else if (pokemon.data.id <= 386) {
        this.inventory.c.push(pokemon);
      } else if (pokemon.data.id <= 493) {
        this.inventory.d.push(pokemon);
      } else if (pokemon.data.id <= 721) {
        this.inventory.e.push(pokemon);
      } else {
        this.inventory.f.push(pokemon);
      }
      if (this.pokedex[pokemon.data.id] === undefined) {
        this.pokedex[pokemon.data.id] = "";
        this.firstFlg ? this.met++ : '';
      }
    }
    console.log('this.firstFlg: ', this.firstFlg);
    this.firstFlg = true;
    metEl.innerText = this.met;
    console.log('this.met: ', this.met);
  }

  throwError(flag) {
    if (!flag) {
      throw new Error();
    }
  }

  insertCoin(amount) {
    this.balance += Number(amount);
  }

  async selectPack(pack) {
    await vendingMachine.allPokemon();
    this.selectStatus = pack;
    return this.inventory[pack];
  }

  async getFivePack(pack, elem) {
    if (Number(elem.value) > this.balance) {
      window.alert("Not enough balance!");
      return;
    }

    this.balance -= Number(elem.value);
    this.balanceEl.innerText = this.balance;

    deleteElem("vending");
    deleteElem("container");
    const packs = await this.selectPack(pack);
    const packResult = [];
    for (let i = 0; i < 5; i++) {
      let num = this.random(packs.length);
      packResult.push(packs[num]);
    }
    this.addPokedex(packResult);
    createCardElem(packResult);
    return packResult;
  }

  random(upper) {
    return Math.floor(Math.random() * (upper + 1));
  }

  addPokedex(pokeArr) {
    for (const pokemon of pokeArr) {
      this.pokedex[pokemon.data.id] = pokemon;
    }
  }

  async createPokedex(n) {
    try {
      this.containerEl.innerHTML = "";
      const pokemonsObj = await pokemonager.getPokemons(n);
      let pokeData, cardEl, imgEl, idEl, nameEl, typeEl;
      let flg = false;

      for (const pokeObj of pokemonsObj.data.results) {
        pokeData = await axios.get(pokeObj.url);
        !flg ? flg = true : "";

        cardEl = document.createElement("a");
        cardEl.className = "pokedexCard";

        idEl = document.createElement("div");
        idEl.className = "pokedexId";
        idEl.innerText = "#" + pokeData.data.id;

        if (this.pokedex[pokeData.data.id] !== "") {
          cardEl.style.backgroundColor =
            this.typeArray[pokeData.data.types[0].type.name];

          imgEl = document.createElement("img");
          imgEl.className = "pokedexImg";
          imgEl.src = pokeData.data.sprites.front_default;

          nameEl = document.createElement("div");
          nameEl.className = "pokedexName";
          nameEl.innerText = pokeData.data.name;

          typeEl = document.createElement("div");
          typeEl.className = "pokedexType";
          typeEl.innerText = pokeData.data.types[0].type.name;
          cardEl.append(idEl, imgEl, nameEl, typeEl);
        } else {
          cardEl.style.backgroundColor = "white";

          nameEl = document.createElement("div");
          nameEl.className = "pokemonName question";
          nameEl.innerText = "???";

          cardEl.append(idEl, nameEl);
        }

        this.containerEl.append(cardEl);
      }
    } catch (err) {
      throw new Error("error");
    }
  }
}
window.VendingMachine = VendingMachine;
// module.exports = VendingMachine;
