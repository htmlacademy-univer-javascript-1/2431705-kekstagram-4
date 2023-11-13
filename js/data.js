import {getRandomNumberFromInterval} from './util.js';
const MESSAGES = ['', 'Всё отлично!В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES= ['Aboba', 'MegaGrib', 'Nagibator3000', 'Artem', 'Ghg', 'top_php_progger'];
const PHOTOS_COUNT = 26;
const MAX_COMMENTS_COUNT = 30;
const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const getComments = (quantity, id) => new Array(quantity).fill('').map((_, messageId) => {
  const mesIndex = getRandomNumberFromInterval(0, MESSAGES.length - 1);

  return {
    id: `(${id}-${messageId})`,
    avatar: `img/avatar-${mesIndex}.svg`,
    message:  MESSAGES[mesIndex],
    name: NAMES[mesIndex]
  };
});

export const getPhotoDescriptions = () =>
  new Array(PHOTOS_COUNT).fill('').map((_, id) => ({
    id: id,
    url :`photos/${id}.jpg`,
    description : 'Мое придуманное описание',
    likes: getRandomNumberFromInterval(LikesCount.MIN, LikesCount.MAX),
    comments: getComments(getRandomNumberFromInterval(0, MAX_COMMENTS_COUNT), id)
  }));
