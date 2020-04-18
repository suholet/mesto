import Popup from "./Popup.js";

class AvatarPopup extends Popup {
  constructor({ avatarPopupElement, api, userInfo }) {
    super(avatarPopupElement);
    this._api = api;
    this._userInfo = userInfo;
    this._form = document.forms.avatar;
    this._submitButton = avatarPopupElement.querySelector('.popup__button-avatar');
    this.setEventListenersForAvatar();
  }

  setEventListenersForAvatar() {
    this._form.addEventListener('submit', this.saveAvatar.bind(this));
  }

  open() {
    this._submitButton.textContent = "Cохранить"
    this._submitButton.disabled = true;
    // Показываем попап
    this._element.classList.add('popup_is-opened');
  }

  saveAvatar(event) {
    event.preventDefault();

    const link = this._form.elements.link.value;
    this._submitButton.textContent = "Загрузка..."
    this._submitButton.disabled = true;

    this._api.updateAvatar(link)
      .then(() => {
        this._userInfo.setUserInfo();
        this.close();
      })
      .catch((err) => {
        this._submitButton.textContent = "Загрузить"
        this._submitButton.disabled = false;
        console.log(err);
      });
  }

}

export default AvatarPopup;