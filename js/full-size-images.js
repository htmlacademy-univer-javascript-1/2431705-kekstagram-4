const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');

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


const constructBigPicture = (picture, photos) =>{
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');
  const image = picture.querySelector('.picture__img');
  const photoInfo = photos.find((photo) => `/${photo.url}` === new URL(image.src).pathname);
  description.textContent = photoInfo.description;
  likesCount.textContent = likes.textContent;
  bigImage.src = image.src;
  commentsCount.textContent = comments.textContent;
  createCommentsBlock(photoInfo.comments, bigPicture);
};


export const showBigPicture = (photos) => {
  const pictures = document.querySelectorAll('.picture');
  for (const picture of pictures){
    picture.onclick = () =>{
      constructBigPicture(picture, photos);
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.social__comment-count').hidden = true;
      bigPicture.querySelector('.comments-loader').hidden = true;
      document.body.classList.add('modal-open');
    };
  }
};

