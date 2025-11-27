import { createRandomUniqueInteger, getRandomArrayElement,getRandomInteger } from './utils.js';
import { NAME,MESSAGE } from './data.js';

const getRandomMessage = () => {
  const count = getRandomInteger(1, 2);
  const messages = Array.from({length: count}, () => getRandomArrayElement(MESSAGE));
  return messages.join(' ');
};
const createComment = () => ({
  id: createRandomUniqueInteger(1, 999),
  avatar: `img/avatar-${createRandomUniqueInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAME)
});

export const createComments = () =>
  Array.from({ length: createRandomUniqueInteger(0, 30) }, createComment);
