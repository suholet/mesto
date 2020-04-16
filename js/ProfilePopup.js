class ProfilePopup extends Popup {
  constructor({ editProfilePopupElement, api, userInfo }) {
    super(editProfilePopupElement);
    this._api = api;
    this._userInfo = userInfo;
    this._form = document.forms.profile;
    this._submitButton = editProfilePopupElement.querySelector('.popup__button-edit');
    this.setEventListenersForEditProfile();
  }

  setEventListenersForEditProfile() {
    this._form.addEventListener('submit', this.saveProfile.bind(this));
  }

  open() {
    this._submitButton.textContent = "Cохранить"
    // DONE: Надо исправить 
    // Нарушение инкапсуляции -- нельзя напрямую обращаться к переменным класса
    // так их любой поменять сможет, данные следует получать через методы или через геттеры
    // Несложно: https://learn.javascript.ru/private-protected-properties-methods
    this._form.elements.name.value = this._userInfo.userName; // document.querySelector('.user-info__name').textContent;
    this._form.elements.about.value = this._userInfo.aboutUser; //document.querySelector('.user-info__job').textContent;

    this._submitButton.disabled = true;
    // Показываем попап
    this._element.classList.add('popup_is-opened');
  }

  saveProfile(event) {
    event.preventDefault();
    const newName = this._form.elements.name.value;
    const newAbout = this._form.elements.about.value
    this._submitButton.textContent = "Загрузка..."
    this._submitButton.disabled = true;

    this._api.updateProfileInfo(newName, newAbout)
      .then(() => {
        this._userInfo.updateUserInfoElements(newName, newAbout);
        this.close();
      })
      .catch((err) => {
        this._submitButton.textContent = "Загрузить"
        this._submitButton.disabled = false;
        console.log(err);
      });
    // .finally(() => {
    //   this.close();
    // });
  }
}