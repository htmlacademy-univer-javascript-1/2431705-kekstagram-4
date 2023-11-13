import {getPhotoDescriptions} from './data.js';
import {thumbnailsRender} from './thumbnails-renderer.js';


const photos = getPhotoDescriptions();
thumbnailsRender(photos);
