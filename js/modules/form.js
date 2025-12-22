import { isEscapeKey } from '../utils/utils-modal.js';
import {
  addFieldValidator,
  isNotOnlyHash,
  isCountHash,
  isUniqueTags,
  isEachTagValid,
  isDescLength
} from '../utils/utils-validate.js';
import { PristineMessage, URL } from '../data/data.js';
import { sendData } from './api.js';
import {
  setSubmitButtonState,
  isTextFieldFocused,
  onSuccessSend,
  onErrorSend
} from '../utils/utils-form.js';

const overlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const descField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const body = document.body;
const {
  ONLY_HASH,
  MAX_HASHTAGS,
  DUPLICATE_HASHTAGS,
  INVALID_HASHTAG,
  MAX_DESCRIPTION
} = PristineMessage;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

addFieldValidator(pristine, hashtagField, isNotOnlyHash, ONLY_HASH, 4, true);
addFieldValidator(pristine, hashtagField, isCountHash, MAX_HASHTAGS, 3, true);
addFieldValidator(pristine, hashtagField, isUniqueTags, DUPLICATE_HASHTAGS, 2, true);
addFieldValidator(pristine, hashtagField, isEachTagValid, INVALID_HASHTAG, 1, true);
addFieldValidator(pristine, descField, isDescLength, MAX_DESCRIPTION);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused(hashtagField, descField)) {
    evt.preventDefault();
    const notification = document.querySelector('.success, .error');
    if (notification) {
      return;
    }
    closeForm();
  }
}

function openModal() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeForm, { once: true });
}

function closeForm() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

async function handleFormSubmit(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  try {
    setSubmitButtonState(submitButton, true);
    await sendData(URL, new FormData(evt.target));
    closeForm();
    onSuccessSend();
  } catch (error) {
    onErrorSend();
  } finally {
    setSubmitButtonState(submitButton, false);
  }
}

export function initForm() {
  uploadInput.addEventListener('change', openModal);
  form.addEventListener('submit', handleFormSubmit);
}
