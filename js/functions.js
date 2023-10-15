const checkLengthString = (str, length) =>
  str.length >= Number(length);

const isPalindrome = (str) => {
  str = String(str).replaceAll(' ', '').toLowerCase();
  const strReverse = str.split('').reverse().join('');
  return str === strReverse ;
};

const getNumberFromString = (str) => {
  str = str.toString();
  const array =  Array.from(str.split('')).filter((char) => !isNaN(parseInt(char, 10)));
  return array.length > 0 ? +(array.join('')) : NaN;
};

checkLengthString('aboba', 8);
getNumberFromString('aboba228');
isPalindrome('aboba');

const getMinutesFromTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingDuringWorkingHours = (start, finish, startMeeting, meetingTime) =>{
  const [startInMinutes, startMeetingInMinutes, finishInMinutes] = [start, startMeeting, finish].map(getMinutesFromTime);

  return (startInMinutes <= startMeetingInMinutes) && (startMeetingInMinutes + meetingTime <= finishInMinutes);

};
console.log(isMeetingDuringWorkingHours('08:00', '17:30', '14:00', 90),
  isMeetingDuringWorkingHours('8:0', '10:0', '8:0', 120),
  isMeetingDuringWorkingHours('08:00', '14:30', '14:00', 90),
  isMeetingDuringWorkingHours('14:00', '17:30', '08:0', 90),
  isMeetingDuringWorkingHours('8:00', '17:30', '08:00', 900));
