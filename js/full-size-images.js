const LIMIT = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');
const uploadMoreButton = bigPicture.querySelector('.comments-loader');
const nowComments = bigPicture.querySelector('.openedComments-count');
const commentsBlock = bigPicture.querySelector('.social__comments');


const createComment = (avatar, name, text) => `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${text}</p>
  </li>`;


const uploadComments = (limit, comments, end) => {
  const start = end - limit;
  if(end >= comments.length){
    end = comments.length;
    uploadMoreButton.hidden = true;
  }

  nowComments.textContent = end === comments.length - 1 ? end + 1 : end;
  commentsBlock.insertAdjacentHTML(
    'afterbegin',
    comments.slice(start, end).map((comment) => createComment(comment.avatar, comment.name, comment.message)).join('')
  );
};


const createCommentsBlock = (comments) =>{
  commentsBlock.innerHTML = '';
  let end = LIMIT;

  uploadComments(LIMIT, comments, end);

  uploadMoreButton.onclick = () =>{
    end += LIMIT;
    uploadComments(LIMIT, comments, end);
  };
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
      bigPicture.classList.remove('hidden');
      constructBigPicture(picture, photos);
      document.body.classList.add('modal-open');
    };
  }
};

