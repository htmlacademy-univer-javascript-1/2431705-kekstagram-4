const getRandomNumberFromInterval = (start, end)=>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);
export {getRandomNumberFromInterval};
