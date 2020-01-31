/**
 *
 * @param {Element | ShadowRoot} entryPoint
 * @param {String} selector
 * @returns {Array<Element>}
 */
export function shadowSelectorAll(entryPoint, selector) {
  let resultArr = [];
  let find = function (entryPoint, selector) {
    let levelArr = entryPoint.querySelectorAll(selector);
    resultArr = [...resultArr, ...levelArr];
    let nestedArr = [...entryPoint.querySelectorAll('*')];
    nestedArr.forEach((el) => {
      if (el.shadowRoot) {
        find(el.shadowRoot, selector);
      }
    });
  };
  find(entryPoint, selector);
  return resultArr;
}
