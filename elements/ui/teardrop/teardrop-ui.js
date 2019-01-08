import { HdElement } from '../../../core/hd-element.js';

class TeardropUi extends HdElement {
  constructor() {
    super();
    if (TeardropUi.instances.size === 0) {
      window.addEventListener('mousedown', TeardropUi.mouseUpHandler);
    }
    TeardropUi.instances.add(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    TeardropUi.instances.delete(this);
    if (TeardropUi.instances.size === 0) {
      window.removeEventListener('mousedown', TeardropUi.mouseUpHandler);
    }
  }
}

TeardropUi.styles = /*html*/ `
<style>
  :host {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: var(--border-radius-mid, 6px);
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
TeardropUi.instances = new Set();

TeardropUi.mouseUpHandler = function (e) {
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

export { TeardropUi };
