import {isEscapePressed, checkFileType} from './util.js';
import {isHashtagCorrect, isHashtagsRepeated, isMaxHashtags, MAX_TAGS_COUNT} from './validators.js';
import {getSmartSlider} from './slider.js';
import {scaleImage} from './scale-image.js';
import {sendDataTo} from './api.js';
import {getError} from './alerts.js';

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
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const smartSliderFilters = getSmartSlider('none', effectLevelSlider, effectLevelValue);
const scaleUploadImage = scaleImage(scaleControlValue, imgPreview);

pristine.addValidator(textHashtags, isHashtagsRepeated, 'Хештеги регистронезависимы и не должны повторяться');
pristine.addValidator(textHashtags, isMaxHashtags, `Максимальное число хештегов - ${MAX_TAGS_COUNT}`);
pristine.addValidator(textHashtags, isHashtagCorrect, 'Один из введённых вами хештегов некорректен');

const applyChanges = (value) => {
  imgPreview.classList.remove(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  smartSliderFilters.setCurrentFilter(value);
  imgPreview.classList.add(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  effectLevelSlider.noUiSlider.updateOptions(smartSliderFilters.getOptions());
  imgPreview.style.filter = smartSliderFilters.getStyles();
};

const closeUploadFileForm = (e = null, clear = true) => {
  if (e === null || (isEscapePressed(e) && document.activeElement !== textHashtags && document.activeElement !== textDescription) || e.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
    uploadCancel.removeEventListener('click', closeUploadFileForm);

    if (clear) {
      imgUploadForm.reset();
      scaleUploadImage.init();
      applyChanges('none');
    }
  }
};

uploadFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const isCorrectFileType = checkFileType(file);

  if (isCorrectFileType) {
    imgPreview.src = URL.createObjectURL(file);
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', closeUploadFileForm);
    uploadCancel.addEventListener('click', closeUploadFileForm);
  } else {
    getError();
  }
});

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendDataTo(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        new FormData(imgUploadForm)
      );
    }
  });
};

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

export {setUserFormSubmit, closeUploadFileForm};
