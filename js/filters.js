import {thumbnailsRender, destroyThumbnails} from './thumbnails.js';
import{shuffle, sortByCommentCountDescending, debounce} from './util.js';
import { renderBigPicture } from './fullsize-images-render.js';

const HIDDEN_CLASS = 'img-filters--inactive';
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const MAX_COUNT_RANDOM_PHOTO = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let activeFilter = Filter.DEFAULT;
let photos = [];

const filterFunction = {
  [Filter.DEFAULT]: () => photos,
  [Filter.RANDOM]: () => shuffle(photos.slice()).slice(0, MAX_COUNT_RANDOM_PHOTO),
  [Filter.DISCUSSED]: () => photos.slice().sort(sortByCommentCountDescending)
};

const onFiltersFormClick = (evt) =>{
  const id = evt.target.id;
  if(id && id !== activeFilter)
  {
    filtersForm.querySelector(`#${activeFilter}`).classList.remove(ACTIVE_FILTER_CLASS);
    evt.target.classList.add(ACTIVE_FILTER_CLASS);
    activeFilter = id;
    const pictures = filterFunction[id]();
    destroyThumbnails();
    thumbnailsRender(pictures);
    renderBigPicture(pictures);
  }
};

export const initFilters = (data) =>{
  photos = data.slice();
  filtersContainer.classList.remove(HIDDEN_CLASS);
  filtersForm.addEventListener('click', debounce(onFiltersFormClick));
  thumbnailsRender(photos);
  renderBigPicture(photos);
};
