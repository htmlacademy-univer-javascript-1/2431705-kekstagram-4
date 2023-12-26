import { isEscapeKey } from './util.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement =  document.querySelector('#error').content.querySelector('.error');

const onButtonElementClick = () => hideMessage();

const onDocumentClick = (evt) => {
  if (evt.target.closest('.error__inner, .success__inner')) {
    return;
  }
  hideMessage();
};

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)){
    hideMessage();
  }
};

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  const buttonElement =  messageElement.querySelector('button');
  buttonElement.removeEventListener('click', onButtonElementClick);
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  messageElement.remove();
}

const showMessage = (message) => {
  const buttonElement = message.querySelector('button');
  document.body.append(message);
  buttonElement.addEventListener('click', onButtonElementClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const showSuccessMessage = () => showMessage(successMessageElement);
export const showErrorMessage = () => showMessage(errorMessageElement);
