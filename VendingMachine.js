// your class here
// const Pokemonager = require("./pokemonager");
// const axios = require("axios").default;
let pokemonager = new Pokemonager();

class VendingMachine {
  constructor() {
    this.balance = 0;
    this.packs = {
      a: [1, 151],
      b: [152, 251],
      c: [252, 386],
      d: [387, 493],
      e: [494, 721],
      f: [722, 1126],
    };
    this.selectStatus = "";

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
    // this.allPokemon();
    this.fiveElem = [];
  }

  async allPokemon() {
    console.log("allPokemon!!!!!!!");
    let all = await pokemonager.getPokemons(1126);
    let jsonData = [];
    let x;
    for (const data of all.data.results) {
      // console.log("data: ", data);
      x = await axios.get(data.url);
      jsonData.push(x);
    }
    // console.log("jsonData: ", jsonData);
    for (const pokemon of jsonData) {
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
      }
    }
  }

  // pokemonager.getAllPokemon().then((res) => {
  //   this.inventory = {
  //     a: res.filter(pokemon => pokemon.id <= 200),
  //     b: res.filter(pokemon => pokemon.id >= 201 && pokemon.id <= 400),
  //     c: res.filter((pokemon => pokemon.id >= 401 && pokemon.id <= 600)),
  //     d: res.filter((pokemon => pokemon.id >= 601 && pokemon.id <= 80)),
  //     e: res.filter((pokemon => pokemon.id >= 801 && pokemon.id <= 1000)),
  //     f: res.filter((pokemon => pokemon.id >= 1001 && pokemon.id <= 1126))
  //   };
  //   return this.inventory
  // });

  throwError(flag) {
    if (!flag) {
      throw new Error();
    }
  }
  insertCoin(amount) {
    // this.throwError(Object.keys(this.till).includes(amount.toString()));
    // this.till[amount]++;
    this.balance += Number(amount);
  }
  // selectRow(row) {
  //   this.rowBtn = "ABCD";
  //   this.throwError(this.rowBtn.indexOf(row) !== -1);
  //   this.selectedRow = this.rowBtn.indexOf(row);
  //   console.log("selected row    : ", this.rowBtn[this.selectedRow]);
  //   return this.selectedRow;
  // }

  // selectColumn(column) {
  //   this.throwError(column > 0 && column <= 4);
  //   this.selectedColumn = column - 1;
  //   console.log("selected column : ", this.selectedColumn);
  //   return this.selectedColumn;
  // }

  async selectPack(pack) {
    await vendingMachine.allPokemon();
    this.selectStatus = pack;
    // const packs = await this.generateInventory();
    return this.inventory[pack];
  }

  async getFivePack(pack, elem) {
    if (Number(elem.value) > this.balance) {
      window.alert("Not enough balance!");
      return;
    }

    console.log(this.balance);
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
    console.log("packResult: ", packResult);
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

  releaseItem() {
    this.selectedItem = this.inventory[this.selectedRow][this.selectedColumn];
    this.throwError(this.selectedItem.count !== 0);
    this.throwError(this.selectedItem.price <= this.balance);
    this.selectedItem.count--;

    console.log(
      `selectedRow : ${this.rowBtn[this.selectedRow]}`,
      `selectedColumn : ${this.selectedColumn}`
    );
    console.log(`Here is your [${this.selectedItem.name}]`);

    return this.selectedItem;
  }

  changeReturn() {
    if (this.selectedItem === undefined) {
      console.log("change          :", this.balance);
      let beforeBalance = this.balance;
      this.balance = 0;
      return beforeBalance;
    }
    const changes = {
      1: 0,
      5: 0,
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this.change = this.balance - this.selectedItem.price;
    console.log("change          :", this.change);

    const reversedArray = Object.keys(changes)
      .map((key) => Number(key))
      .sort((a, b) => b - a);

    for (const coin of reversedArray) {
      while (this.change > 0) {
        if (this.change >= coin) {
          this.change -= coin;
          changes[coin]++;
        } else {
          break;
        }
      }
    }
    this.balance = 0;
    console.group("💰Details of change");
    for (const key in changes) {
      console.log(`${key} yen : ${changes[key]} coins`);
    }
    console.groupEnd();
    return changes;
  }

  async createPokedex(n) {
    try {
      this.containerEl.innerHTML = "";
      const pokemonsObj = await pokemonager.getPokemons(n);
      let pokeData, cardEl, imgEl, idEl, nameEl, typeEl, allType;
      let flg = false;

      for (const pokeObj of pokemonsObj.data.results) {
        pokeData = await axios.get(pokeObj.url);
        !flg ? ((flg = true), console.log(pokeData.data)) : "";

        cardEl = document.createElement("a");
        cardEl.className = "card";

        idEl = document.createElement("div");
        idEl.className = "pokemonId";
        idEl.innerText = "#" + pokeData.data.id;

        if (this.pokedex[pokeData.data.id] !== "") {
          cardEl.style.backgroundColor =
            this.typeArray[pokeData.data.types[0].type.name];
          // cardEl.href = './pokemon.html';
          // cardEl.addEventListener("click", {
          //   pokemon: pokeData.data,
          //   element: this.containerEl,
          //   handleEvent: this.pokemonSingle.single,
          // });

          imgEl = document.createElement("img");
          imgEl.className = "pokemonImg";
          imgEl.src = pokeData.data.sprites.front_default;

          nameEl = document.createElement("div");
          nameEl.className = "pokemonName";
          nameEl.innerText = pokeData.data.name;

          typeEl = document.createElement("div");
          typeEl.className = "pokemonType";
          typeEl.innerText = pokeData.data.types[0].type.name;
          cardEl.append(idEl, imgEl, nameEl, typeEl);
          this.fiveElem.push(cardEl);
        } else {
          cardEl.style.backgroundColor = "white";

          nameEl = document.createElement("div");
          nameEl.className = "pokemonName hatena";
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
