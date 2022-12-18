import {createThumbnails} from './render-cards.js';
import { getDataFrom } from './api.js';
import { getRandomPositiveInteger, showAlert, debounce } from './util.js';
import { setUserFormSubmit, closeUploadFileForm } from './form.js';

const TIMEOUT_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;
let selectedFilter = 'filter-default';


const filterButtons = document.body.querySelectorAll('.img-filters__button');

const sortingCommentsCount = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filteringPhotos = (photos) => {
  let photosForRendering = [];
  let temporaryStorage = [];
  switch (selectedFilter) {
    case 'filter-discussed':
      photosForRendering = photos.slice().sort(sortingCommentsCount);
      break;
    case 'filter-random':
      temporaryStorage = photos.slice();
      for (let i = 0; i < RANDOM_PHOTOS_COUNT && temporaryStorage.length > 0; i++) {
        const randomPhotoIndex = getRandomPositiveInteger(0, temporaryStorage.length - 1);
        photosForRendering.push(temporaryStorage[randomPhotoIndex]);
        temporaryStorage.splice(randomPhotoIndex, 1);
      }
      break;
    default:
      photosForRendering = photos;
      break;
  }
  return photosForRendering;
};

const renderPhotos = (photos) => {
  const filteredPhotos = filteringPhotos(photos);
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
  createThumbnails(filteredPhotos);
};

const filterButtonsAddEvt = (cb) => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      selectedFilter = evt.target.id;
      filterButtons.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
      evt.target.classList.add('img-filters__button--active');
      cb();
    });
  });
};

getDataFrom(
  (photos) => {
    renderPhotos(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    filterButtonsAddEvt(debounce(
      () => renderPhotos(photos),
      TIMEOUT_DELAY
    ));
  },
  (message) => {
    showAlert(message);
  },
);

setUserFormSubmit(closeUploadFileForm);

