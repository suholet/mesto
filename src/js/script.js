import "../pages/index.css";
import Api from "./Api.js";
import Card from "./Card.js";
import CardList from "./CardList.js";
import NewCardPopup from "./NewCardPopup.js";
import ProfilePopup from "./ProfilePopup.js";
import AvatarPopup from "./AvatarPopup.js";
import ViewerPopup from "./ViewerPopup.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

// IIFE
(function() {
  // Начнем с того, что загрузим всю информацию с сервера и обновим страницу
  const api = new Api('https://praktikum.tk/cohort9','5736f2a6-7389-4509-8975-0ea97da236e0');
  
  // Загружаем информацию о пользователе с сервера для блока профиля
  const usernameElement = document.querySelector('.user-info__name');
  const aboutElement = document.querySelector('.user-info__job');
  const avatarElement = document.querySelector('.user-info__photo');
  const userInfo = new UserInfo({api, usernameElement, aboutElement, avatarElement});
  userInfo.setUserInfo();

  // Обрботчик для аватара
  const avatarPopupElement = document.querySelector('.popup__avatar');
  const avatarPopup = new AvatarPopup({avatarPopupElement, userInfo, api});
  document.querySelector('.user-info__photo').addEventListener('click', function () {
    avatarPopup.open();
  });

  // Callback для создания каточки
  const createCard = (name, link, id, isMine, likes, parentContainer, viewer, api, userInfo) => 
  new Card({name, link, id, isMine, likes, parentContainer, viewer, api, userInfo});

   // Загружаем первоначальные карточки с сервера
   const viewerPopupElement = document.querySelector('.popup__viewer');
   const viewerPopup = new ViewerPopup(viewerPopupElement);
   
   const listContainer = document.querySelector('.places-list');
   // api.getInitialCards(listContainer, viewerPopup);
   const cardList = new CardList({listContainer, createCard, api, userInfo, viewerPopup});
   api.getInitialCards()
   .then((data) => {
     cardList.render(data);
    })
    .catch((err) => {
      console.log(err);
    });
  //  cardList.render();

  // Обрботчик для кнопки добавления карточки
  const addCardPopupElement = document.querySelector('.popup__new');
  const newCardPopup = new NewCardPopup({addCardPopupElement, cardList});
  document.querySelector('.user-info__button').addEventListener('click', function () {
    newCardPopup.open();
  });

  // Обрботчик для кнопки редактирования профиля
  const editProfilePopupElement = document.querySelector('.popup__edit');
  const editProfilePopup = new ProfilePopup({editProfilePopupElement, api, userInfo});
  document.querySelector('.user-info__edit-button').addEventListener('click', function () {
    editProfilePopup.open();
  });

  // Навешиваем обработчики валидации полей в формах
  const err = {
    required: `Это обязательное поле`,
    length: `Должно быть от 2 до 30 символов`,
    url: `Здесь должна быть ссылка`
  };
  const newCardFormValidator = new FormValidator(document.forms.new, err);
  const editProfileValidator = new FormValidator(document.forms.profile, err);
  const avatarValidator = new FormValidator(document.forms.avatar, err);

})();
