import {
  isEscapeKey,
  getPhotoIdFromSrc,
  renderCommentsSlice
} from './utils-modal.js';
import { findPhotoById } from './photos.js';
import { COMMENTS_STEP } from './data.js';

const container = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigImg = bigPicture.querySelector('.big-picture__img img');
const bigCountLikes = bigPicture.querySelector('.likes-count');
const bigCountComments = bigPicture.querySelector('.comments-count');
const bigComments = bigPicture.querySelector('.social__comments');
const bigDesc = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

let currentComments = [];
let shownCommentsCount = 0;

function updateCommentsDisplay() {
  const renderData = renderCommentsSlice(currentComments, shownCommentsCount, COMMENTS_STEP);

  bigComments.innerHTML = '';
  bigComments.insertAdjacentHTML('beforeend', renderData.commentsHtml);
  commentCountBlock.innerHTML = renderData.commentCountHtml;

  if (renderData.isLoaderHidden) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
}

function resetComments() {
  currentComments = [];
  shownCommentsCount = 0;
}

function onDocumentKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closePicture();
  }
}

function closePicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  resetComments();
}

function onCommentsLoaderButtonClick() {
  shownCommentsCount += COMMENTS_STEP;
  updateCommentsDisplay();
}

function fillPictureData(picture) {
  const smallImg = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes').textContent;
  const commentsCount = picture.querySelector('.picture__comments').textContent;
  const photoId = getPhotoIdFromSrc(smallImg.src);
  const photo = findPhotoById(photoId);

  if (!photo) {
    bigComments.innerHTML = '';
    return;
  }

  bigImg.src = smallImg.src;
  bigDesc.textContent = photo.description;
  bigCountLikes.textContent = likes;
  bigCountComments.textContent = commentsCount;

  currentComments = photo.comments || [];
  shownCommentsCount = COMMENTS_STEP;

  if (currentComments.length === 0) {
    bigComments.innerHTML = '';
    commentCountBlock.classList.add('hidden');
    commentsLoaderButton.classList.add('hidden');
  } else {
    updateCommentsDisplay();
    commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
  }
}

function showPictureModal() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown, { once: true });
  closeButton.addEventListener('click', closePicture, { once: true });
}

function openPicture(picture) {
  fillPictureData(picture);
  showPictureModal();
}

function onContainerClick(event) {
  const picture = event.target.closest('.picture');
  if (!picture) {
    return;
  }
  event.preventDefault();
  openPicture(picture);
}

export function initPreviewModal() {
  container.addEventListener('click', onContainerClick);
}
