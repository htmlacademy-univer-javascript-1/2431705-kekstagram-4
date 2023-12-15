import {thumbnailsRender} from './thumbnails.js';
import {renderUploadForm} from './form.js';
import {renderBigPicture} from './fullsize-images-render.js';
import { createLoader, ErrorText } from './api.js';


createLoader((data) => {thumbnailsRender(data);
  renderBigPicture(data);
} , console.log(ErrorText.GET_DATA));
renderUploadForm();

