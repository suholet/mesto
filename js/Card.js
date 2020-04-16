class Card {
  constructor({ name, link, id, isMine, likes, parentContainer, viewer, api, userInfo }) {
    this._name = name;
    this._url = link;
    this._id = id;
    this._isMine = isMine;
    this._likes = likes;
    this._api = api;
    this._userInfo = userInfo;

    // сюда добавляем все карточки
    this._parentContainer = parentContainer;
    // это попап для просмотра картинки
    this._viewer = viewer;
  }

  like(cardElement) {
    const cardLikesCounter = cardElement.parentElement.querySelector('.place-card__like-counter');
    // Если лайк уже стоит, то удалим его
    if (cardElement.classList.contains('place-card__like-icon_liked')) {
      this._api.dislikeCard(this._id)
        .then(() => {
          cardLikesCounter.textContent = parseInt(cardLikesCounter.textContent) - 1;
          cardElement.classList.remove('place-card__like-icon_liked');
        })
        .catch((err) => {
          console.log(err);
        });
      // .finally(() => {
      //   cardLikesCounter.textContent = parseInt(cardLikesCounter.textContent) - 1;
      //   cardElement.classList.remove('place-card__like-icon_liked');
      // });
    }
    else {
      this._api.likeCard(this._id)
        .then(() => {
          cardLikesCounter.textContent = parseInt(cardLikesCounter.textContent) + 1;
          cardElement.classList.add('place-card__like-icon_liked');
        })
        .catch((err) => {
          console.log(err);
        });
      // .finally(() => {
      //   cardLikesCounter.textContent = parseInt(cardLikesCounter.textContent) + 1;
      //   cardElement.classList.add('place-card__like-icon_liked');
      // });
    }
    // cardElement.classList.toggle('place-card__like-icon_liked');
  }

  remove(cardElement) {
    const message = 'Вы действительно хотите удалить эту карточку?';
    const isConfirmed = window.confirm(message);
    if (isConfirmed) {
      this._api.deleteCard(this._id)
        .then(() => {
          this._parentContainer.removeChild(cardElement.closest('.place-card'));
        })
        .catch((err) => {
          console.log(err);
        });
      // .finally(() => {
      //   // DONE: Карточка удалиться в любом случае, что бы там с сервером не произошло
      //   // а это неверно
      //   // Надо исправить
      //   this.parentContainer.removeChild(cardElement.closest('.place-card'));
      // });
    }
  }

  show(cardElement) {
    this._viewer.open(cardElement);
  }

  isLiked(likes) {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i]._id === this._userInfo.userID) {
        return true;
      }
    }
    return false;
  }

  create() {
    const cardTemplate = document.querySelector('[data-component="card"]');

    const cardFragment = cardTemplate.content.cloneNode(true);
    const cardContainer = cardFragment.querySelector('.place-card');

    const cardPlaceName = cardContainer.querySelector('.place-card__name');
    const cardPlaceImage = cardContainer.querySelector('.place-card__image');
    const cardLikesCounter = cardContainer.querySelector('.place-card__like-counter');
    const cardLikeBtn = cardContainer.querySelector('.place-card__like-icon');

    cardPlaceName.textContent = this._name;
    cardContainer.dataset.name = this._name;
    cardPlaceImage.style.backgroundImage = `url(${this._url})`;
    cardContainer.dataset.id = this._id;
    cardContainer.dataset.url = this._url;
    cardLikesCounter.textContent = this._likes.length;
    // Проверяем, есть ли среди среди лайков мои
    if (this.isLiked(this._likes)) {
      cardLikeBtn.classList.add('place-card__like-icon_liked');
    }
    // Отображаем кнопку удалить только на своих карточках
    if (this._isMine) {
      const deleteBtnElement = cardContainer.querySelector('.place-card__delete-icon');
      deleteBtnElement.style.display = 'block';
    }

    cardContainer.addEventListener('click', this.clickOnCard.bind(this));
    return cardContainer;
  }

  clickOnCard(event) {
    // DONE: Можно лучше -- return в конце каждого if позволит не городить огород из else if
    const element = event.target;
    if (element.closest('.place-card__like-icon')) {
      this.like(element);
      return;
    }
    if (element.closest('.place-card__delete-icon')) {
      this.remove(element);
      return;
    }
    if (element.closest('.place-card__image')) {
      this.show(element);
      // DONE: А вот тут последний return не нужен
      // Можно лучше
      // return;
    }
  }
}