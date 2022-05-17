let vendingMachine = new VendingMachine();

const vendingEl = document.getElementById("vending");
const containerEl = document.getElementById("container");

const btn1 = document.getElementById("buyBtn1");
const btn2 = document.getElementById("buyBtn2");
const btn3 = document.getElementById("buyBtn3");
const btn4 = document.getElementById("buyBtn4");
const btn5 = document.getElementById("buyBtn5");
const btn6 = document.getElementById("buyBtn6");

btn1.addEventListener("click", () => vendingMachine.getFivePack("a", btn1));
btn2.addEventListener("click", () => vendingMachine.getFivePack("b", btn2));
btn3.addEventListener("click", () => vendingMachine.getFivePack("c", btn3));
btn4.addEventListener("click", () => vendingMachine.getFivePack("d", btn4));
btn5.addEventListener("click", () => vendingMachine.getFivePack("e", btn5));
btn6.addEventListener("click", () => vendingMachine.getFivePack("f", btn6));

const pokedexBtnEl = document.getElementById("pokedexBtn");
vendingMachine.containerEl = containerEl;
// window.containerEl = containerEl;
pokedexBtnEl.addEventListener("click", () =>
  vendingMachine.createPokedex(1126)
);

const payBtnEl = document.getElementById("payBtn");
vendingMachine.balanceEl = document.getElementById("balance");
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
  pokemonsObj.forEach((pokemonObj, index) => {
    let backImgEl = document.createElement("img");
    backImgEl.src = "./images/poke_ura_new.jpeg";
    backImgEl.className = "backImg";
    backImgEl.id = `${pokemonObj.data.id}_backImg`;
    console.log(backImgEl.id);

    let cardEl = document.createElement("a");
    cardEl.className = "card";

    idEl = document.createElement("div");
    idEl.className = "pokemonId";
    idEl.innerText = "#" + pokemonObj.data.id;
    console.log(vendingMachine.typeArray);

    cardEl.style.backgroundColor =
      vendingMachine.typeArray[pokemonObj.data.types[0].type.name];

    imgEl = document.createElement("img");
    imgEl.className = "pokemonImg";
    imgEl.src = pokemonObj.data.sprites.front_default;

    nameEl = document.createElement("div");
    nameEl.className = "pokemonName";
    nameEl.innerText = pokemonObj.data.name;

    typeEl = document.createElement("div");
    typeEl.className = "pokemonType";
    typeEl.innerText = pokemonObj.data.types[0].type.name;
    cardEl.append(idEl, imgEl, nameEl, typeEl);

    buyCardsEl = document.createElement("div");
    buyCardsEl.id = `${pokemonObj.data.id}_buyCard`;
    buyCardsEl.className = "GotCardParent";
    console.log("backImgEl: ", backImgEl);
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
  console.log("id: ", id);
  let buyCardsEl = document.getElementById(`${id}_buyCard`);
  console.log("buyCardsEl: ", buyCardsEl);
  buyCardsEl.innerHTML = "";
  buyCardsEl.append(cardEl);
};

const buyBtnEl = document.getElementById("buyBtn");
buyBtnEl.addEventListener("click", () => {
  deleteElem("vending");
  deleteElem("container");
  createPackElem();
});
