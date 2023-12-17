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
const DefaultSliderParam = {
  range: {min: 0, max: 100}, start: 100, step: 0.1
};

const DEFAULT_FILTER = 'NONE';
const image = document.querySelector('.img-upload__preview').querySelector('img');
const sliderValue = document.querySelector('.effect-level__value');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');


export const createEffectSlider = () =>{
  sliderWrapper.classList.add('hidden');
  noUiSlider.create(slider,  DefaultSliderParam);
};

export const resetFilters = () => {
  image.style.filter = Effect[DEFAULT_FILTER].name;
  sliderWrapper.classList.add('hidden');
};

const updateImagePreview = (effect) => {
  image.removeAttribute('class');
  image.classList.add(`effects__preview--${effect}`);

  slider.noUiSlider.updateOptions(Effect[effect].options);
  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    image.style.filter = `${Effect[effect].filter}(${sliderValue.value}${Effect[effect].unit})`;
  });
};

const updateSliderOptions = (effect) => {
  slider.noUiSlider.updateOptions(Effect[effect].options);
};

const showFilterPreview = (effect) => {
  sliderWrapper.classList.remove('hidden');
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
