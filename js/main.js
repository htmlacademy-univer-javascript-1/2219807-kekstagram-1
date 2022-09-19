const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min < max) {
    [max,min] = [min, max];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isMaxLength = (text, length) => (text.length >= length);
