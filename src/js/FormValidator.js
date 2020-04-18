class FormValidator {
    constructor(form, err) {
      this._err = err;
      this._form = form;

      this.setEventListeners();
    }

    setEventListeners() {
      const elements = Array.from(this._form.elements);
      
      elements.forEach(function(element) {
        if(element.nodeName === 'INPUT') {
          element.addEventListener('input', this.handleValidate.bind(this));
        }
      }, this);
    }

    handleValidate(event) {
      this.resetError(event.target);
      this.checkInputValidity(event.target);
    }
  
    checkInputValidity(element) {
      // Выбираем поле для вывода сообщения об ошибки для нашего элемента
      const errorElement = document.querySelector(`#error-${element.id}`);
  
      if (element.validity.valueMissing) {
        errorElement.textContent = this._err.required;
        this.activateError(element);
        this.setSubmitButtonState(true);
        return false;
      }
      if (element.validity.tooShort || element.validity.tooLong) {
        errorElement.textContent = this._err.length;
        this.activateError(element);
        this.setSubmitButtonState(true);
        return false;
      }
      if (element.validity.patternMismatch) {
        errorElement.textContent = this._err.url;
        this.activateError(element);
        this.setSubmitButtonState(true);
        return false;
      }
      if(!this.allInputsValid()) {
        this.setSubmitButtonState(true);
        return false;
      }
      // Все поля валидные
      this.setSubmitButtonState(false);
      return true;
    }

    allInputsValid() {
      const elements = Array.from(this._form.elements);
      for (let i = 0; i < elements.length; i++) {
        if(elements[i].nodeName === 'INPUT' && !elements[i].validity.valid) {
          return false;
        }
      }
      return true;
    }
  
    setSubmitButtonState(disabled) {
      const button = this._form.querySelector('.popup__button');
      button.disabled = disabled;
    }
  
    activateError(element) {
      element.parentNode.classList.add('popup__input-container_invalid');
    }
  
    resetError(element) {
      element.parentNode.classList.remove('popup__input-container_invalid');
      element.textContent = '';
    }  
  }

export default FormValidator;