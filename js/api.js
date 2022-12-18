const Urls = [
  'https://26.javascript.pages.academy/kekstagram/data',
  'https://26.javascript.pages.academy/kekstagram'
];

const getDataFrom = (onSuccess) => {
  fetch(Urls[0])
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
};

const sendDataTo = (onSuccess, onFail, body) => {
  fetch(
    Urls[1],
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз')
    });
};


export {getDataFrom, sendDataTo};
