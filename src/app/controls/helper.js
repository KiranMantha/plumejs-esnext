export const isOutOfViewPort = (htmlElement) => {
  let t;
  const scrollTop = (
    ((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollTop == 'number'
      ? t
      : document.body
  ).scrollTop;
  const topOffset = htmlElement.getBoundingClientRect().top;
  const relativeOffset = topOffset - scrollTop;
  const windowHeight = window.innerHeight;
  return relativeOffset > windowHeight / 2;
};
