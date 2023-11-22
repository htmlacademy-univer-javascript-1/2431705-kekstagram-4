const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createComment = (avatar, name, text) => `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${text}</p>
  </li>`;


const createCommentsBlock = (comments) =>{
  const commentsBlock = bigPicture.querySelector('.social__comments');
  commentsBlock.innerHTML = '';
  commentsBlock.insertAdjacentHTML('afterbegin', comments.map((comment) => createComment(comment.avatar, comment.name, comment.message)).join(''));           // Array(comments).map
};

function hideModal () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

const onDocumentKeydown = document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    hideModal();
  }
});

const onCloseButtonClick = closeButton.addEventListener('click', () => {
  hideModal();
});

const closeBigPicture = () =>{
  // eslint-disable-next-line no-unused-expressions
  onCloseButtonClick;
  // eslint-disable-next-line no-unused-expressions
  onDocumentKeydown;
};

const constructBigPicture = (picture, photoInfo, image) =>{
  bigImage.src = image.src;
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');
  description.textContent = photoInfo.description;
  likesCount.textContent = likes.textContent;
  commentsCount.textContent = comments.textContent;
  createCommentsBlock(photoInfo.comments, bigPicture);
};

const onPictureClick = (picture, photoInfo, image) => picture.addEventListener('click',  () => {
  constructBigPicture(picture, photoInfo, image);
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').hidden = true;
  bigPicture.querySelector('.comments-loader').hidden = true;
  document.body.classList.add('modal-open');
  closeBigPicture();
});

export const renderBigPicture = (photos) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    const image = picture.querySelector('.picture__img');
    const photoInfo = photos.filter((photo) => `/${photo.url}` === new URL(image.src).pathname)[0];
    onPictureClick(picture, photoInfo, image);
  });
};

