import { PHOTO_COUNT, DESCRIPTION } from './data.js';
import { createSequentialId, getRandomInteger, getRandomArrayElement } from './utils.js';
import { createComments } from './comments.js';

const createPhoto = () => {
  const id = createSequentialId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
};

export const similarPhoto = () => Array.from({ length: PHOTO_COUNT }, createPhoto);
