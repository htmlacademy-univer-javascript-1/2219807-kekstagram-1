let getRandomNumber = (min, max) => {
    if (min >= max) return NaN

    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }

let isMaxLength = (text, length) => {
    if (text.length >= length) return false;
    return true;
}