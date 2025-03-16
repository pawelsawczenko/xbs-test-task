import { RATES } from "./constants";

export function getDateString(date) {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

function randomizeRate(rate) {
  const persent = Math.random() * 0.2 - 0.1;

  return (rate + persent * rate).toFixed(4);
}

export function getRatesHistory(RATES) {
  const ratesHistory = [];

  for (let i = 1; i < 15; i++) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    ratesHistory.push({
      date: getDateString(date),
      rates: {
        BYN: randomizeRate(RATES.BYN),
        USD: randomizeRate(RATES.USD),
        EUR: randomizeRate(RATES.EUR),
        CNY: randomizeRate(RATES.CNY),
        RUB: randomizeRate(RATES.RUB),
      },
    });
  }

  return ratesHistory;
}

export const ratesHistory = getRatesHistory(RATES);
