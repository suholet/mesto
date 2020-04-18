class Popup {
    constructor(element) {
      this._element = element;

      // У всех окон есть крестик
      this.setEventListeners();
    }
  
    setEventListeners() {
      this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    }
  
    open() {
      // Показываем попап
      this._element.classList.add('popup_is-opened');
    }
  
    close() {
      this.resetForm(this._form);
      this._element.classList.remove('popup_is-opened');
    }
  
    resetForm(form) {
      form.reset();
      
      // Теперь очищаем поля ошибок
      const elements = Array.from(form.elements);
      elements.forEach(function(element) {
        if(element.nodeName === 'INPUT') {
          element.parentNode.classList.remove('popup__input-container_invalid');
        }
      });
    }
}

export default Popup;