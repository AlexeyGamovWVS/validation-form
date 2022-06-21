const FORM_START = 0;
const FORM_STEP = 1;

const isEmpty = (formElement, inputElement) => {
  !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement) :
    freezePlaceholder(formElement, inputElement);
};

const freezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
  placeholderElement.classList.add('form__placeholder_is-fixed');
};

const unfreezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
  placeholderElement.classList.remove('form__placeholder_is-fixed');
};

const setCustomPlaceholders = (formElement) => {
  const getInputList = Array.from(formElement.querySelectorAll(`.form__input`));
  getInputList
    .forEach((inputElement) => inputElement
      .addEventListener('input', () => isEmpty(formElement, inputElement)))
};

const getFieldset =  Array.from(document.querySelectorAll(`.form__set`));

const renderSet = ({formElement, ...config}) => {
  // РўСѓС‚ РјС‹ РїРѕРЅСЏР»Рё, С‡С‚Рѕ С‡С‚Рѕ-С‚Рѕ РёРґРµС‚ РЅРµ С‚Р°Рє
  config.step !== false ? getFieldset[config.stepBack === true ? config.step + FORM_STEP : config.step - FORM_STEP]
    .classList.remove(`${config.setClass}_active`) : null;
  getFieldset[config.step === false ? FORM_START : config.step].classList.add(`${config.setClass}_active`);
};

const handleChangeSet = ({formElement, ...config}) => {
  const getButtonList = Array.from(formElement.querySelectorAll(`.${config.buttonClass}`));
  const getPreviousButtonList = Array.from(formElement.querySelectorAll(`.${config.previousButtonClass}`));
  getButtonList.forEach((button) => {
      button.addEventListener(`click`, () => {
        renderSet({
          formElement,
          setClass: config.setClass,
          step: getButtonList.findIndex(currentElement => currentElement === button) + FORM_STEP,
          stepBack: false,
        })
      })
    });
  getPreviousButtonList.forEach((button) => {
    button.addEventListener(`click`, () => {
      renderSet({
        formElement,
        setClass: config.setClass,
        step: getPreviousButtonList.findIndex(currentElement => currentElement === button),
        stepBack: true
      })
    })
  })
};

const activateForm = () => {
  const getFormList = Array.from(document.querySelectorAll(`.form`));
  getFormList.forEach((formElement) => {
    setCustomPlaceholders(formElement);
    renderSet({
      formElement,
      setClass: 'form__set',
      step: false,
      stepBack: false
    });
    handleChangeSet({
      formElement,
      setClass: 'form__set',
      buttonClass: 'form__button',
      previousButtonClass: 'form__previous'
    });
  });
};

activateForm();
