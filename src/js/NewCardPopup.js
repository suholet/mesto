import Popup from "./Popup.js";

class NewCardPopup extends Popup {
    constructor({addCardPopupElement, cardList}) {
      super(addCardPopupElement);
      this._cardList = cardList;
      this._form = document.forms.new;
      this._submitButton = addCardPopupElement.querySelector('.popup__button-new');
      this.setEventListenersForNewCard();
    }
  
    setEventListenersForNewCard() {
      this._form.addEventListener('submit', this.addNewCard.bind(this));
    }
  
    open() {
      this._submitButton.textContent = "+"
      this._submitButton.style.fontSize = '36px';

      this._submitButton.disabled = true;
      // Показываем попап
      this._element.classList.add('popup_is-opened');
    }
  
    addNewCard(event) {
      event.preventDefault();
  
      const name = this._form.elements.name.value;
      const link = this._form.elements.link.value;
      this._submitButton.textContent = "Загрузка..."
      this._submitButton.style.fontSize = '18px';
      this._submitButton.disabled = true;

      this._cardList.addNewCard(name, link)
      .then(() => {
        this.close();
      })
      .catch((err) => {
        this._submitButton.textContent = "Загрузить"
        this._submitButton.disabled = false;
        console.log(err);
      });
    }
  }

export default NewCardPopup;