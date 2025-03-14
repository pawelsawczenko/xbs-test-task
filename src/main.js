import { CURRENCIES, RATES } from "./constants";
import "./style.css";

// STATE
const state = {
  baseCurrancy: null,
  convertTo: [],
  userAmount: null,
  convertedAmount: [],
};

function setBaseCurrency(currency) {
  state.baseCurrancy = currency;
}

function setConvertTo(baseCurrancy) {
  state.convertTo = CURRENCIES.filter((currency) => currency != baseCurrancy);
}

function setUserAmount(num) {
  state.userAmount = num;
}

function setConvertedAmount(userAmount) {
  state.convertedAmount = state.convertTo.map((currnecy) => [
    currnecy,
    +((userAmount / RATES[state.baseCurrancy]) * RATES[currnecy]).toFixed(2),
  ]);
}

// console.log(state);
// setBaseCurrency("BYN");
// setConvertTo(state.baseCurrancy);
// setUserAmount(3.44);
// setConvertedAmount(state.userAmount);

// console.log(state);
// console.log(state.convertedAmount);

// console.log(state);
// setBaseCurrency("USD");
// setConvertTo(state.baseCurrancy);
// setUserAmount(10);
// setConvertedAmount(state.userAmount);

// console.log(state);
// console.log(state.convertedAmount);

// ------
const converterUserItem = document.querySelector(".converter-user-item");
const converterResults = document.querySelector(".converter-results");

function genereteConverterUserItem(CURRENCIES, userAmount) {
  return `<select name="base-currency" id="base-currency">
            ${CURRENCIES.map((currency) => `<option>${currency}</option>`)}
          </select>
          <input type="number" id="user-amount" name="user-amount" value=${userAmount} />`;
}

function genereteConverterItem(convertToCurName, convertedAmount) {
  return `<div class="converter-item">
            <label for="converted-amount">${convertToCurName}</label>
            <input
              type="number"
              id="converted-amount"
              name="converted-amount"
              disabled
              value="${convertedAmount}"
            />
          </div>`;
}

function init() {
  setBaseCurrency("BYN");
  setConvertTo(state.baseCurrancy);
  setUserAmount(3.16);
  setConvertedAmount(state.userAmount);

  converterUserItem.innerHTML = genereteConverterUserItem(
    CURRENCIES,
    state.userAmount
  );

  converterResults.innerHTML = state.convertedAmount
    .map((currency) => genereteConverterItem(...currency))
    .join("");
}

// -------
init();

const userInput = document.querySelector("#user-amount");
const userSelect = document.querySelector("#base-currency");

userInput.addEventListener("keyup", () => {
  setUserAmount(userInput.value);

  setConvertedAmount(state.userAmount);

  converterResults.innerHTML = state.convertedAmount
    .map((currency) => genereteConverterItem(...currency))
    .join("");
});

userSelect.addEventListener("change", () => {
  setBaseCurrency(userSelect.value);

  setConvertTo(state.baseCurrancy);
  setConvertedAmount(state.userAmount);

  converterResults.innerHTML = state.convertedAmount
    .map((currency) => genereteConverterItem(...currency))
    .join("");
});
