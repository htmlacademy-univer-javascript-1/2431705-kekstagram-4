let photos = null;
const templatePictureElement = document.querySelector('#picture').content;
const picturesElement = document.querySelector('.pictures');


const getPicture = (photo) =>{
  const picture = templatePictureElement.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  return picture;
};

export const destroyThumbnails = () =>{
  const miniatures = picturesElement.querySelectorAll('.picture');
  miniatures.forEach((picture) => picture.remove());
};

export const thumbnailsRender = (data) =>{
  photos = data.slice();
  if(photos){
    photos.forEach((photo) => {
      picturesElement.appendChild(getPicture(photo));
    });
  }
};
