// your class here
const Pokemonager = require('./pokemonager');
const axios = require('axios').default;
let pokemonager = new Pokemonager()
class VendingMachine {
  constructor() {
    this.balance = 0;
    this.packs = {
      a: [1, 200],
      b: [201, 400],
      c: [401, 600],
      d: [601, 800],
      e: [801, 1000],
      f: [1001, 1126]
    }
    this.selectStatus = ""

    this.inventory = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: []
    };
    this.allPokemon();

  };
  async allPokemon() {
    console.log('allPokemon!!!!!!!');
    let all = await pokemonager.getPokemons(1)
    let jsonData = [];
    let x;
    for (const data of all.data.results) {
      console.log('data: ', data);
      x = await axios.get(data.url)
      jsonData.push(x)
    }
    console.log('jsonData: ', jsonData);
    for (const pokemon of jsonData) {
      if (pokemon.id <= 200) {
        this.inventory.a.push(pokemon);
      } else if (pokemon.id <= 400) {
        this.inventory.b.push(pokemon);
      } else if (pokemon.id <= 600) {
        this.inventory.c.push(pokemon);
      } else if (pokemon.id <= 800) {
        this.inventory.d.push(pokemon);
      } else if (pokemon.id <= 1000) {
        this.inventory.e.push(pokemon);
      } else {
        this.inventory.f.push(pokemon);
      }
    };
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
    this.throwError(Object.keys(this.till).includes(amount.toString()));
    this.till[amount]++;
    this.balance += amount;
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
    this.selectStatus = pack;
    // const packs = await this.generateInventory();
    return this.inventory[pack];
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
}

module.exports = VendingMachine;
