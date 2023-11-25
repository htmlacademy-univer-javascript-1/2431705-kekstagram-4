import {isEscapeKey, isRightString} from './util.js';
import{renderScaleButtons, destroyScaleButtons} from './image-scale.js';


const uploadButton = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtags = document.querySelector('.text__hashtags');
const comments = document.querySelector('.text__description');
const rightHashtag = /^#[А-яа-яA-za-zёЁ]{1,19}$/;

const MAX_HASHTAG_LENGTH = 20;


const isCorrectComment = (comment) => isRightString(comment, 140);

const isCorrectHashtags = () =>{
  let isСorrectTag = true;
  const hashtagsArray = hashtags.value.split(' ').map((hashtag) => {
    hashtag = hashtag.toLowerCase();
    if(!rightHashtag.test(hashtag) || String(hashtag).length > MAX_HASHTAG_LENGTH){
      isСorrectTag = false;
    }
    return hashtag;
  });
  const uniqueTags = new Set(hashtagsArray);
  return isСorrectTag && uniqueTags.size === hashtagsArray.length && hashtagsArray.length <= 5;
};

const onFocusPreventClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onEscapeKeydown = (evt) => {
  if(isEscapeKey(evt)){
    closeOverlay();
  }
};

const onClickCancelButton = () => {
  closeOverlay();
};


function closeOverlay () {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);
  document.removeEventListener('keydown', onEscapeKeydown);
  destroyScaleButtons();
  form.reset();
}


const validateForm = () => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error'
  });
  pristine.addValidator(hashtags, isCorrectHashtags,
    'Уникальные хештеги, каждый не более 20 символов, должны быть разделены пробелом');
  pristine.addValidator(comments, isCorrectComment, 'Комментарий не более 140 символов');

  return pristine.validate();
};

const openOverlay = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onClickCancelButton);
  document.addEventListener('keydown', onEscapeKeydown);
  renderScaleButtons();
  comments.onkeydown = (evt) => onFocusPreventClose(evt);
  hashtags.onkeydown = (evt) => onFocusPreventClose(evt);
};

export const renderUploadForm = () => {
  uploadButton.addEventListener('change', openOverlay);
  form.addEventListener('submit', (evt) => {
    if(!validateForm()){
      evt.preventDefault();
    }
  });
};


