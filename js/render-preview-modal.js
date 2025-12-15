import {
  isEscapeKey,
  getPhotoIdFromSrc,
  createCommentsSlice
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
const fullCountSpan = commentCountBlock.querySelector('.comments-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

let currentComments = [];
let shownCommentsCount = 0;

function updateCommentCounter(visibleCount, totalCount) {
  fullCountSpan.textContent = totalCount;
  commentCountBlock.firstChild.textContent = `${visibleCount} из `;
}

function appendCommentsSlice() {
  const start = shownCommentsCount;
  const end = start + COMMENTS_STEP;
  const slice = currentComments.slice(start, end);
  const lengthComments = currentComments.length

  if (slice.length === 0) {
    return;
  }

  const commentsHtml = createCommentsSlice(slice);
  bigComments.insertAdjacentHTML('beforeend', commentsHtml);

  shownCommentsCount += slice.length;
  updateCommentCounter(shownCommentsCount,lengthComments);

  if (shownCommentsCount === currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
}

function resetComments() {
  currentComments = [];
  shownCommentsCount = 0;
  bigComments.innerHTML = '';
  commentCountBlock.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
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
  commentsLoaderButton.removeEventListener('click', appendCommentsSlice);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetComments();
}

function fillPictureData(picture) {
  const smallImg = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes').textContent;
  const commentsCount = picture.querySelector('.picture__comments').textContent;
  const photoId = getPhotoIdFromSrc(smallImg.src);
  const photo = findPhotoById(photoId);

  if (!photo) {
    resetComments();
    return;
  }

  bigImg.src = smallImg.src;
  bigDesc.textContent = photo.description;
  bigCountLikes.textContent = likes;
  bigCountComments.textContent = commentsCount;

  currentComments = photo.comments || [];
  shownCommentsCount = 0;
  bigComments.innerHTML = '';

  if (currentComments.length === 0) {
    resetComments();
  } else {
    commentCountBlock.classList.remove('hidden');
    commentsLoaderButton.classList.remove('hidden');
    appendCommentsSlice();
    commentsLoaderButton.addEventListener('click', appendCommentsSlice);
  }
}

function showPictureModal() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closePicture,{once:true});
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
