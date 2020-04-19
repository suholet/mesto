import Popup from "./Popup.js";

class ViewerPopup extends Popup {
  constructor(element) {
    super(element);
    this.setEventListenersForViewer();
  }

  setEventListenersForViewer() {
    document.addEventListener("keydown", function (event) {
      if (event.key == "Escape") {
        document
          .querySelector(".popup__viewer")
          .classList.remove("popup_is-opened");
      }
    });
  }

  open(cardElement) {
    const imgUrl = cardElement.parentNode.dataset.url; // cardElement.parentNode.querySelector('.place-card__image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
    const imgAlt = cardElement.parentNode.dataset.name; // cardElement.parentNode.querySelector('.place-card__name').textContent;

    // Показываем картинку
    this._element.querySelector(".popup__img").src = imgUrl;
    this._element.querySelector(".popup__img").alt = imgAlt;

    // Показываем попап
    this._element.classList.add("popup_is-opened");
  }

  close() {
    this._element.classList.remove("popup_is-opened");
  }
}

export default ViewerPopup;
