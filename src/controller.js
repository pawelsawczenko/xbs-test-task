import "./style.css";
import { CURRENCIES, RATES } from "./constants";
import * as model from "./model";
import { dateItem } from "./views/dateItemView";
import { userItem } from "./views/userItemView";
import { convertedItems } from "./views/convertedItemsView";
import { ratesHistory } from "./utils";

function controlUserInput(inputValue) {
  model.setUserAmount(inputValue);

  model.updateConvertedAmounts();

  convertedItems.setData({ convertedAmounts: model.state.convertedAmounts });
  convertedItems.update();
}

function controlUserSelect(selectValue) {
  model.setBaseCurrency(selectValue);

  model.updateConvertTo();
  model.updateConvertedAmounts();

  convertedItems.setData({ convertedAmounts: model.state.convertedAmounts });
  convertedItems.render();
}

function controlDateInput(dateString) {
  model.setPickedDate(dateString);
  userItem.enableItem();

  if (new Date(model.state.pickedDate) > new Date(model.state.todaysDate)) {
    dateItem.renderMessage(
      "Please choose any date before today or today's date to use the converter.",
      "error"
    );
    userItem.disableItem();

    return;
  }

  if (model.state.pickedDate === model.state.todaysDate) {
    dateItem.renderMessage(
      "You can choose any past date to see the history of exchange rates."
    );

    model.setRates(RATES);
  }

  if (new Date(model.state.pickedDate) < new Date(model.state.todaysDate)) {
    const filteredHistory = ratesHistory.filter(
      (rateDay) => rateDay.date === model.state.pickedDate
    );

    if (filteredHistory.length) {
      dateItem.renderMessage(
        "Exchange rates from a past date are being used. Choose today's date to convert using current rates.",
        "warning"
      );

      model.setRates(filteredHistory[0].rates);
    } else {
      dateItem.renderMessage(
        `The date is too far in the past. Exchange rates from ${ratesHistory.length} days ago are being used.`,
        "warning"
      );

      model.setRates(ratesHistory[ratesHistory.length - 1].rates);
    }
  }

  model.updateConvertedAmounts();
  convertedItems.setData({ convertedAmounts: model.state.convertedAmounts });
  convertedItems.update();
}

function init() {
  dateItem.setData({ dateString: model.state.todaysDate });
  dateItem.render();

  userItem.setData({ CURRENCIES, userAmount: model.state.userAmount });
  userItem.render();

  convertedItems.setData({ convertedAmounts: model.state.convertedAmounts });
  convertedItems.render();

  userItem.addHandlerUpadteInput(controlUserInput);
  userItem.addHandlerUpadteSelect(controlUserSelect);
  dateItem.addHandlerDateInput(controlDateInput);
}

// -------
init();
