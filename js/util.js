const ALERT_SHOW_TIME = 5000;

const getRandomNumberFromInterval = (start, end)=>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);

const isEscapeKey = (evt) => evt.key === 'Escape';
const isRightString = (str, maxLen) => String(str).length <= maxLen;


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

export {getRandomNumberFromInterval, isEscapeKey, isRightString, showAlert};
