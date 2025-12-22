
import { SubmitButtonText } from '../data/data.js';
import { isEscapeKey } from './utils-modal.js';

const overlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const body = document.body;

function showMessage(templateId, blockSelector, buttonSelector, options = {}) {
  const { reopenForm = false, chooseNewFile = false } = options;

  const template = document
    .querySelector(templateId)
    .content
    .querySelector(blockSelector);

  const element = template.cloneNode(true);
  body.appendChild(element);

  const closeButton = element.querySelector(buttonSelector);
  const blockSelectorInner = element.querySelector(`${blockSelector}__inner`) || element;

  function removeMessage(){
    element.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);

    if (reopenForm) {
      overlay.classList.remove('hidden');
      body.classList.add('modal-open');
    }
  }

  function closeWithNewFile(){
    removeMessage();
    if (chooseNewFile) {
      uploadInput.value = '';
      uploadInput.click();
    }
  }

  function onEscKeydown(evt){
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick(evt){
    if (!blockSelectorInner.contains(evt.target)) {
      removeMessage();
    }
  }

  closeButton.addEventListener('click', closeWithNewFile);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);

  return element;
}

export function setSubmitButtonState(button, isBlocked) {
  button.disabled = isBlocked;
  button.textContent = isBlocked ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
}

export function isTextFieldFocused(fieldFirst, fieldSecond) {
  const activeElement = document.activeElement;
  return activeElement === fieldFirst || activeElement === fieldSecond;
}

export function onSuccessSend() {
  showMessage('#success', '.success', '.success__button', {
    reopenForm: false,
    chooseNewFile: false,
  });
}

export function onErrorSend() {
  showMessage('#error', '.error', '.error__button', {
    reopenForm: false,
    chooseNewFile: true,
  });
}
