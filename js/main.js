import {thumbnailsRender} from './thumbnails.js';
import {renderUploadForm} from './form.js';
import {renderBigPicture} from './fullsize-images-render.js';
import { getData} from './api.js';
import { showAlert } from './util.js';


getData()
  .then((data) => {
    thumbnailsRender(data);
    renderBigPicture(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    });
renderUploadForm();

