import {generatePhotoObjects} from './data';

const template = document.querySelector('#picture').content;
const newTemplate = template.querySelector('.picture');

const photos = document.querySelector('.pictures');
const factor = document.createDocumentFragment();

const renderPicture = ({url, likes, comments}) => {
  const cloneOfPicture = newTemplate.cloneNode(true);
  cloneOfPicture.querySelector('img').src = url;
  cloneOfPicture.querySelector('.picture__likes').textContent = likes;
  cloneOfPicture.querySelector('.picture__comments').textContent = comments.length;

  factor.appendChild(cloneOfPicture);
};

const renderPictures = (pictures) => {
  for (let i = 0; i < pictures.length; i++) {
    renderPicture(pictures[i]);
  }
  photos.appendChild(factor);
};

renderPictures(generatePhotoObjects(25));
