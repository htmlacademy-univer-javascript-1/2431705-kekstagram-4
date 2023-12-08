import {isEscapeKey, isRightString} from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const validImageTypes = ['gif', 'jpeg', 'png'];

const uploadButton = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtags = document.querySelector('.text__hashtags');
const comments = document.querySelector('.text__description');
const rightHashtag = /^#[А-яа-яA-za-zёЁ]{1,19}$/;


const isCorrectComment = (comment) => isRightString(comment, MAX_COMMENT_LENGTH);

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

  return (isСorrectTag && uniqueTags.size === hashtagsArray.length && hashtagsArray.length <= MAX_HASHTAG_COUNT) || hashtags.value === '';
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

const onCancelButtonClick = () => {
  closeOverlay();
};

const isPicture = () => {
  const path = uploadButton.value.toLowerCase();

  return validImageTypes.some((type) => path.endsWith(type));
};

function closeOverlay () {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  comments.removeEventListener('keydown', onFocusPreventClose);
  hashtags.removeEventListener('keydown', onFocusPreventClose);
  document.removeEventListener('keydown', onEscapeKeydown);
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

const onUploadButtonChange = () => {
  if(!isPicture()) {return;}
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscapeKeydown);
  comments.addEventListener('keydown', onFocusPreventClose);
  hashtags.addEventListener('keydown', onFocusPreventClose);
};

export const renderUploadForm = () => {
  uploadButton.addEventListener('change', onUploadButtonChange);
  form.addEventListener('submit', (evt) => {
    if(!validateForm()){
      evt.preventDefault();
    }
  });
};


