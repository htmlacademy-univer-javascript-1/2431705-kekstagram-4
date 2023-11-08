import {getPhotoDescriptions} from './data.js';

const NULL_INDEX = 0;
const templatePicture = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');

const getPicture = (photo) =>{
  const picture = templatePicture.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  return picture;
};

const photos = getPhotoDescriptions();
photos.forEach((photo, index) => {
  if(index > NULL_INDEX){
    pictures.appendChild(getPicture(photo));
  }
});
