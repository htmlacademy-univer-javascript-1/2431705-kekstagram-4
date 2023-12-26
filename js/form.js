import { sendData } from './api.js';
import {isEscapeKey, isRightString} from './util.js';
import { showSuccessMessage, showErrorMessage } from './mesages.js';
import{renderScaleButtons, destroyScaleButtons} from './image-scale.js';
import{createEffectSlider, onEffectsFilterChange as onEffectsFilterElementChange, resetFilters} from './image-effects.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_RULE = /^#[А-яа-яA-za-zёЁ]{1,19}$/;
const ErrorMessage = {
  BAD_HASHTAG: 'Уникальные хештеги, каждый не более 20 символов, должны быть разделены пробелом',
  BAD_COMMENT: 'Комментарий не более 140 символов'
};

const uploadButtonElement = document.querySelector('#upload-file');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const mainImageElement = overlayElement.querySelector('.img-upload__preview img');
const effectsPreviews = overlayElement.querySelectorAll('.effects__item .effects__preview');
const cancelButtonElement = document.querySelector('#upload-cancel');
const hashtagElement = document.querySelector('.text__hashtags');
const commentElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');
const effectsFilterElement = document.querySelector('.img-upload__effects');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const isCorrectComment = (comment) => isRightString(comment, MAX_COMMENT_LENGTH);

const isCorrectHashtags = () =>{
  let isСorrectTag = true;
  const hashtagsArray = hashtagElement.value.split(' ').map((hashtag) => {
    hashtag = hashtag.toLowerCase();
    if(!HASHTAG_RULE.test(hashtag) || String(hashtag).length > MAX_HASHTAG_LENGTH){
      isСorrectTag = false;
    }
    return hashtag;
  });
  const uniqueTags = new Set(hashtagsArray);

  return (isСorrectTag && uniqueTags.size === hashtagsArray.length && hashtagsArray.length <= MAX_HASHTAG_COUNT) || hashtagElement.value === '';
};

const onFocusPreventClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onCommentElementKeydown = (evt) => onFocusPreventClose(evt);
const onHashtagElementKeydown = (evt) => onFocusPreventClose(evt);

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)){
    formElement.reset();
    closeOverlay();
  }
};

const onCancelButtonElementClick = () => {
  formElement.reset();
  closeOverlay();
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const validateForm = () => {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error'
  });
  pristine.addValidator(hashtagElement, isCorrectHashtags,
    ErrorMessage.BAD_HASHTAG);
  pristine.addValidator(commentElement, isCorrectComment, ErrorMessage.BAD_COMMENT);

  return pristine.validate();
};


const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() =>{
        showSuccessMessage();
        closeOverlay();
      })
      .catch(showErrorMessage)
      .finally(() => {
        unblockSubmitButton();
      }
      );
  }
};

function closeOverlay () {
  document.body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  formElement.removeEventListener('submit', onFormElementSubmit);
  commentElement.removeEventListener('keydown', onCommentElementKeydown);
  hashtagElement.removeEventListener('keydown', onHashtagElementKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
  destroyScaleButtons();
  resetFilters();
  formElement.reset();
}

const uploadFile = () => {
  const file = uploadButtonElement.files[0];
  mainImageElement.src = mainImageElement.src = URL.createObjectURL(file);
  effectsPreviews.forEach((picture) => {
    picture.style.backgroundImage = `url('${mainImageElement.src}')`;
  });
};

const onUploadButtonElementChange = () => {
  uploadFile();
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formElement.addEventListener('submit', onFormElementSubmit);
  renderScaleButtons();
  effectsFilterElement.addEventListener('change', onEffectsFilterElementChange);
  cancelButtonElement.addEventListener('click', onCancelButtonElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentElement.addEventListener('keydown', onCommentElementKeydown);
  hashtagElement.addEventListener('keydown', onHashtagElementKeydown);
};

export const renderUploadForm = () => {
  uploadButtonElement.addEventListener('change', onUploadButtonElementChange);
  createEffectSlider();
};
