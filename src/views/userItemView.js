import View from "./View";

class UserItemView extends View {
  _parentElement = document.querySelector(".converter-user-item");

  _generateMarkup() {
    return this._generateConverterUserItem();
  }

  _generateConverterUserItem() {
    return (
      this._generateUserSelect(this._data.CURRENCIES) +
      this._generateUserInput(this._data.userAmount)
    );
  }

  _generateUserSelect(CURRENCIES) {
    return `<select name="base-currency" id="base-currency">
              ${CURRENCIES.map((currency) => `<option>${currency}</option>`)}
            </select>`;
  }

  _generateUserInput(userAmount) {
    return `<input type="number" id="user-amount" name="user-amount" value=${userAmount} />`;
  }

  disableItem() {
    this._parentElement.querySelector("#base-currency").disabled = true;
    this._parentElement.querySelector("#user-amount").disabled = true;
  }
  enableItem() {
    this._parentElement.querySelector("#base-currency").disabled = false;
    this._parentElement.querySelector("#user-amount").disabled = false;
  }

  setData(data) {
    // { CURRENCIES: CURRENCIES, userAmount: userAmount }
    this._data = data;
  }

  getInputValue = () => {
    return Number(this._parentElement.querySelector("#user-amount").value);
  };

  getSelectValue() {
    return this._parentElement.querySelector("#base-currency").value;
  }

  addHandlerUpadteInput(hadnler) {
    this._parentElement
      .querySelector("#user-amount")
      .addEventListener("keyup", function (e) {
        const inputValue = Number(e.target.value);
        hadnler(inputValue);
      });
  }

  addHandlerUpadteSelect(hadnler) {
    this._parentElement
      .querySelector("#base-currency")
      .addEventListener("change", function (e) {
        const selectValue = e.target.value;
        hadnler(selectValue);
      });
  }
}

export const userItem = new UserItemView();
