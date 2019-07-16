import { HdElement } from '../../../core/hd-element.js';

import { } from '../../ui/button/button-ui.js';
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

      on: {
        closeClicked: () => {
          this.active = false;
        },
      },

    };

    this.defineAccessor('active', (val) => {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.ontouchmove = (e) => {
        e.preventDefault();
      };

      if (val === true) {
        this.setAttribute('active', '');
      } else if (val === false) {
        this.removeAttribute('active');
        let styleTxt = document.body.getAttribute('style');
        styleTxt = styleTxt.replace('height: 100%;', '').replace('overflow: hidden;', '');
        if (styleTxt.trim()) {
          document.body.setAttribute('style', styleTxt.trim());
        } else {
          document.body.removeAttribute('style');
        }
        document.body.ontouchmove = undefined;
      }
      this.setStateProperty('active', val);
      if (this.hasAttribute('active')) {
        OverlayAl.instances.forEach((inst) => {
          if (inst !== this) {
            inst.removeAttribute('active');
          }
        });
      }
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

    OverlayAl.instances.add(this);

  }

}

OverlayAl.template = /*html*/ `
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
    display: block;
    background-color: var(--bg-color, #fff);
    color: var(--color, #000);
    z-index: 1000000;
    border-radius: var(--radius, 4px);
    box-shadow: 0 0 var(--side-step) var(--color, #000);
    will-change: opacity;
    transition: opacity 0.4s;
    width: 100%;
    max-width: var(--column-width, 960px);
    left: 50%;
    transform: translateX(-50%);
  }

  :host(:not([active])) {
    opacity: 0;
    visibility: hidden;
  }

  .heading {
    display: grid;
    grid-template-columns: var(--tap-zone-size, 32px) auto var(--tap-zone-size, 32px);
    padding: var(--gap-mid, 10px);
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
    font-size: 1.2em;
  }
  .content-wrapper {
    position: absolute;
    top: calc(var(--tap-zone-size, 32px) + var(--gap-mid, 10px) * 2);
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  @media screen and (max-width: 800px) {
    :host {
      --side-step: 0;
      border-radius: 0;
    }
  }
}
</style>
<div class="heading">
  <div class="icon">
    <icon-mkp bind="icon: icon"></icon-mkp>
  </div>
  <div class="caption" bind="textContent: caption"></div>
  <button-ui rounded icon="close" bind="onclick: on.closeClicked"></button-ui>
</div>
<div class="content-wrapper">
  <slot></slot>
</div>
`;
OverlayAl.logicAttributes = [
  'active',
  'caption',
  'icon',
  'color-code',
];
OverlayAl.instances = new Set();
OverlayAl.is = 'overlay-al';

export { OverlayAl };