import { HdElement } from '../../../core/hd-element.js';

import { ButtonUi } from '../../ui/button/button-ui.js';
import { TeardropUi } from '../../ui/teardrop/teardrop-ui.js';
import { IconMkp } from '../../mkp/icon/icon-mkp.js';

IconMkp.addIcons({
  'chevron-right': 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
  'drag': 'M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z',
});

class PanelAl extends HdElement {

  constructor() {
    super();

    this.defineAccessor('icon', (val) => {
      this[ 'icon-el' ].icon = val;
    });

    this.defineAccessor('caption', (val) => {
      this[ 'caption-ip' ].textContent = val;
    });

    this.defineAccessor('active', (val) => {
      if (val) {
        this.setAttribute('active', '');
        if (PanelAl.current && PanelAl.current !== this) {
          PanelAl.current.active = false;
        }
        PanelAl.current = this;
      } else {
        this.removeAttribute('active');
      }
      this.notify('active', val);
    });

    this.defineAccessor('position', (val) => {
      this._position = val;
    });

  }

  connectedCallback() {

    super.connectedCallback();
    this[ 'close-btn' ].onclick = (e) => {
      this.active = false;
    };

    this._onDragStart = (e) => {
      window.addEventListener('mouseup', this._onDragEnd);
      window.addEventListener('mousemove', this._onDrag);
      this._screen = {
        h: window.screen.height,
        w: window.screen.width,
      };
    };

    this._onDragEnd = (e) => {
      e.preventDefault();
      window.removeEventListener('mouseup', this._onDragEnd);
      window.removeEventListener('mousemove', this._onDrag);
      this[ 'drag-el' ].removeAttribute('move', '');
      this[ 'drag-el' ].setAttribute('outline', '');
      this[ 'drag-el' ].style.top = 'unset';
      this[ 'drag-el' ].style.left = 'unset';
    };

    this._onDrag = (e) => {
      e.preventDefault();
      this[ 'drag-el' ].setAttribute('move', '');
      this[ 'drag-el' ].removeAttribute('outline');
      this[ 'drag-el' ].style.top = e.y + 'px';
      this[ 'drag-el' ].style.left = e.x + 'px';
      if (e.x > this._screen.w * 0.66) {
        this.setAttribute('position', 'right');
      } else if (e.x < this._screen.w * 0.33) {
        this.setAttribute('position', 'left');
      } else if (e.x > this._screen.w * 0.33 && e.x < this._screen.w * 0.66 && e.y < this._screen.h * 0.4) {
        this.setAttribute('position', 'top');
      } else if (e.x > this._screen.w * 0.33 && e.x < this._screen.w * 0.66 && e.y > this._screen.h * 0.6) {
        this.setAttribute('position', 'bottom');
      }
    };

    this[ 'drag-el' ].addEventListener('mousedown', this._onDragStart);
  }

}

PanelAl.template = /*html*/ `
<style>
  :host {
    --local-color: var(--bg-color, #fff);
    --local-bg-color: var(--color, #000);
    --local-content-padding: calc(var(--tap-zone-size, 32px) + var(--gap-min, 2px));

    display: grid;
    grid-template-rows: min-content auto;
    grid-gap: var(--gap-min, 2px);
    position: fixed;
    background-color: var(--local-bg-color);
    color: var(--local-color);
    z-index: 100000;
    transition: var(--transition, 0.2s);
    background-clip: padding-box;
    box-sizing: border-box;
    min-width: var(--panel-width, 380px);
    min-height: 340px;
    opacity: 0;
    visibility: hidden;
  }

  :host([active]) {
    opacity: 1;
    visibility: visible;
    transform: none !important;
  }

  .pan-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: 10px;
  }

  .cap-block {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 0.4em;
    min-height: var(--tap-zone-size, 32px);
  }

  .pan-caption {
    padding-left: 0.4em;
    padding-right: 0.4em;
    white-space: nowrap;
  }

  #close-btn {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    min-height: var(--tap-zone-size, 32px);
    min-width: var(--tap-zone-size, 32px);
    cursor: pointer;
  }

  #close-btn::after {
    content: '';
    position: absolute;
    background-color: currentColor;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: var(--shade-opacity, 0.2);
    pointer-events: none;
  }

  :host([position="right"]) {
    right: 0;
    top: 0;
    bottom: 0;
    max-width: var(--panel-width, 380px);
    border-left: 6px solid rgba(0, 0, 0, var(--shade-opacity, 0.2));
    transform: translateX(100px);
    padding-left: var(--local-content-padding);
  }

  :host([position="right"]) #close-btn {
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--ui-width, 28px);
  }

  :host([position="bottom"]) {
    right: 0;
    left: 0;
    bottom: 0;
    max-height: 40vh;
    border-top: 6px solid rgba(0, 0, 0, var(--shade-opacity, 0.2));
    transform: translateY(100px);
    padding-top: var(--local-content-padding);
  }

  :host([position="bottom"]) #close-btn {
    left: 0;
    right: 0;
    top: 0;
    height: var(--ui-width, 28px);
  }

  :host([position="bottom"]) #close-btn icon-mkp {
    transform: rotate(90deg);
  }

  :host([position="left"]) {
    top: 0;
    left: 0;
    bottom: 0;
    max-width: var(--panel-width, 380px);
    border-right: 6px solid rgba(0, 0, 0, var(--shade-opacity, 0.2));
    transform: translateX(-100px);
    padding-right: var(--local-content-padding);
  }

  :host([position="left"]) #close-btn {
    bottom: 0;
    right: 0;
    top: 0;
    width: var(--ui-width, 28px);
  }

  :host([position="left"]) #close-btn icon-mkp {
    transform: rotate(180deg);
  }

  :host([position="top"]) {
    top: 0;
    left: 0;
    right: 0;
    max-height: 40vh;
    border-bottom: 6px solid rgba(0, 0, 0, var(--shade-opacity, 0.2));
    transform: translateY(-100px);
    padding-bottom: var(--local-content-padding);
  }

  :host([position="top"]) #close-btn {
    bottom: 0;
    right: 0;
    left: 0;
    height: var(--ui-width, 28px);
  }

  :host([position="top"]) #close-btn icon-mkp {
    transform: rotate(-90deg);
  }

  select-ui {
    --bg-color: var(--local-bg-color);
    --color: var(--local-color);
  }

  .content {
    position: relative;
    --bg-color: var(--local-bg-color);
    --color: var(--local-color);
  }

  #drag-el {
    cursor: move;
    --bg-color: var(--local-bg-color);
    --color: var(--local-color);
    transition: none;
  }

  #drag-el[move] {
    position: fixed;
    z-index: 10000;
    transform: translate(-50%, -50%);
  }
</style>
<div class="pan-header">
  <div class="cap-block">
    <icon-mkp id="icon-el"></icon-mkp>
    <div class="pan-caption" id="caption-ip"></div>
  </div>
  <button-ui icon="drag" id="drag-el" rounded outline></button-ui>
</div>
<div class="content">
  <slot></slot>
</div>
<div id="close-btn">
  <icon-mkp icon="chevron-right"></icon-mkp>
  <teardrop-ui></teardrop-ui>
</div>
`;
PanelAl.logicAttributes = [
  'icon',
  'caption',
  'position',
];
PanelAl.bindable = true;
PanelAl.current = null;
PanelAl.is = 'panel-al';

export { PanelAl };