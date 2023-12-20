const TIMEOUT_DELAY = 250;
const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.width = '500px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.backgroundColor = '#f04848';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.textTransform = 'none';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscapeKey, isRightString, shuffle, sortByCommentCountDescending, debounce, showAlert};
