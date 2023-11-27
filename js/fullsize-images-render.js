const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');
const uploadMoreButton = bigPicture.querySelector('.comments-loader');
const nowComments = bigPicture.querySelector('.openedComments-count');
const commentsBlock = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const LIMIT = 5;
let comments;
let commentsCounter;

const createComment = (avatar, name, text) => `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${text}</p>
  </li>`;


const uploadComments = () => {
  const start = commentsCounter - LIMIT;
  if(commentsCounter >= comments.length){
    commentsCounter = comments.length;
    uploadMoreButton.hidden = true;
  }

  nowComments.textContent = commentsCounter;
  commentsBlock.insertAdjacentHTML(
    'beforeend',
    comments.slice(start, commentsCounter).map((comment) => createComment(comment.avatar, comment.name, comment.message)).join('')
  );
};

const onUploadMoreButtonClick = () =>{
  commentsCounter += LIMIT;
  uploadComments();
};

const createCommentsBlock = () =>{
  commentsBlock.innerHTML = '';
  commentsCounter = LIMIT;
  uploadComments();
  uploadMoreButton.addEventListener('click', onUploadMoreButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hideModal();
  }
};
const onCloseButtonClick = () => {
  hideModal();
};


const destroyCommentsBlock = () => {
  uploadMoreButton.removeEventListener('click', onUploadMoreButtonClick);
  uploadMoreButton.hidden = false;
  commentsCounter = 0;
  comments = [];
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
  comments = photoInfo.comments.slice();
  createCommentsBlock();
};

const showBigPicture = (picture, photoInfo, image) => {
  constructBigPicture(picture, photoInfo, image);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const renderBigPicture = (photos) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    const image = picture.querySelector('.picture__img');
    const photoInfo = photos.filter((photo) => `/${photo.url}` === new URL(image.src).pathname)[0];
    picture.addEventListener('click',  () => showBigPicture(picture, photoInfo, image));
  });
};

