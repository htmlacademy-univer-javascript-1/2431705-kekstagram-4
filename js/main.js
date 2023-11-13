import {getPhotoDescriptions} from './data.js';
import {thumbnailsRender} from './thumbnails.js';

const PHOTOS_COUNT = 25;

const photos = getPhotoDescriptions(PHOTOS_COUNT);
thumbnailsRender(photos);
