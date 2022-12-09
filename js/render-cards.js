const template = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

const createCards = (images) => {
  images.forEach((image) => {
    const picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = image.url;
    picture.querySelector('.picture__likes').textContent = image.likes;
    picture.querySelector('.picture__comments').textContent = image.comments.length;
    picturesFragment.append(picture);
  });
  pictures.append(picturesFragment);
};

export {createCards};
