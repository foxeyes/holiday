import { HdElement } from '../../../core/hd-element.js';

const TD_INSTANCES = new Set();

const _tdMouseUpHandler = function (e) {
  /**
   * @type {TeardropUi}
   */
  let td;
  let path = e.composedPath();
  path.forEach((el) => {
    if (td) {
      return;
    }
    if (el.$) {
      td = el.$.querySelector('teardrop-ui');
    }
    if (!td) {
      td = el.querySelector && el.querySelector('teardrop-ui');
    }
  });
  if (!td) {
    return;
  }
  let tdRect = td.getBoundingClientRect();
  let drop = document.createElement('div');
  drop.classList.add('drop');
  let x = e.clientX - tdRect.left - 3;
  let y = e.clientY - tdRect.top - 3;
  drop.style.top = y + 'px';
  drop.style.left = x + 'px';
  window.requestAnimationFrame(() => {
    td.$.appendChild(drop);
    window.requestAnimationFrame(() => {
      drop.setAttribute('dropped', '');
      drop.addEventListener('transitionend', () => {
        drop.remove();
        window.setTimeout(() => {
          drop = null;
        });
      });
    });
  });
};

class TeardropUi extends HdElement {

  constructor() {
    super();
    if (TD_INSTANCES.size === 0) {
      window.addEventListener('mousedown', _tdMouseUpHandler);
    }
    TD_INSTANCES.add(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    TD_INSTANCES.delete(this);
    if (TD_INSTANCES.size === 0) {
      window.removeEventListener('mousedown', _tdMouseUpHandler);
    }
  }
}

TeardropUi.template = /*html*/ `
<style>
  :host {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .drop {
    position: absolute;
    transition: 0.8s;
    height: 6px;
    width: 6px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
    will-change: transform opacity;
    box-sizing: border-box;
  }
  .drop[dropped] {
    transform: scale(20);
    opacity: 0;
  }
</style>
`;
TeardropUi.is = 'teardrop-ui';

export { TeardropUi };
