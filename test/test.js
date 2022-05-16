const { expect } = require('chai');
const Pokemonager = require('../pokemonager');
const VendingMachine = require('../VendingMachine');
const axios = require('axios').default;

describe('pokemon vending machine', () => {
    it("", async () => {
        let vendingMachine = new VendingMachine()
        // let pokemonager = new Pokemonager()
        console.log('vendingMachine: ', vendingMachine);
        // await vendingMachine.allPokemon();
        const actual = await vendingMachine.selectPack("a")
        console.log('actual: ', actual);
        for (let i = 0; i < 200; i++) {
            expect(actual[i].data.id).to.equal(i + 1);
        }
    }).timeout(60 * 1000);
})