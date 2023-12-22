import { isEscapeKey } from './util.js';

const LIMIT = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');
const uploadMoreButton = bigPicture.querySelector('.comments-loader');
const nowComments = bigPicture.querySelector('.openedComments-count');
const commentsBlock = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
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
  const id = commentsBlock.dataset.photoId;
  const comments = photos.filter((photo) => photo.id === Number(id))[0].comments;
  const start = commentsCounter - LIMIT;
  nowComments.textContent = commentsCounter;
  if(commentsCounter >= comments.length){
    nowComments.textContent = comments.length;
    uploadMoreButton.classList.add('hidden');
  }
  commentsBlock.insertAdjacentHTML(
    'beforeend',
    comments.slice(start, commentsCounter).map((comment) => createComment(comment.avatar, comment.name, comment.message)).join('')
  );
};

const onUploadMoreButtonClick = () =>{
  commentsCounter += LIMIT;
  nowComments.textContent = commentsCounter;
  uploadComments();
};

const createCommentsBlock = () =>{
  commentsBlock.innerHTML = '';
  nowComments.textContent = LIMIT;
  commentsCounter = LIMIT;
  uploadComments();
  uploadMoreButton.addEventListener('click', onUploadMoreButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    hideModal();
  }
};
const onCloseButtonClick = () => {
  hideModal();
};


const destroyCommentsBlock = () => {
  uploadMoreButton.removeEventListener('click', onUploadMoreButtonClick);
  uploadMoreButton.classList.remove('hidden');
};

function hideModal () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  destroyCommentsBlock();
}

const constructBigPicture = (picture, photoInfo, image) =>{
  bigImage.src = image.src;
  const likes = picture.querySelector('.picture__likes');
  const maxCommentsCount = picture.querySelector('.picture__comments');
  description.textContent = photoInfo.description;
  likesCount.textContent = likes.textContent;
  commentsCount.textContent = maxCommentsCount.textContent;
  commentsBlock.dataset.photoId = photoInfo.id;
  createCommentsBlock();
};

const showBigPicture = (picture, photoInfo, image) => {
  constructBigPicture(picture, photoInfo, image);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
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

