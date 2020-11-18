window.HTMLElement.prototype.trigger = function(eventName, isBubbleing) {
  let event = new Event(eventName, {
    bubbles: isBubbleing !== undefined ? isBubbleing : false,
    cancelable: false
  });
  this.dispatchEvent(event);
};
