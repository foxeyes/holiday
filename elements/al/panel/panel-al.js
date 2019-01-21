import { HdElement } from '../../../core/hd-element.js';

import { ButtonUi } from './../../ui/button/button-ui.js';
import { TeardropUi } from './../../ui/teardrop/teardrop-ui.js';

class PanelAl extends HdElement {

  connectedCallback() {
    super.connectedCallback();
    this[ 'close-btn' ].onclick = (e) => {
      this.active = false;
    };
    // this['pos-select'].onValueChange = (newVal) => {
    //   if (this._position === newVal) {
    //     return;
    //   }
    //   this._position = newVal;
    //   this.setAttribute('position', newVal);
    //   this.addEventListener('transitionend', (e) => {
    //     this['scroll-el'].resize();
    //   });
    // };
    this._position = this.getAttribute('position');
    // if (this._position) {
    //   this['pos-select'].value = this._position;
    // }

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

  set icon(name) {
    this[ 'icon-el' ].setAttribute('icon', name);
  }

  set caption(txt) {
    this[ 'caption-ip' ].textContent = txt;
  }

  set active(val) {
    this._active = val;
    if (val) {
      this.attr('active');
      if (PanelAl.current && PanelAl.current !== this) {
        PanelAl.current.active = false;
      }
      PanelAl.current = this;
    } else {
      this.attr('active', null);
    }
    this.notify('active', val);
  }

  get active() {
    return this._active;
  }

}

PanelAl.styles = /*html*/ `
<style>
  :host {
    --local-color: var(--bg-color, #fff);
    --local-bg-color: var(--color, #000);
    --local-content-padding: calc(var(--ui-height, 28px) + var(--gap-min, 2px));

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
    min-height: var(--ui-height, 28px);
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
    min-height: var(--ui-height, 28px);
    min-width: var(--ui-height, 28px);
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

  :host([position="bottom"]) #close-btn icon-ui {
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

  :host([position="left"]) #close-btn icon-ui {
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

  :host([position="top"]) #close-btn icon-ui {
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
`;
PanelAl.template = /*html*/ `
<div class="pan-header">
  <div class="cap-block">
    <icon-ui id="icon-el"></icon-ui>
    <div class="pan-caption" id="caption-ip"></div>
  </div>
  <button-ui icon="drag" id="drag-el" rounded outline></button-ui>
  <!-- <select-ui id="pos-select">
    <div icon="arrow-right" option="right">Right</div>
    <div icon="arrow-down" option="bottom">Bottom</div>
    <div icon="arrow-left" option="left">Left</div>
    <div icon="arrow-up" option="top">Top</div>
  </select-ui> -->
</div>
<div class="content">
  <slot></slot>
</div>
<div id="close-btn">
  <icon-ui icon="chevron-right"></icon-ui>
  <teardrop-ui></teardrop-ui>
</div>
`;
PanelAl.logicAttributes = [
  'icon',
  'caption',
];
PanelAl.bindable = true;
PanelAl.current = null;
PanelAl.is = 'panel-lay';

export { PanelAl };