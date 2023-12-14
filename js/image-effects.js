const Effect = {
  'none': { name: 'none', filter: '', unit: '',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'chrome': {name: 'chrome', filter: 'grayscale', unit: '%',
    options: { range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'sepia': { name: 'sepia', filter: 'sepia', unit: '%',
    options: { range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'marvin': { name: 'marvin', filter: 'invert', unit: '%',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'phobos': {name: 'phobos', filter: 'blur', unit: 'px',
    options: {range: {min: 1, max: 10}, step: 0.1, start: 10},
  },
  'heat': {name: 'heat', filter: 'brightness', unit: '',
    options: {range: {min: 1, max: 4}, step: 0.1, start: 4},
  }
};
const DefaultSliderParam = {
  range: {min: 0, max: 100},
  start: 100,
  step: 0.1
};

const image = document.querySelector('.img-upload__preview').querySelector('img');
const sliderValue = document.querySelector('.effect-level__value');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');


export const createEffectSlider = () =>{
  sliderWrapper.classList.add('hidden');
  noUiSlider.create(slider,  DefaultSliderParam);
};

export const resetFilters = () => {
  image.style.filter = Effect['none'].name;
  sliderWrapper.classList.add('hidden');
};

export const onEffectsFilterChange = (evt) =>{
  const effect = evt.target.value;
  if(effect === Effect['none'].name){
    resetFilters();
  }
  else{
    sliderWrapper.classList.remove('hidden');
    image.removeAttribute('class');
    image.classList.add(`effects__preview--${effect}`);
    slider.noUiSlider.updateOptions(Effect[effect].options);
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      image.style.filter = `${Effect[effect].filter}(${sliderValue.value}${Effect[effect].unit})`;
    });
  }
};
