import { getRandomArrayElement,getRandomInteger,createSequentialIdComment } from './utils.js';
import { NAME,MESSAGE,COMMENT_COUNT,AVATAR_COUNT } from './data.js';

const getRandomMessage = () => {
  const count = getRandomInteger(1, 2);
  const messages = Array.from({length: count}, () => getRandomArrayElement(MESSAGE));
  return messages.join(' ');
};
const createComment = () => ({
  id: createSequentialIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAME)
});

export const createComments = () =>
  Array.from({ length: getRandomInteger(0, COMMENT_COUNT)}, createComment);
