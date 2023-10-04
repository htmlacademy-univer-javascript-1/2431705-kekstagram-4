const message = ['', 'Всё отлично!В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names= ['Aboba', 'MegaGrib', 'Nagibator3000', 'Artem'];

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
    const avatarNum = getRandomNumberFromInterval(1, 6);
    const index = getRandomNumberFromInterval(0, 5);
    comments.push({
      id: getIds(),
      avatar: `img/avatar-${  avatarNum  }.svg`,
      message: message[index],
      name: names[index]
    });
  }
  return comments;
};
const getDescriptionPhoto = () =>{
  const photos = [];
  const getIds = getMessageId();
  for(let id = 1; id <= 25; id++)
  {
    photos.push({
      id: id,
      url :`photos/${  id  }.jpg`,
      description : 'Мое придуманное описание',
      likes: getRandomNumberFromInterval(15, 200),
      comments: constructComments(getRandomNumberFromInterval(0, 30), getIds)
    });
  }
  return photos;
};
console.log(getDescriptionPhoto());
