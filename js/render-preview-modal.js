import { photosData } from './photos.js';
import { isEscapeKey, createCommentsHtml, getPhotoIdFromSrc } from './utils-modal.js';

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

const findPhotoById = (id) => photosData.find((photo) => photo.id === id);

const renderComments = (comments) => {
  bigComments.innerHTML = '';
  const commentsHtml = createCommentsHtml(comments);
  bigComments.insertAdjacentHTML('beforeend', commentsHtml);
};

function closePicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePicture);
}

function onDocumentKeydown (event){
  event.preventDefault()
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

    if (photo.comments) {
      renderComments(photo.comments);
    } else {
      bigComments.innerHTML = '';
    }
  };

const showPictureModal = () => {
  bigPicture.classList.remove('hidden');
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
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

export const initPreviewModal = () => {
  container.addEventListener('click', onContainerClick);
};
