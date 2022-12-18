const ALERT_SHOW_TIME = 1000;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapePressed = (event) => event.key === 'Escape';

const declensionComments = (numberComments) => {
  const ones = numberComments % 10;
  const tens = numberComments / 10 % 10;
  if (ones === 1 && tens === 0 || (tens >= 2 && ones === 1)) {
    return ' комментария';
  } else {
    return ' комментариев';
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const checkFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

export {
  getRandomPositiveInteger,
  isEscapePressed,
  declensionComments,
  showAlert,
  debounce,
  checkFileType
};
