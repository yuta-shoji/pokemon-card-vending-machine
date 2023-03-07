const vendingMachine = new VendingMachine();
const vendingEl = document.getElementById("vending");
const containerEl = document.getElementById("container");
const pokedexBtnEl = document.getElementById("pokedexBtn");
const pokedexTitleEl = document.getElementById('pokedexTitle')
const payBtnEl = document.getElementById("payBtn");
const buyBtnEl = document.getElementById("buyBtn");
const metEl = document.getElementById("numOfMet");

vendingMachine.containerEl = containerEl;
vendingMachine.balanceEl = document.getElementById("balance");
vendingMachine.balanceEl.innerText = vendingMachine.balance;

buyBtnEl.addEventListener("click", () => elemReset());
pokedexBtnEl.addEventListener("click", () => {
  vendingMachine.createPokedex(1126);
  pokedexTitleEl.innerText = 'Your Pokédex';
});
payBtnEl.addEventListener("click", () => {
  vendingMachine.insertCoin(payForm.pay.value);
  let balanceInt = Number(vendingMachine.balanceEl.innerText);
  vendingMachine.balanceEl.innerText = balanceInt + Number(payForm.pay.value);
  payForm.pay.value = "";
});

const createPackElem = () => {
  const srcArray = [
    { src: "./images/pack_ver1.png", value: 260, pack: "a" },
    { src: "./images/pack_ver2.jpg", value: 180, pack: "b" },
    { src: "./images/pack_ver3.jpeg", value: 290, pack: "c" },
    { src: "./images/pack_ver4.jpg", value: 310, pack: "d" },
    { src: "./images/pack_ver5.jpeg", value: 170, pack: "e" },
    { src: "./images/pack_ver6.png", value: 410, pack: "f" },
  ];

  for (let i = 0; i < 6; i++) {
    let packAreaEl = document.createElement("div");
    packAreaEl.className = "packArea";

    let packImgEl = document.createElement("img");
    packImgEl.id = `pack${i + 1}`;
    packImgEl.src = srcArray[i].src;

    packImgEl.className = "packCommon";

    let buyBtnEl = document.createElement("button");
    buyBtnEl.id = `buyBtn${i + 1}`;
    buyBtnEl.value = srcArray[i].value;
    buyBtnEl.innerText = "¥" + String(srcArray[i].value);
    buyBtnEl.className = "buyBtnCommon";

    buyBtnEl.addEventListener("click", () =>
      vendingMachine.getFivePack(srcArray[i].pack, buyBtnEl)
    );

    packAreaEl.append(packImgEl, buyBtnEl);
    vendingEl.append(packAreaEl);
  }
};

const createCardElem = (pokemonsObj) => {
  let imgEl, idEl, nameEl, typeEl;
  pokemonsObj.forEach((pokemonObj) => {
    let backImgEl = document.createElement("img");
    backImgEl.src = "./images/poke_ura_new.jpeg";
    backImgEl.className = "backImg";
    backImgEl.id = `${pokemonObj.data.id}_backImg`;

    let cardEl = document.createElement("a");
    cardEl.className = "winningCard";
    cardEl.style.backgroundColor =
      vendingMachine.typeArray[pokemonObj.data.types[0].type.name];

    idEl = document.createElement("div");
    idEl.className = "winningPokemonId";
    idEl.innerText = "#" + pokemonObj.data.id;

    imgEl = document.createElement("img");
    imgEl.className = "winningPokemonImg";
    imgEl.src = pokemonObj.data.sprites.front_default;

    nameEl = document.createElement("div");
    nameEl.className = "winningPokemonName";
    nameEl.innerText = pokemonObj.data.name;

    typeEl = document.createElement("div");
    typeEl.className = "winningPokemonType";
    typeEl.innerText = pokemonObj.data.types[0].type.name;

    cardEl.append(idEl, imgEl, nameEl, typeEl);
    buyCardsEl = document.createElement("div");
    buyCardsEl.id = `${pokemonObj.data.id}_buyCard`;
    buyCardsEl.className = "winningCardParent";

    backImgEl.addEventListener("click", () =>
      operateStyle(cardEl, pokemonObj.data.id)
    );

    buyCardsEl.append(backImgEl);
    vendingEl.append(buyCardsEl);
  });
};

const deleteElem = (id) => {
  const elem = document.getElementById(id);
  elem.innerHTML = "";
};

const operateStyle = (cardEl, id) => {
  const buyCardsEl = document.getElementById(`${id}_buyCard`);
  buyCardsEl.innerHTML = "";
  buyCardsEl.append(cardEl);
};

const elemReset = () => {
  pokedexTitleEl.innerText = '';
  deleteElem("vending");
  deleteElem("vending");
  deleteElem("container");
  createPackElem();
}

elemReset();
