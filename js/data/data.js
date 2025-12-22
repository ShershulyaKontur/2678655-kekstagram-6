export const COMMENTS_STEP = 5;
export const MAX_HASHTAGS = 5;
export const MAX_HASHTAG_LENGTH = 20;
export const MAX_DESC_LENGTH = 140;
export const URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export const PristineMessage = {
  INVALID_HASHTAG: `Хэш-тег должен начинаться с # и быть не длиннее ${MAX_HASHTAG_LENGTH} символов`,
  ONLY_HASH: 'Хэш-тег не может состоять только из символа #',
  MAX_HASHTAGS: `Не больше ${MAX_HASHTAGS} хэш-тегов`,
  DUPLICATE_HASHTAGS: 'Хэш-теги не должны повторяться',
  MAX_DESCRIPTION: `Поле не должно превышать ${MAX_DESC_LENGTH} символов`,
};

export const ResponceMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/1',
};

export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

