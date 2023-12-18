import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage =  document.querySelector('#error').content.querySelector('.error');

const onButtonClick = () => hideMessage();

const onExternalClick = (evt) => {
  if (!evt.target.closest('.success__inner') || !evt.target.closest('.error__inner')) {
    hideMessage();
  }
};

const onEscapeKeydown = (evt) => {
  if(isEscapeKey(evt)){
    hideMessage();
  }
};

function hideMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const button =  message.querySelector('button');
  button.removeEventListener('click', onButtonClick);
  document.removeEventListener('click', onExternalClick);
  document.removeEventListener('keydown', onEscapeKeydown);
  message.remove();
}

const showMessage = (message) => {
  const button = message.querySelector('button');
  document.body.append(message);
  button.addEventListener('click', onButtonClick);
  document.addEventListener('click', onExternalClick);
  document.addEventListener('keydown', onEscapeKeydown);
};

export const showSuccessMessage = () => showMessage(successMessage);
export const showErrorMessage = () => showMessage(errorMessage);
