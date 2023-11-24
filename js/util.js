const getRandomNumberFromInterval = (start, end)=>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);
const isEscapeKey = (evt) => evt.key === 'Escape';
const isRightString = (str, maxLen) => String(str).length <= maxLen;
export {getRandomNumberFromInterval, isEscapeKey, isRightString};
