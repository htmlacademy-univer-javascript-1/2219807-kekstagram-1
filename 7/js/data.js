import {getRandomNumber} from './util.js';

const AMOUNTOBJECTS = 25;
const randomMessages = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];

const randomNames = ['Николай', 'Никита', 'Кирилл'];

let idObject = 1;

const generatePhotoObjects = (amount) =>({
  id: idObject++,
  name: randomNames[getRandomNumber(0, randomNames.length - 1)],
  avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
  url: `photos/${getRandomNumber(1,amount)}.jpg`,
  description: 'asd',
  likes: getRandomNumber(15,200),
  comments: randomMessages[getRandomNumber(0,randomMessages.length - 1)],
});

const createPhotoObjects = () => Array.from({length:AMOUNTOBJECTS}, generatePhotoObjects);

export {createPhotoObjects};
