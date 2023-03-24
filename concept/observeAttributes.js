/**
 * reference: https://marvinh.dev/blog/web-components-in-2020/
 */
function observeAttrChange(el, callback) {
  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        let newVal = mutation.target.getAttribute(mutation.attributeName);
        callback(mutation.attributeName, newVal);
      }
    });
  });
  observer.observe(el, { attributes: true });
  return observer;
}
