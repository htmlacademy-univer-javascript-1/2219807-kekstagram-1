const TAG_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/i;
const MAX_TAGS_COUNT = 5;

const separateHashTag = (value) => value.toLowerCase().split(' ');

const isHashtagsRepeated = (value) => {
  if (value !== '') {
    const hashTagsArray = separateHashTag(value);
    const hashTagsSet = new Set(hashTagsArray);

    if (hashTagsSet.size !== hashTagsArray.length) {
      return false;
    }
  }
  return true;
};

const isMaxHashtags = (value) => {
  if (value !== '') {
    const hashTagsArray = separateHashTag(value);

    if (hashTagsArray.length > MAX_TAGS_COUNT) {
      return false;
    }
  }
  return true;
};

const isHashtagCorrect = (value) => {
  if (value === '') {
    return true;
  }

  const hashTagsArray = separateHashTag(value);
  return hashTagsArray.every((hashtag) => TAG_REGEX.test(hashtag));
};

export {
  isHashtagsRepeated,
  isMaxHashtags,
  isHashtagCorrect,
  MAX_TAGS_COUNT,
};

