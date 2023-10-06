const MESSAGES = ['', 'Всё отлично!В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES= ['Aboba', 'MegaGrib', 'Nagibator3000', 'Artem'];
const PHOTOSCOUNT = 25;
const MAXCOMMENTSCOUNT = 30;
const MINLIKESCOUNT = 15;
const MAXLIKESCOUNT = 200;
const MAXNUMAVATAR = 6;
const getRandomNumberFromInterval = (start, end)=>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);

const getMessageId = () => {
  let endMess = 10;
  const messageIds= [];
  return function () {
    let id;
    if (messageIds.length >= endMess) {
      endMess = endMess * 2;
    }
    do {id = getRandomNumberFromInterval(1, endMess);
    }
    while (messageIds.includes(id));
    messageIds.push(id);
    return id;
  };
};

const constructComments =(quantity, getIds) =>{
  const comments = [];
  for(let i = 0; i < quantity; i++){
    const avatarNum = getRandomNumberFromInterval(1, MAXNUMAVATAR);
    const mesIndex = getRandomNumberFromInterval(0, MESSAGES.length - 1);
    comments.push({
      id: getIds(),
      avatar: `img/avatar-${  avatarNum  }.svg`,
      message:  MESSAGES[mesIndex],
      name: NAMES[mesIndex]
    });
  }
  return comments;
};
const getDescriptionPhotos = () =>{
  const photos = [];
  const getIds = getMessageId();
  for(let id = 1; id <= PHOTOSCOUNT; id++){
    photos.push({
      id: id,
      url :`photos/${  id  }.jpg`,
      description : 'Мое придуманное описание',
      likes: getRandomNumberFromInterval(MINLIKESCOUNT, MAXLIKESCOUNT),
      comments: constructComments(getRandomNumberFromInterval(0, MAXCOMMENTSCOUNT), getIds)
    });
  }
  return photos;
};
getDescriptionPhotos();
