const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview').querySelector('img');
const STEP = 25;
const DEFEALT_SCALE = 'scale(1)';
const SCALE_INTERVAL = {
  MIN: 25,
  MAX: 100,
};

const isValueInScaleInterval = (value) =>
  value >= SCALE_INTERVAL.MIN && value <= SCALE_INTERVAL.MAX;

const onScaleButtonClick = (evt) => {
  const val = +scaleValue.value.replace('%', '') + STEP * +evt.target.dataset.value;
  if(isValueInScaleInterval(val)){
    image.style.transform = `scale(${val / 100})`;
    scaleValue.value = `${val}%`;
  }
};

export const renderScaleButtons = () => {
  scaleBigger.addEventListener('click', onScaleButtonClick);
  scaleSmaller.addEventListener('click', onScaleButtonClick);
};

export const destroyScaleButtons = () => {
  image.style.transform = DEFEALT_SCALE;
  scaleBigger.removeEventListener('click', onScaleButtonClick);
  scaleSmaller.removeEventListener('click', onScaleButtonClick);
};

