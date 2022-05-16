let vendingMachine = new VendingMachine();

const btn1 = document.getElementById("buyBtn1");
const btn2 = document.getElementById("buyBtn2");
const btn3 = document.getElementById("buyBtn3");
const btn4 = document.getElementById("buyBtn4");
const btn5 = document.getElementById("buyBtn5");
const btn6 = document.getElementById("buyBtn6");

btn1.addEventListener("click", () => vendingMachine.getFivePack("a"));
btn2.addEventListener("click", () => vendingMachine.getFivePack("b"));
btn3.addEventListener("click", () => vendingMachine.getFivePack("c"));
btn4.addEventListener("click", () => vendingMachine.getFivePack("d"));
btn5.addEventListener("click", () => vendingMachine.getFivePack("e"));
btn6.addEventListener("click", () => vendingMachine.getFivePack("f"));

const createPackElement = () => {
  const vendingEl = document.getElementById("vending");
  for (let i = 1; i <= 6; i++) {
    let packAreaEl = document.createElement("div");
    packAreaEl.className = "packArea";

    let packEl = document.createElement("div");
    package.id = `pack${i}`;
    packEl.className = "packCommon";

    let buyBtnEl = document.createElement("buttom");
    buyBtnEl.id = `buyBtn${i}`;
    buyBtnEl.className = "buyBtnCommon";

    packAreaEl.append(packEl, buyBtnEl);
    vendingEl.append(packAreaEl);
  }
};

const createCardElem = (packResult) => {
  const vendingEl = document.getElementById("vending");
  packResult.forEach((pokemon, index) => {
    console.log("pokemon: ", pokemon);
    let cardEl = document.createElement("div");
    cardEl.id = `card${index + 1}`;
    cardEl.innerText = pokemon.data.name;
    cardEl.className = "cardCommon";
    cardEl.style.backgroundColor = "gray";
    cardEl.addEventListener("click", () => operateStyle(cardEl, "red"));

    vendingEl.append(cardEl);
  });
};

const deleteElem = () => {
  const vendingEl = document.getElementById("vending");
  vendingEl.innerHTML = "";
};

const operateStyle = (elem, status) => {
  elem.style.backgroundColor = status;
};
