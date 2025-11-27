const PHOTO_COUNT = 25;

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'На отдыхе в Анапе',
  'Ослепительное садовое кольцо',
  'Солнечный пляж',
  'Прогулка по летнему лесу',
  'Захватывающий вид на горы',
  'Тихий вечер у озера',
  'Ночной город в огнях',
  'Семейное празднование дня рождения',
  'Весенний парк в цвету',
  'Пикник на лугу с друзьями'
];

const NAME = [
  'Макар',
  'Артем',
  'Матвей',
  'Богдан',
  'Дмитрий',
  'Александр',
  'Алексей',
  'Владимир',
  'Иван',
  'Никита',
  'Михаил',
  'Кирилл',
  'Егор',
  'Павел'
];

const usedNumbers = new Set();

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomUniqueInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  if (usedNumbers.size >= (upper - lower + 1)) {
    usedNumbers.clear();
  }

  let result;
  do {
    result = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  } while (usedNumbers.has(result));

  usedNumbers.add(result);
  return result;
};

const getRandomMessage = () => {
  const count = getRandomInteger(1, 2);
  const messages = Array.from({length: count}, () => getRandomArrayElement(MESSAGE));
  return messages.join(' ');
};

const getCount = () => {
  let countId = 0;
  return function () {
    return ++countId;
  };
};

const createSequentialId = getCount();

const createComment = () => ({
  id: getRandomUniqueInteger(1, 999),
  avatar: `img/avatar-${getRandomUniqueInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAME)
});

const createPhoto = () => {
  const id = createSequentialId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomUniqueInteger(0, 30)}, createComment)
  };
};

export const similarPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);
