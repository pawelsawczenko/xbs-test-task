import { CURRENCIES, RATES } from "./constants";
import { getDateString } from "./utils";

export const state = {
  todaysDate: getDateString(new Date()),
  pickedDate: null,
  baseCurrency: null,
  convertTo: [],
  userAmount: null,
  convertedAmounts: [],
  rates: {},
};

export function setPickedDate(dateString) {
  state.pickedDate = dateString;
}

export function setBaseCurrency(currency) {
  state.baseCurrency = currency;
}

export function updateConvertTo() {
  state.convertTo = CURRENCIES.filter(
    (currency) => currency != state.baseCurrency
  );
}

export function setUserAmount(num) {
  state.userAmount = num;
}

export function updateConvertedAmounts() {
  state.convertedAmounts = state.convertTo.map((currency) => [
    currency,
    +(
      (state.userAmount / state.rates[state.baseCurrency]) *
      state.rates[currency]
    ).toFixed(4),
  ]);
}

export function setRates(rates) {
  state.rates = rates;
}

function init() {
  setBaseCurrency("BYN");
  updateConvertTo();
  setUserAmount(3.16);
  setRates(RATES);
  updateConvertedAmounts();
  setPickedDate(state.todaysDate);
}

init();
