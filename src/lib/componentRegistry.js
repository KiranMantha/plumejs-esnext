// @flow
const componentRegistry = new (class {
  globalStyles;
  globalStyleTag;
  style_registry;
  isRootNodeSet;

  constructor() {
    this.globalStyles = new CSSStyleSheet();
    this.isRootNodeSet = false;
  }

  getComputedCss(styles = '') {
    let csoArray = [];
    const defaultStyles = new CSSStyleSheet();
    defaultStyles.insertRule(`:host { display: block; }`);
    csoArray = [this.globalStyles, defaultStyles];
    if (styles) {
      const sheet = new CSSStyleSheet();
      sheet.replace(styles);
      csoArray.push(sheet);
    }
    return csoArray;
  }
})();

export {componentRegistry };