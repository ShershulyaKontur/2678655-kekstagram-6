import { photosData } from './photos.js';
import { isEscapeKey } from './utils.js';

const container = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigImg = bigPicture.querySelector('.big-picture__img img');
const bigCountLikes = bigPicture.querySelector('.likes-count');
const bigCountComments = bigPicture.querySelector('.comments-count');
const bigComments = bigPicture.querySelector('.social__comments');
const bigDesc = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const getPhotoIdFromSrc = (src) => {
  const fileName = src.split('/').pop();
  const numberPart = fileName.split('.')[0];
  return Number(numberPart);
};

const findPhotoById = (id) =>
  photosData.find((photo) => photo.id === id);

const renderComments = (comments) => {
  bigComments.innerHTML = '';

  const commentsHtml = comments.map((comment) => `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
  `).join('');

  bigComments.insertAdjacentHTML('beforeend', commentsHtml);
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    closePicture();
  }
};

function openPicture(picture) {
  const smallImg = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes').textContent;
  const commentsCount = picture.querySelector('.picture__comments').textContent;
  const photoId = getPhotoIdFromSrc(smallImg.src);
  const photo = findPhotoById(photoId);

  bigImg.src = smallImg.src;
  bigDesc.textContent = photo.description;
  bigCountLikes.textContent = likes;
  bigCountComments.textContent = commentsCount;

  if (photo && photo.comments) {
    renderComments(photo.comments);
  } else {
    bigComments.innerHTML = '';
  }

  bigPicture.classList.remove('hidden');
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', () => {
  closePicture();
  document.removeEventListener('keydown', onDocumentKeydown);
});

container.addEventListener('click', (event) => {
  const picture = event.target.closest('.picture');
  if (!picture) {
    return;
  }
  event.preventDefault();
  openPicture(picture);
});
