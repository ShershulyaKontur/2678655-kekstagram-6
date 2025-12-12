import { isEscapeKey } from './utils-modal.js';

const overlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const descField = form.querySelector('.text__description');
const body = document.body;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]+$/i;
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;

// ===== Открытие / закрытие модалки =====

function resetUploadInput() {
  uploadInput.value = '';
}

function closeForm() {
  console.log('closeForm');
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  resetUploadInput();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(event) {
  console.log('keydown handler', event.key);

  if (!isEscapeKey(event)) {
    return;
  }

  if (isTextFieldFocused()) {
    console.log('Esc in text field, ignore');
    event.stopPropagation();
    return;
  }

  event.preventDefault();
  console.log('Esc, close form');
  closeForm();
}

function showModal() {
  console.log('showModal');
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeForm();
  }, { once: true });
}

export function initForm() {
  console.log('initForm');
  uploadInput.addEventListener('change', showModal);
}

// ===== Pristine =====

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

function getHashtags(value) {
  return value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);
}

function isTextFieldFocused() {
  const activeElement = document.activeElement;
  console.log('activeElement:', activeElement);
  return activeElement === hashtagField || activeElement === descField;
}

function validateHashtags(value) {
  const tags = getHashtags(value);

  if (tags.length === 0) {
    return true;
  }

  const isCountTags = tags.length <= MAX_HASHTAGS;
  const lowerTags = tags.map((tag) => tag.toLowerCase());
  const isUnique = new Set(lowerTags).size === lowerTags.length;

  const isEachTagValid = tags.every((tag) => {
    const isLengthOk = tag.length <= MAX_HASHTAG_LENGTH;
    const isRegexOk = HASHTAG_REGEX.test(tag);
    return isLengthOk && isRegexOk;
  });

  return isCountTags && isUnique && isEachTagValid;
}

pristine.addValidator(hashtagField, validateHashtags);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
