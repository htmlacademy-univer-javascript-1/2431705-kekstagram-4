import {renderUploadForm} from './form.js';
import { getData} from './api.js';
import { showAlert } from './util.js';
import {initFilters} from './filters.js';

getData()
  .then((data) => {
    initFilters(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    });
renderUploadForm();

