
import { photosData } from './photos.js';

export function renderPhotos() {
  const container = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();

  photosData.forEach(({ url, description, likes, comments }) => {
    const photoElement = photoTemplate.cloneNode(true);
    const img = photoElement.querySelector('.picture__img');
    const likesEl = photoElement.querySelector('.picture__likes');
    const commentsEl = photoElement.querySelector('.picture__comments');

    img.src = url;
    img.alt = description;
    likesEl.textContent = likes;
    commentsEl.textContent = comments.length;

    photoListFragment.appendChild(photoElement);
});

  container.appendChild(photoListFragment);
}
