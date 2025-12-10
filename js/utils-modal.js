export const createCommentsHtml = (data) =>
  data.map((item) => `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${item.avatar}"
        alt="${item.name}"
        width="35" height="35">
      <p class="social__text">${item.message}</p>
    </li>
  `).join('');

export const getPhotoIdFromSrc = (src) => {
  const fileName = src.split('/').pop();
  const numberPart = fileName.split('.')[0];
  return Number(numberPart);
};

export const isEscapeKey = (e) => e.key === 'Escape';
