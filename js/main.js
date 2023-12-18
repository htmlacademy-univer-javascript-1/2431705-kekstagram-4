import {getPhotoDescriptions} from './data.js';
import {renderUploadForm} from './form.js';
import {renderBigPicture} from './fullsize-images-render.js';
import {initFilters} from './filters.js';

const PHOTOS_COUNT = 25;

const photos = getPhotoDescriptions(PHOTOS_COUNT);
initFilters(photos);
renderUploadForm();
renderBigPicture(photos);

