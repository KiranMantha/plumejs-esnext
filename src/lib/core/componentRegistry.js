const componentRegistry = new (class {
  globalStyles;
  globalStyleTag;
  style_registry;
  isRootNodeSet;

  constructor() {
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch (e) {
      this.globalStyles = '';
    }
    this.isRootNodeSet = false;
    this.globalStyleTag = null;
  }

  getComputedCss(styles = '') {
    let csoArray = [];
    const defaultStyles = new CSSStyleSheet();
    defaultStyles.insertRule(':host { display: block; }');
    csoArray = [this.globalStyles, defaultStyles];
    if (styles) {
      const sheet = new CSSStyleSheet();
      sheet.replace(styles);
      csoArray.push(sheet);
    }
    return csoArray;
  }
})();

export { componentRegistry };
