import { createRandomUniqueInteger, getRandomArrayElement,getRandomInteger } from './utils.js';
import { NAME,MESSAGE,COMMENT_COUNT,AVATAR_COUNT,COMMENT_ID } from './data.js';

const getRandomMessage = () => {
  const count = getRandomInteger(1, 2);
  const messages = Array.from({length: count}, () => getRandomArrayElement(MESSAGE));
  return messages.join(' ');
};
const createComment = () => ({
  id: createRandomUniqueInteger(1, COMMENT_ID),
  avatar: `img/avatar-${createRandomUniqueInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAME)
});

export const createComments = () =>
  Array.from({ length: createRandomUniqueInteger(0, COMMENT_COUNT)}, createComment);
