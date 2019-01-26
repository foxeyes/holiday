import { HdElement } from '../../../core/hd-element.js';

import { IconMkp } from '../../mkp/icon/icon-mkp.js';
IconMkp.addIcons({
  'close': 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
});

class OverlayAl extends HdElement {

  constructor() {
    super();
    this.state = {

      active: false,
      caption: '',
      icon: '',

      actions: {
        closeClicked: (e) => {
          this.active = false;
        },
      },

    };

    this.defineAccessor('active', (val) => {
      if (val === true) {
        this.setAttribute('active', '');
      } else if (val === false) {
        this.removeAttribute('active');
      }
      this.setStateProperty('active', val);
    });

    this.defineAccessor('caption', (val) => {
      this.setStateProperty('caption', val);
    });

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('color-code', (val) => {
      this.style.setProperty('--color-code-local', val);
    });

  }

}

OverlayAl.styles = /*html*/ `
<style>
  ::-webkit-scrollbar { 
    display: none; 
  }
  
  :host {
    --color-code-local: currentColor;
    --side-step: 50px;

    position: absolute;
    top: var(--side-step);
    bottom: var(--side-step);

    display: grid;
    grid-template-rows: var(--tap-zone-size, 32px) auto;
    background-color: var(--bg-color, #fff);
    color: var(--color, #000);
    z-index: 100000;
    border-radius: var(--radius, 4px);
    overflow: hidden;
    box-shadow: 0 0 var(--side-step) var(--color, #000);
    will-change: opacity transform;
    transition: var(--transition, 0.2s);

    width: 100%;
    max-width: var(--column-width, 960px);
    left: 50%;
    transform: translateX(-50%);
  }

  :host(:not([active])) {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.9) translateX(-50%);
  }

  .heading {
    display: grid;
    grid-template-columns: var(--tap-zone-size, 32px) auto var(--tap-zone-size, 32px);
    border-bottom: var(--gap-min, 2px) solid currentColor;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-code-local);
  }
  .caption {
    display: flex;
    align-items: center;
    user-select: none;
    color: var(--color-code-local);
  }
  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--bg-color, #fff);
    background-color: var(--color, #000);
    opacity: 0.8;
    transition: var(--transition, 0.2s);
  }
  .close:hover {
    opacity: 1;
  }
  .content {
    overflow: auto;
  }
</style>
`;
OverlayAl.template = /*html*/ `
<div class="heading">
  <div class="icon">
    <icon-mkp bind="icon: icon"></icon-mkp>
  </div>
  <div class="caption" bind="textContent: caption"></div>
  <div class="close" bind="onclick: actions.closeClicked">
    <icon-mkp icon="close"></icon-mkp>
  </div>
</div>
<div class="content">
  <slot></slot>  
</div>
`;
OverlayAl.logicAttributes = [
  'active',
  'caption',
  'icon',
  'color-code',
];
OverlayAl.is = 'overlay-al';

export { OverlayAl };