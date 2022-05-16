// const { expect } = require('chai');
const expect = chai.expect;
// const Pokemonager = require("../pokemonager");
// const VendingMachine = require("../VendingMachine");
// const axios = require("axios").default;

let vendingMachine;

describe("pokemon vending machine", () => {
  it("", async () => {
    vendingMachine = new VendingMachine();
    // let pokemonager = new Pokemonager()
    console.log("vendingMachine: ", vendingMachine);
    // await vendingMachine.allPokemon();
    const actual = await vendingMachine.selectPack("a");
    console.log("actual: ", actual);
    for (let i = 0; i < 200; i++) {
      console.log(actual[0]);
      expect(actual[i].data.id).to.equal(i + 1);
    }
  }).timeout(60 * 1000);

  it("", async () => {
    vendingMachine = new VendingMachine();
    const actual = await vendingMachine.getFivePack("a");
    expect(actual.length).to.equal(5);
  }).timeout(60 * 1000);

  it("", async () => {
    vendingMachine = new VendingMachine();
    const fivePokemons = await vendingMachine.getFivePack("a");
    for (const pokemon of fivePokemons) {
      expect(vendingMachine.pokedex[pokemon.data.id]).to.deep.equal(pokemon);
    }
  }).timeout(60 * 1000);
});
