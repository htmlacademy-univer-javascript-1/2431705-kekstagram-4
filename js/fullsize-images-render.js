import { isEscapeKey } from './util.js';

const LIMIT = 5;
const bigPictureElement = document.querySelector('.big-picture');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const bigImageElement = bigPictureElement.querySelector('.big-picture__img img');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const uploadMoreButtonElement = bigPictureElement.querySelector('.comments-loader');
const nowCommentsElement = bigPictureElement.querySelector('.openedComments-count');
const commentsBlockElement = bigPictureElement.querySelector('.social__comments');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
let commentsCounter;
let photos;

const createComment = (avatar, name, text) => `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${text}</p>
  </li>`;


const uploadComments = () => {
  const id = commentsBlockElement.dataset.photoId;
  const comments = photos.filter((photo) => photo.id === Number(id))[0].comments;
  const start = commentsCounter - LIMIT;
  nowCommentsElement.textContent = commentsCounter;
  if(commentsCounter >= comments.length){
    nowCommentsElement.textContent = comments.length;
    uploadMoreButtonElement.classList.add('hidden');
  }
  commentsBlockElement.insertAdjacentHTML(
    'beforeend',
    comments.slice(start, commentsCounter).map((comment) => createComment(comment.avatar, comment.name, comment.message)).join('')
  );
};

const onUploadMoreButtonElementClick = () =>{
  commentsCounter += LIMIT;
  nowCommentsElement.textContent = commentsCounter;
  uploadComments();
};

const createCommentsBlock = () =>{
  commentsBlockElement.innerHTML = '';
  nowCommentsElement.textContent = LIMIT;
  commentsCounter = LIMIT;
  uploadComments();
  uploadMoreButtonElement.addEventListener('click', onUploadMoreButtonElementClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    hideModal();
  }
};
const onCloseButtonElementClick = () => {
  hideModal();
};


const destroyCommentsBlock = () => {
  uploadMoreButtonElement.removeEventListener('click', onUploadMoreButtonElementClick);
  uploadMoreButtonElement.classList.remove('hidden');
};

function hideModal () {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  closeButtonElement.removeEventListener('click', onCloseButtonElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  destroyCommentsBlock();
}

const constructBigPicture = (picture, photoInfo, image) =>{
  bigImageElement.src = image.src;
  const likesElement = picture.querySelector('.picture__likes');
  const maxCommentsCount = picture.querySelector('.picture__comments');
  descriptionElement.textContent = photoInfo.description;
  likesCountElement.textContent = likesElement.textContent;
  commentsCountElement.textContent = maxCommentsCount.textContent;
  commentsBlockElement.dataset.photoId = photoInfo.id;
  createCommentsBlock();
};

const showBigPicture = (picture, photoInfo, image) => {
  constructBigPicture(picture, photoInfo, image);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', onCloseButtonElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
};


export const renderBigPicture = (photoInfos) => {
  const pictures = document.querySelectorAll('.picture');
  photos = photoInfos.slice();
  pictures.forEach((picture) => {
    const image = picture.querySelector('.picture__img');
    const photoInfo = photos.filter((photo) => `/${photo.url}` === new URL(image.src).pathname)[0];
    picture.addEventListener('click',  () => showBigPicture(picture, photoInfo, image));
  });
};
