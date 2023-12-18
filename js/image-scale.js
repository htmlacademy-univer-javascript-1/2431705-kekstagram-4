const STEP = 25;
const DEFEALT_SCALE = 'scale(1)';
const MAX_PERCENT = 100;
const ScaleInterval = {
  MIN: 25,
  MAX: 100,
};

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview').querySelector('img');

const isValueInScaleInterval = (value) =>
  value >= ScaleInterval.MIN && value <= ScaleInterval.MAX;

const updateScale = (evt) => {
  const val = +scaleValue.value.replace('%', '') + STEP * +evt.target.dataset.value;
  if(isValueInScaleInterval(val)){
    image.style.transform = `scale(${val / MAX_PERCENT})`;
    scaleValue.value = `${val}%`;
  }
};

const onScaleBiggerClick = (evt) => updateScale(evt.target.dataset.value);

const onScaleSmallerClick =(evt) => updateScale(evt.target.dataset.value);


export const renderScaleButtons = () => {
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
};

export const destroyScaleButtons = () => {
  image.style.transform = DEFEALT_SCALE;
  scaleBigger.removeEventListener('click', onScaleBiggerClick);
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
};

