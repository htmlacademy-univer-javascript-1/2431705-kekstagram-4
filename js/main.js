import {getPhotoDescriptions} from './data.js';
import {thumbnailsRender} from './thumbnails.js';
import {renderBigPicture} from './fullsize-images-render.js';

const PHOTOS_COUNT = 25;

const photos = getPhotoDescriptions(PHOTOS_COUNT);
thumbnailsRender(photos);
renderBigPicture(photos);
