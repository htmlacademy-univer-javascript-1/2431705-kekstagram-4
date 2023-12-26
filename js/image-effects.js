const Effect = {
  NONE: { name: 'none', filter: '', unit: '',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  CHROME: {name: 'chrome', filter: 'grayscale', unit: '%',
    options: { range: {min: 0, max: 100}, step: 1, start: 100},
  },
  SEPIA: { name: 'sepia', filter: 'sepia', unit: '%',
    options: { range: {min: 0, max: 100}, step: 1, start: 100},
  },
  MARVIN: { name: 'marvin', filter: 'invert', unit: '%',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  PHOBOS: {name: 'phobos', filter: 'blur', unit: 'px',
    options: {range: {min: 1, max: 10}, step: 0.1, start: 10},
  },
  HEAT: {name: 'heat', filter: 'brightness', unit: '',
    options: {range: {min: 1, max: 4}, step: 0.1, start: 4},
  }
};

const DEFAULT_FILTER = 'NONE';
const imageElement = document.querySelector('.img-upload__preview').querySelector('img');
const sliderValueElement = document.querySelector('.effect-level__value');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');


export const createEffectSlider = () =>{
  sliderWrapperElement.classList.add('hidden');
  noUiSlider.create(sliderElement,  Effect[DEFAULT_FILTER].options);
};

export const resetFilters = () => {
  imageElement.style.filter = Effect[DEFAULT_FILTER].name;
  sliderWrapperElement.classList.add('hidden');
};

const updateImagePreview = (effect) => {
  imageElement.removeAttribute('class');
  imageElement.classList.add(`effects__preview--${effect}`);

  sliderElement.noUiSlider.updateOptions(Effect[effect].options);
  sliderElement.noUiSlider.on('update', () => {
    sliderValueElement.value = sliderElement.noUiSlider.get();
    imageElement.style.filter = `${Effect[effect].filter}(${sliderValueElement.value}${Effect[effect].unit})`;
  });
};

const updateSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions(Effect[effect].options);
};

const showFilterPreview = (effect) => {
  sliderWrapperElement.classList.remove('hidden');
  updateImagePreview(effect);
  updateSliderOptions(effect);
};

export const onEffectsFilterChange = (evt) => {
  const effect = evt.target.value.toUpperCase();

  if (effect === Effect[DEFAULT_FILTER].name.toUpperCase()) {
    resetFilters();
  } else {
    showFilterPreview(effect);
  }
};
