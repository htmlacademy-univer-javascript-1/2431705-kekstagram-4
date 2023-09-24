function checkLengthString(str, length)
{
  return str.length >= Number(length);
}
function isPalindrome(str)
{
  str  = String(str).replaceAll(' ', '').toLowerCase();
  const strReverse = str.split('').reverse().join('');
  return str === strReverse ;
}

function getNumberString(str)
{
  str = str.toString();
  const array =  Array.from(str.split('')).filter((char) => !isNaN(parseInt(char)));
  if(array.length > 0){
    return  Number(array.join(''));
  }
  else{ return  NaN; }

}
const commandArray = {
  'isPalindrome' : ['Кекс', 'топо', 'Лёша на полке клопа нашёл '],
  'getNumberString' : [6, '2023 год', 'ECMAScript 2022', '1 кефир, 0.5 батона', 'агент 007', 'а я томат', -1, 9.5],
  'checkLengthString' : [['ghghg ghg gplg', 20000], ['ghghg ghg gplg', 2], ['ttt', 3]]

};
function processElements(command, elements) {
  elements.forEach((element) => {
    switch(command) {
      case 'isPalindrome':
        console.log(isPalindrome(element));
        break;
      case 'checkLengthString':
        console.log(checkLengthString(element[0], element[1]));
        break;
      case 'getNumberString':
        console.log(getNumberString(element));
        break;
      default:
        console.log('Invalid command');
    }
  });
}

processElements('isPalindrome', commandArray['isPalindrome']);
processElements('checkLengthString', commandArray['checkLengthString']);
processElements('getNumberString', commandArray['getNumberString']);


