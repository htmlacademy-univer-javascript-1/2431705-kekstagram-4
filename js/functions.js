const checkLengthString =(str, length) =>
  str.length >= Number(length);

const isPalindrome = (str) =>
{
  str = String(str).replaceAll(' ', '').toLowerCase();
  const strReverse = str.split('').reverse().join('');
  return str === strReverse ;
};

const getNumberFromString = (str) =>
{
  str = str.toString();
  const array =  Array.from(str.split('')).filter((char) => !isNaN(parseInt(char, 10)));
  return array.length > 0 ? +(array.join('')) : NaN;
};

checkLengthString('aboba', 8);
getNumberFromString('aboba228');
isPalindrome('aboba');
