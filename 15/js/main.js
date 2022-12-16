import './util.js';
import {createImages} from './data.js';
import {createThumbnails} from './renderCards.js';
import {setUserFormSubmit, closeUploadFileForm} from './form.js';
import {getDataFrom} from './api.js';
import './big-pictures.js';
import {getSuccess, getError} from './alerts.js';

createThumbnails(createImages()); // для того чтобы показать НОРМАЛЬНУЮ работу кнопки показа 5 комментариев

createThumbnails(getDataFrom());
setUserFormSubmit(() => {
  closeUploadFileForm();
  getSuccess();
}, () => {
  closeUploadFileForm(null, false);
  getError();
});
