import View from "./View";

class ConvertedItemsView extends View {
  _parentElement = document.querySelector(".converter-results");

  _generateMarkup() {
    return this._data.convertedAmounts
      .map((currency) => this._generateConverterItem(...currency))
      .join("");
  }

  _generateConverterItem(convertToCurName, convertedAmount) {
    return `<div class="converter-item">
              <label for="converted-amount-${convertToCurName}">${convertToCurName}</label>
              <input
                type="number"
                id="converted-amount-${convertToCurName}"
                name="converted-amount-${convertToCurName}"
                disabled
                value="${convertedAmount}"
              />
            </div>`;
  }

  setData(data) {
    // { convertedAmounts: convertedAmounts }
    this._data = data;
  }

  update() {
    this._data.convertedAmounts.map((currency) => {
      this._parentElement.querySelector(
        `#converted-amount-${currency[0]}`
      ).value = currency[1];
    });
  }
}

export const convertedItems = new ConvertedItemsView();
