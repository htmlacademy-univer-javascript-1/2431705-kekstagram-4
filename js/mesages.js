import { isEscapeKey } from './util.js';

const SUCCESS_BUTTON_CLASS = '.success__button';
const ERROR_BUTTON_CLASS = '.error__button';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage =  document.querySelector('#error').content.querySelector('.error');


const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const button =  message.querySelector('button');
  button.removeEventListener('click', hideMessage);
  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', hideMessage);
  message.remove();
};

function onOutsideClick (evt) {
  if (!evt.target.closest('.success__inner') || !evt.target.closest('.error__inner')) {
    hideMessage();
  }
}

const onEscapeKeydown = (evt) => {
  if(isEscapeKey(evt)){
    hideMessage();
  }
};

const showMessage = (message, buttonClass) => {
  const button = message.querySelector(buttonClass);
  document.body.append(message);
  button.addEventListener('click', hideMessage);
  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onEscapeKeydown);
};

export const showSuccessMessage = () => showMessage(successMessage, SUCCESS_BUTTON_CLASS);
export const showErrorMessage = () => showMessage(errorMessage, ERROR_BUTTON_CLASS);
