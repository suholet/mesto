class UserInfo {
  constructor({api, usernameElement, aboutElement, avatarElement}) {
    this._api = api;
    this._usernameElement = usernameElement;
    this._aboutElement = aboutElement;
    this._avatarElement = avatarElement;
    this._username = null;
    this._about = null;
    this._avatar = null;
    this._id = null;
  }

  get userName() {
    return this._username;
  }

  get aboutUser() {
    return this._about;
  }

  get avatarLink() {
    return this._avatar;
  }

  get userID() {
    return this._id;
  }

  setUserInfo() {
    this._api.getUserInfo()
      .then((data) => {
        this._username = data.name;
        this._about = data.about;
        this._avatar = data.avatar;
        this._id = data._id;

        this.updateUserInfoElements(this._username, this._about, this._avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserInfoElements(name, about, avatar = null) {
    // DONE: Можно лучше
    // Эти элементы передать в метод или конструктор, чтобы не брать их из DOM внутри класса
    this._usernameElement.textContent = name;
    this._aboutElement.textContent = about;
    // document.querySelector('.user-info__name').textContent = name;
    // document.querySelector('.user-info__job').textContent = about;
    if (avatar) {
      this._avatarElement.style.backgroundImage = `url(${avatar})`;
      // document.querySelector('.user-info__photo').style.backgroundImage = `url(${avatar})`;
    }
  }

  updateAvatar(avatarUrl) {
    // DONE: Надо исправить
    // avatar не определена, зато avatarUrl не используется
    // На ходовые свойства не влияет, но исправьте
    this._avatar = avatarUrl;
  }
}