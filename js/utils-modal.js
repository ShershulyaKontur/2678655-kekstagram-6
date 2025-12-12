export function createCommentsHtml(data) {
  return data.map((item) => `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${item.avatar}"
        alt="${item.name}"
        width="35" height="35">
      <p class="social__text">${item.message}</p>
    </li>
  `).join('');
}

export function getPhotoIdFromSrc(src){
  const fileName = src.split('/').pop();
  const numberPart = fileName.split('.')[0];
  return Number(numberPart);
}

export function isEscapeKey(e) {
  return e.key === 'Escape' || e.key === 'Esc';
}

export function renderCommentsSlice(currentComments, shownCommentsCount) {
  const dataSlice = currentComments.slice(0, shownCommentsCount);
  const countCommentHtml = `
    ${dataSlice.length} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  return {
    commentsHtml: createCommentsHtml(dataSlice),
    commentCountHtml: countCommentHtml,
    isLoaderHidden: shownCommentsCount >= currentComments.length
  };
}
