const STEP = 25;
const DEFAULT_SCALE = 'scale(1)';
const MAX_PERCENT = 100;
const ScaleInterval = {
  MIN: 25,
  MAX: 100,
};

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview').querySelector('img');

const isValueInScaleInterval = (value) =>
  value >= ScaleInterval.MIN && value <= ScaleInterval.MAX;

const updateScale = (value) => {
  const val = +scaleValueElement.value.replace('%', '') + STEP * +value;
  if(isValueInScaleInterval(val)){
    imageElement.style.transform = `scale(${val / MAX_PERCENT})`;
    scaleValueElement.value = `${val}%`;
  }
};

const onScaleBiggerElementClick = (evt) => updateScale(evt.target.dataset.value);

const onScaleSmallerElementClick = (evt) => updateScale(evt.target.dataset.value);


export const renderScaleButtons = () => {
  scaleBiggerElement.addEventListener('click', onScaleBiggerElementClick);
  scaleSmallerElement.addEventListener('click', onScaleSmallerElementClick);
};

export const destroyScaleButtons = () => {
  imageElement.style.transform = DEFAULT_SCALE;
  scaleBiggerElement.removeEventListener('click', onScaleBiggerElementClick);
  scaleSmallerElement.removeEventListener('click', onScaleSmallerElementClick);
};
