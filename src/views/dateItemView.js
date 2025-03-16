import View from "./View";

class DateItem extends View {
  _parentElement = document.querySelector(".converter-date-item");

  _generateMarkup() {
    return this._generateConverterDateItem();
  }

  _generateConverterDateItem() {
    return `<input type="date" name="date-picker" id="date-picker" value="${this._data.dateString}"/>
              <label for="date-picker" id="date-label"
                >You can choose any past date to see the history of exchange rates.</label
              >`;
  }

  setData(data) {
    // { dateString: dateString }
    this._data = data;
  }

  getDateString = () => {
    return this._parentElement.querySelector("#date-picker").value;
  };

  renderMessage(message, type = "none") {
    const label = this._parentElement.querySelector("#date-label");

    label.innerHTML = message;

    if (type === "error") {
      label.classList.add("error");
      label.classList.remove("warning");
    }
    if (type === "warning") {
      label.classList.remove("error");
      label.classList.add("warning");
    }
    if (type === "none") {
      label.classList.remove("error");
      label.classList.remove("warning");
    }
  }

  addHandlerDateInput(hadnler) {
    this._parentElement
      .querySelector("#date-picker")
      .addEventListener("change", function (e) {
        const dateString = e.target.value;
        hadnler(dateString);
      });
  }
}

export const dateItem = new DateItem();
