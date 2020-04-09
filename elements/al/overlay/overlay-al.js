import {HdElement} from '../../../core/hd-element.js';
import {IconMkp} from '../../mkp/icon/icon-mkp.js';
import { } from '../../ui/button/button-ui.js';

IconMkp.addIcons({
  'close': 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
});

export class OverlayAl extends HdElement {

  /**
   * @param {Boolean} val
   */
  set _active(val) {
    if (val) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      OverlayAl.instances.forEach((inst) => {
        if (inst !== this) {
          inst.removeAttribute('active');
        }
      });
    } else {
      this['content-el'].scrollTop = 0;
      let styleTxt = document.body.getAttribute('style');
      if (styleTxt && styleTxt.trim()) {
        styleTxt = styleTxt.replace('height: 100vh;', '').replace('overflow: hidden;', '');
        document.body.setAttribute('style', styleTxt.trim());
      } else {
        document.body.removeAttribute('style');
      }
      if (this.onClose && this.onClose.constructor === Function) {
        this.onClose();
      }
    }
  }

  constructor() {
    super();
    this.state = {
      caption: '',
      icon: '',
      on: {
        closeClicked: () => {
          this.removeAttribute('active');
        },
      },
    };

    this.onClose = null;

    this.defineAccessor('active', (val) => {
      if (this.hasAttribute('active')) {
        this._active = true;
      } else {
        if (val === true) {
          this.setAttribute('active', '');
        } else {
          this._active = false;
        }
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
    border-radius: var(--ui-radius, 4px);
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
<div class="content-wrapper" id="content-el">
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
