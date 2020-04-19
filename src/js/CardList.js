class CardList {
  constructor({ listContainer, createCard, api, userInfo, viewerPopup }) {
    this._container = listContainer;
    this.createCard = createCard;
    this._api = api;
    this._userInfo = userInfo;
    this._viewer = viewerPopup;
  }

  addCardToContainer(name, link, id, likes = [], isMine = true) {
    const card = this.createCard(
      name,
      link,
      id,
      isMine,
      likes,
      this._container,
      this._viewer,
      this._api,
      this._userInfo
    );
    const cardElement = card.create();
    this._container.appendChild(cardElement);
  }

  render(initialCards) {
    initialCards.forEach(function (item) {
      const isMine = this._userInfo.userID === item.owner._id ? true : false;
      this.addCardToContainer(
        item.name,
        item.link,
        item._id,
        item.likes,
        isMine
      );
    }, this);
  }

  addNewCard(name, link) {
    return this._api
      .addNewCard(name, link)
      .then((data) => {
        this.addCardToContainer(data.name, data.link, data._id);
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default CardList;
