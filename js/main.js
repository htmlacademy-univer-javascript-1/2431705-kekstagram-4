
import {MESSAGES, NAMES, PHOTOS_COUNT, MAX_COMMENTS_COUNT, LikesCount} from './data.js';
import {getRandomNumberFromInterval} from './util.js';
const constructComments = (quantity, id) => new Array(quantity).fill('').map((_, messageId) => {
  const mesIndex = getRandomNumberFromInterval(0, MESSAGES.length - 1);

  return {
    id: `(${id}-${messageId})`,
    avatar: `img/avatar-${mesIndex}.svg`,
    message:  MESSAGES[mesIndex],
    name: NAMES[mesIndex]
  };
});

const getThubnails = () =>

  new Array(PHOTOS_COUNT).fill('').map((_, id) => ({
    id: id,
    url :`photos/${id}.jpg`,
    description : 'Мое придуманное описание',
    likes: getRandomNumberFromInterval(LikesCount.MIN, LikesCount.MAX),
    comments: constructComments(getRandomNumberFromInterval(0, MAX_COMMENTS_COUNT), id)
  }));

console.log(getThubnails());
