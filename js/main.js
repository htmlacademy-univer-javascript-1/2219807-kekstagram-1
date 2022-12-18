import {setUserFormSubmit, closeUploadFileForm} from './form.js';
import {getSuccess, getError} from './alerts.js';
import './render-user-photos.js';

setUserFormSubmit(() => {
  closeUploadFileForm();
  getSuccess();
}, () => {
  closeUploadFileForm(null, false);
  getError();
});

