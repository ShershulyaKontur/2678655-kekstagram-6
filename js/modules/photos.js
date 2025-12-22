import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { URL } from '../data/data.js';
import { initPreviewModal } from './render-preview-modal.js';

function showError() {
  const container = document.querySelector('.pictures');
  const errorFragment = createErrorFragment();
  container.appendChild(errorFragment);

  setTimeout(() => {
    container.removeChild(errorFragment);
  }, 5000);
}

function createErrorFragment() {
  const errorTemplate = document.querySelector('#photo-error')
    .content
    .querySelector('.photo-error');

  const errorEl = errorTemplate.cloneNode(true);

  Object.assign(errorEl.style, {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)'
  });

  return errorEl;
}

export async function initPhotos() {
  try {
    const photos = await getData(URL);
    renderPhotos(photos);
    initPreviewModal(photos);
  } catch (error) {
    showError();
  }
}
