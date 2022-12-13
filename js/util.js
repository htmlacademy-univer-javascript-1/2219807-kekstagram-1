const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElementFromArray = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const checkStringLength = (string, length) => string.length <= length;

const uniqueNumberGenerator = () => {
  let prevNumber = 0;

  return () => ++prevNumber;
};

const isEscapeKey = (event) => event.key === 'Escape';

const declensionComments = (numberComments) => {
  const ones = numberComments % 10;
  const tens = numberComments / 10 % 10;
  if (ones === 1 && tens === 0 || (tens >= 2 && ones === 1)) {
    return ' комментария';
  } else {
    return ' комментариев';
  }
};

export {
  getRandomPositiveInteger,
  getRandomElementFromArray,
  checkStringLength,
  uniqueNumberGenerator,
  isEscapeKey,
  declensionComments
};
