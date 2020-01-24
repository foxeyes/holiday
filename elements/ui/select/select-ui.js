import {HdElementB} from '../../../core/hd-element-b.js';
import {IconMkp} from '../../mkp/icon/icon-mkp.js';

IconMkp.addIcons({
  'menu-down': 'M7,10L12,15L17,10H7Z',
});

export class SelectUi extends HdElementB {

  constructor() {
    super();

    this.state = {
      curText: '',
      curIcon: '',
    };

    this._event = new Event('change');

    this.defineAccessor('active', (val) => {
      if (val === this._active) {
        return;
      }
      this._active = val;
      this._clickOutsideHandler = (e) => {
        let path = e.path || (e.composedPath && e.composedPath());
        if (!path) {
          path = [];
          let el = e.target;
          while (el) {
            path.push(el);
            el = el.parentElement;
          }
        }
        if (path.includes(this)) {
          return;
        }
        this.active = false;
        window.removeEventListener('click', this._clickOutsideHandler);
      };
      if (val) {
        this.setAttribute('active', '');
        SelectUi.instances.forEach((inst) => {
          if (inst !== this) {
            inst.active = false;
          }
        });
        window.setTimeout(() => {
          window.addEventListener('click', this._clickOutsideHandler);
        });
      } else {
        this.removeAttribute('active');
      }
    });

  }

  _handleValue() {
    this._optArr.forEach((opt) => {
      let optVal = opt.getAttribute('option');
      let optIcon = opt.getAttribute('icon');
      if (this.value && this.value === optVal) {
        this.setStateProperty({
          curIcon: optIcon,
          curText: opt.textContent,
        });
      }
    });
  }

  update() {
    this._optArr.forEach((opt) => {
      let optVal = opt.getAttribute('option');
      let optIcon = opt.getAttribute('icon');
      if (optIcon && !opt['hasIcon']) {
        let icon = document.createElement('icon-mkp');
        icon.setAttribute('icon', optIcon);
        icon.style.marginRight = '0.5em';
        opt['prepend'](icon);
        opt['hasIcon'] = true;
      }
      opt.addEventListener('click', (e) => {
        this.setStateProperty({
          curIcon: optIcon,
          curText: opt.textContent,
        });
        this.value = optVal;
      });
    });
    if (!this.value && this._optArr[0]) {
      let icon = this._optArr[0].getAttribute('icon');
      this.setStateProperty({
        curIcon: icon,
        curText: this._optArr[0].textContent,
      });
    } else {
      this._handleValue();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    SelectUi.instances.add(this);
    this.tabIndex = 0;
    this.onclick = () => {
      this.active = !this.active;
    };
    this._optArr = [...this.querySelectorAll('[option]')];
    this.update();

    this.defineAccessor('value', (val) => {
      if (this.getAttribute('value') !== val) {
        this.setAttribute('value', val);
        return;
      }
      if (this._notifyTimeout) {
        window.clearTimeout(this._notifyTimeout);
      }
      this._notifyTimeout = window.setTimeout(() => {
        this.dispatchEvent(this._event);
        this.notify('value', val);
        this._handleValue();
      });
    });
  }

  disconnectedCallback() {
    SelectUi.instances.delete(this);
  }

}

SelectUi.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: transparent;
    position: relative;
    display: inline-flex;
    font-size: var(--ui-font-size, 13px);
    cursor: pointer;
    outline: none;
  }

  .state {
    display: inline-flex;
    position: relative;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    height: var(--tap-zone-size, 28px);
    padding-left: 0.5em;
    padding-right: calc(0.5em + 24px);
    box-sizing: border-box;
    border-radius: var(--ui-radius, 2px);
    color: var(--color, currentColor);
    user-select: none;
    overflow: hidden;
  }

  .state icon-mkp {
    margin-right: 0.5em;
  }

  .state::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--color, currentColor);
    border-radius: var(--ui-radius, 2px);
    opacity: var(--shade-opacity, 0.2);
    pointer-events: none;
    transition: var(--transition, 0.2s);
  }
  .state:hover::after {
    opacity: 1;
  }
  :host([active]) .state::after {
    opacity: 1;
  }

  .menu-icon {
    position: absolute;
    right: 5px;
    top: calc(50% - 12px);
    transform-origin: center center;
    transition: var(--transition, 0.2s);
    height: 24px;
    width: 24px;
    color: var(--color, currentColor);
  }

  .options {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    pointer-events: none;
    opacity: 0;
    transition: var(--transition, 0.2s);
    border-radius: var(--ui-radius, 2px);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    z-index: 100000;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0 0 0 2px var(--bg-color, #fff);
    background-color: var(--bg-color, #fff);
    min-width: 100%;
  }

  :host([active]) .options {
    pointer-events: auto;
    opacity: 1;
  }

  :host([unfold-up]) .options {
    transform: translateY(-100%);
    bottom: unset;
    top: 0;
  }

  ::slotted(:not([option])) {
    display: none;
  }
  ::slotted([option]) {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--tap-zone-size, 28px);
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: pointer;
    white-space: nowrap;
    background-color: var(--color, #000);
    color: var(--bg-color, #fff);
    user-select: none;
    box-sizing: border-box;
    transition: var(--transition, 0.2s);
  }
  ::slotted([option]:hover)::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color, #fff);
    opacity: 0.1;
    pointer-events: none;
  }

  :host([active]) .menu-icon {
    transform: rotate(180deg);
  }

  :host([grow]) {
    display: flex;
    flex-grow: 1;
  }

  :host([grow]) .state {
    display: flex;
    flex-grow: 1;
  }
</style>
<div class="state" >
  <icon-mkp bind="icon: curIcon"></icon-mkp>
  <div bind="textContent: curText"></div>
</div>
<icon-mkp icon="menu-down" class="menu-icon"></icon-mkp>
<div class="options">
  <slot></slot>
</div>
`;
SelectUi.logicAttributes = [
  'value',
];
SelectUi.bindable = true;
SelectUi.instances = new Set();
SelectUi.is = 'select-ui';

