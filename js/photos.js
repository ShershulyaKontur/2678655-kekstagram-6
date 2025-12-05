import { PHOTO_COUNT, DESCRIPTION,LIKES_COUNT_MIN,LIKES_COUNT_MAX } from './data.js';
import { createSequentialIdPhoto, getRandomInteger, getRandomArrayElement } from './utils.js';
import { createComments } from './comments.js';

const createPhoto = () => {
  const id = createSequentialIdPhoto();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    comments: createComments()
  };
};

export const photosData = Array.from({ length: PHOTO_COUNT }, createPhoto);
