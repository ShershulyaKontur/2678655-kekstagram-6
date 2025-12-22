import { SubmitButtonText } from '../data/data.js';
import { isEscapeKey } from './utils-modal.js';

const uploadInput = document.querySelector('.img-upload__input');
const body = document.body;

function showMessage(templateId, blockSelector, option = {}) {
  const element = createMessageElement(templateId, blockSelector);
  body.appendChild(element);

  setupCloseHandlers(element, blockSelector, option);

  return element;
}

function createMessageElement(templateId, blockSelector) {
  const template = document.querySelector(templateId)
    .content
    .querySelector(blockSelector);

  if (blockSelector === '.error') {
    Object.assign(template.style, {zIndex: '10'});
  }

  return template.cloneNode(true);
}

function setupCloseHandlers(element, blockSelector, { chooseNewFile = false } = {}) {
  const closeButton = element.querySelector(`${blockSelector}__button`);
  const inner = element.querySelector(`${blockSelector}__inner`) || element;
  closeButton.addEventListener('click', () => closeMessage(element, chooseNewFile));
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', (evt) => onOutsideClick(evt, inner, element));
}

function closeMessage(element, chooseNewFile) {
  removeMessage(element);
  if (chooseNewFile) {
    uploadInput.value = '';
    console.log('123')
    uploadInput.click();
  }
}

function removeMessage(element) {
  element.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    const element = document.querySelector('.success, .error');
    if (element) {
      removeMessage(element);
    }
  }
}

function onOutsideClick(evt, inner, element) {
  if (!inner.contains(evt.target)) {
    removeMessage(element);
  }
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
    chooseNewFile: false,
  });
}

export function onErrorSend() {
  showMessage('#error', '.error', '.error__button', {
    chooseNewFile: true,
  });
}
