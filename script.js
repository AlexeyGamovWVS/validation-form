//функция показа спан-элемента с ошибкой и стилизации поля с ошибкой
//на вход получает: форму, конкретное поле ввода, текст сообщения ошибки из стандартной валидации
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

//функция скрытия спан-элемента и стилизация поля в дефолтное состояние
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

//функция проверки валидности поля — на вход получает форму и поле
// проводит проверку валидации, активирует функции скрытия / показа ошибки
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция проверки некоторого массива полей 
// на наличие хоть одного не валидного
// Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция
// hasInvalidInput вернёт true
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//функция переключения состояния кнопки в зависимости
// от валидности. На вход — список полей и кнопка, относящаяся к ним
// Если хоть 1 поле не валидно, класс кнопки неактивна
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};

// функция простановки отслеживания событий по кнопкам и инпутам
// на вход — некоторая форма
// создаёт массив полей вошедшей формы
// определяет кнопку вошедшей формы
// делает кнопку изначально неактивной
// для массива инпутов вешает на каждый инпут обработчик,
// который при каждом внесении символа проверяет валидность поля, 
// а также активирует/деактивирует кнопку
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция простановки отслеживания событий по формам, а также вызов
// валидатора полей для каждой формы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldset) => setEventListeners(fieldset));
  });
};

enableValidation();