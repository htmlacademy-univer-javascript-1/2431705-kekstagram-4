import {getPhotoDescriptions} from './data.js';
import {thumbnailsRender} from './thumbnails-renderer.js';

const PHOTOS_COUNT = 26;
const photos = getPhotoDescriptions(PHOTOS_COUNT);
thumbnailsRender(photos);
