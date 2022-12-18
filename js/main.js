import {createThumbnails} from './renderCards.js';
import {setUserFormSubmit, closeUploadFileForm} from './form.js';
import {getDataFrom} from './api.js';
import {getSuccess, getError} from './alerts.js';


getDataFrom(createThumbnails);
setUserFormSubmit(() => {
  closeUploadFileForm();
  getSuccess();
}, () => {
  closeUploadFileForm(null, false);
  getError();
});
