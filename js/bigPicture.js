const bigPicture = document.querySelector('.big-picture');
const socCommentCount = document.querySelector('.social__comment-count');
const comLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const closeOption = () => {
  bigPicture.classList.add('hidden');
  socCommentCount.classList.remove('hidden');
  comLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  bigPicture.querySelector('.social__comments').replaceChildren();
};

const escButtonPossibleAction = (keyEvent) => {
  if (keyEvent.keyCode === 27) {
    closeOption();
    document.removeEventListener('keydown', escButtonPossibleAction);
  }
};

const addClosingOption = () => {
  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeOption();
    document.removeEventListener('keydown', escButtonPossibleAction);});
  document.addEventListener('keydown', escButtonPossibleAction);
};

const renderComment = ({avatar, message, name}) => {
  const container = document.createDocumentFragment();

  const tempLi = document.createElement('li');
  tempLi.classList.add('social__comment');
  container.append(tempLi);

  const tempImg = document.createElement('img');
  tempImg.classList.add('social__picture');
  tempImg.src = avatar;
  tempImg.alt = name;
  tempImg.width = 35;
  tempImg.height = 35;
  container.querySelector('li').append(tempImg);

  const tempP = document.createElement('p');
  tempP.classList.add('social__text');
  tempP.textContent = message;
  container.querySelector('li').append(tempP);

  bigPicture.querySelector('.social__comments').append(container);
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    renderComment(comment);
  });
};

const renderBigPicture = ({url, description, likes, comments}) => {
  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;

  renderComments(comments);

  bigPicture.classList.remove('hidden');
  socCommentCount.classList.add('hidden');
  comLoader.classList.add('hidden');
  body.classList.add('modal-open');

  addClosingOption();
};

export {renderBigPicture};
