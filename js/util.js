const TIMEOUT_DELAY = 250;

const getRandomNumberFromInterval = (start, end)=>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);

const shuffle = (arr) => arr.map((element) => [Math.random(), element])
  .sort((item1, item2) => item1[0] - item2[0])
  .map((item) => item[1]);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isRightString = (str, maxLen) => String(str).length <= maxLen;

const  sortByCommentCountDescending= (currentPicture, nextPicture) => nextPicture.comments.length - currentPicture.comments.length;

function debounce (callback) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
}

export {getRandomNumberFromInterval, isEscapeKey, isRightString, shuffle, sortByCommentCountDescending, debounce};
