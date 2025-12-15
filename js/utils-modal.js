function createCommentHtml(comment) {
  return `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35"
      >
      <p class="social__text">${comment.message}</p>
    </li>
  `;
}
export function getPhotoIdFromSrc(src){
  const fileName = src.split('/').pop();
  const numberPart = fileName.split('.')[0];
  return Number(numberPart);
}
export function isEscapeKey(e) {
  return e.key === 'Escape';
}
export function createCommentsSlice(comments) {
  return comments.map((comment) => createCommentHtml(comment)).join('');
}
