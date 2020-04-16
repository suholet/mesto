class CardList {
  constructor({ listContainer, createCard, api, userInfo, viewerPopup }) {
    this._container = listContainer;
    this.createCard = createCard;
    this._api = api;
    this._userInfo = userInfo;
    this._viewer = viewerPopup;
  }

  addCardToContainer(name, link, id, likes = [], isMine = true) {
    const card = this.createCard(name, link, id, isMine, likes, this._container, 
      this._viewer, this._api, this._userInfo);
    const cardElement = card.create();
    this._container.appendChild(cardElement);
  }

  render(initialCards) {
    // Done: Можно лучше
    // Удобнее массив было получить в точке сборки и передать уже в этот метод
    // Чем это лучше -- массив можно передать и не с сервера, а локально, что может при разработке и тестировании быть удобнее
    // При такой реализации мы сильнее зависим от api и знании о его методах.
    // Чем меньше классы проникают друг в друга, тем лучше, т.е. если есть выбор
    // передать инстанс класса как параметр или только метод инстанса класса -- лучше передать метод,
    // его проще сделать "заглушкой", которая будет возвращать то, что нам нужно при тестировании
    // this._api.getInitialCards()
    //   .then((data) => {
    //     data.forEach(function (item) {
    //       const isMine = this._userInfo.userID === item.owner._id ? true : false;
    //       this.addCardToContainer(item.name, item.link, item._id, item.likes, isMine);
    //     }, this)

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    initialCards.forEach(function (item) {
      const isMine = this._userInfo.userID === item.owner._id ? true : false;
      this.addCardToContainer(item.name, item.link, item._id, item.likes, isMine);
    }, this);
  }

  addNewCard(name, link) {
    return this._api.addNewCard(name, link)
      .then((data) => {
        this.addCardToContainer(data.name, data.link, data._id);
      })
      .catch((err) => {
        // console.log(err);
        throw err;
      });
  }
}