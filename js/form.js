import {isEscapeKey} from './util.js';
import {isHashtagCorrect, isHashtagsRepeated, isMaxHashtags, MAX_TAGS_COUNT} from './validators.js';
import {getSmartSlider} from './slider.js';
import {scaleImage} from './scale-image.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const smartSliderFilters = getSmartSlider('none', effectLevelSlider, effectLevelValue);
const scaleUploadImage = scaleImage(scaleControlValue, imgPreview);

pristine.addValidator(textHashtags, isHashtagsRepeated, 'Хештеги регистронезависимы и не должны повторяться');
pristine.addValidator(textHashtags, isMaxHashtags, `Максимальное число хештегов - ${MAX_TAGS_COUNT}`);
pristine.addValidator(textHashtags, isHashtagCorrect, 'Один из введённых вами хештегов некорректен');

const closeUploadFileForm = (e) => {
  if ((isEscapeKey(e) && document.activeElement !== textHashtags && document.activeElement !== textDescription) || e.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
    uploadCancel.removeEventListener('click', closeUploadFileForm);
    imgUploadForm.reset();
  }
};

const applyChanges = (value) => {
  imgPreview.classList.remove(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  smartSliderFilters.setCurrentFilter(value);
  imgPreview.classList.add(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  effectLevelSlider.noUiSlider.updateOptions(smartSliderFilters.getOptions());
  imgPreview.style.filter = smartSliderFilters.getStyles();
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleUploadImage.init();
  applyChanges('none');
  document.addEventListener('keydown', closeUploadFileForm);
  uploadCancel.addEventListener('click', closeUploadFileForm);
});

imgUploadForm.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();
  }
});

scaleControlSmaller.addEventListener('click', scaleUploadImage.decreaseValue);
scaleControlBigger.addEventListener('click', scaleUploadImage.increaseValue);

noUiSlider.create(effectLevelSlider, smartSliderFilters.getOptions());

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = smartSliderFilters.getStyles();
});

effectsList.addEventListener('click', (e) => {
  const effectsItems = e.target.closest('.effects__item');
  if (effectsItems) {
    const value = effectsItems.querySelector('.effects__radio').value;
    applyChanges(value);
  }
});
