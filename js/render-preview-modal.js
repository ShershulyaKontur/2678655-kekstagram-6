import { photosData } from './photos.js';
import { isEscapeKey, createCommentsHtml, getPhotoIdFromSrc} from './utils-modal.js';
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
let currentComments = [];
let shownCommentsCount = 0;


const findPhotoById = (id) => photosData.find((photo) => photo.id === id);

const renderCommentsPortion = () => {
  const dataSlice = currentComments.slice(0,shownCommentsCount);
  const countCommentHtml = `
    ${dataSlice.length} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  bigComments.innerHTML = '';
  bigComments.insertAdjacentHTML('beforeend', createCommentsHtml(dataSlice));
  commentCountBlock.innerHTML = countCommentHtml;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

};

const resetCommentsState = () => {
  currentComments = [];
  shownCommentsCount = 0;
};

function closePicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePicture);
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  resetCommentsState();
}

function onDocumentKeydown (event){
  event.preventDefault();
  if (isEscapeKey(event)) {
    closePicture();
  }
}

const fillPictureData = (picture) => {
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
    renderCommentsPortion();
    commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
  }
};


const showPictureModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closePicture);
};

const openPicture = (picture) => {
  fillPictureData(picture);
  showPictureModal();
};


const onContainerClick = (event) => {
  const picture = event.target.closest('.picture');
  if (!picture) {
    return;
  }
  event.preventDefault();
  openPicture(picture);
};

function onCommentsLoaderButtonClick(){
  shownCommentsCount += COMMENTS_STEP;
  renderCommentsPortion();
}

export const initPreviewModal = () => container.addEventListener('click', onContainerClick);
