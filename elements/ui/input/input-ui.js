import {HdElementB} from '../../../core/hd-element-b.js';
import {IconMkp} from '../../mkp/icon/icon-mkp.js';

IconMkp.addIcons({
  'search': 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
  'cancel': 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  'usd': 'M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z',
  'gbp': 'M6,21V19C10,17 9.5,13 9.5,13H7V11H9.5C8.5,6.5 10,3 14,3C16,3 17,3.5 17,3.5V5.5C11,3.5 11,8 11.5,11H16V13H11.5C11.5,13 12,17 9.5,19H18V21H6Z',
  'jpy': 'M11,21V16H6V14H11V13.71L10.16,12H6V10H9.19L5.77,3H8L12,11.2L16,3H18.23L14.81,10H18V12H13.84L13,13.71V14H18V16H13V21H11Z',
  'cny': 'M11,21V16H6V14H11V13.71L10.16,12H6V10H9.19L5.77,3H8L12,11.2L16,3H18.23L14.81,10H18V12H13.84L13,13.71V14H18V16H13V21H11Z',
  'eur': 'M7.07,11L7,12L7.07,13H17.35L16.5,15H7.67C8.8,17.36 11.21,19 14,19C16.23,19 18.22,17.96 19.5,16.33V19.12C18,20.3 16.07,21 14,21C10.08,21 6.75,18.5 5.5,15H2L3,13H5.05L5,12L5.05,11H2L3,9H5.5C6.75,5.5 10.08,3 14,3C16.5,3 18.8,4.04 20.43,5.71L19.57,7.75C18.29,6.08 16.27,5 14,5C11.21,5 8.8,6.64 7.67,9H19.04L18.19,11H7.07Z',
  'btc': 'M6,4H8V2H10V4H12V2H14V4.03C16.25,4.28 18,6.18 18,8.5C18,9.8 17.45,11 16.56,11.8C17.73,12.61 18.5,13.97 18.5,15.5C18.5,18 16.5,20 14,20V22H12V20H10V22H8V20H6L6.5,18H8V6H6V4M10,13V18H14A2.5,2.5 0 0,0 16.5,15.5A2.5,2.5 0 0,0 14,13H10M10,6V11H13.5A2.5,2.5 0 0,0 16,8.5A2.5,2.5 0 0,0 13.5,6H13.5L10,6Z',
});

export class InputUi extends HdElementB {

  constructor() {
    super();

    this.state = {

      icon: '',

      actions: {

        clearClicked: (e) => {
          e.preventDefault();
          this[ 'input-el' ].focus();
          this[ 'input-el' ].value = '';
          this.setAttribute('value', '');
          this.notify('value', '');
        },

      },

    };

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('type', (val) => {
      this[ 'input-el' ].setAttribute('type', val);
    });

    this.defineAccessor('pattern', (val) => {
      this[ 'input-el' ].setAttribute('pattern', val);
    });

    this.defineAccessor('required', (val) => {
      if (this.hasAttribute('required')) {
        this[ 'input-el' ].setAttribute('required', '');
      } else {
        this[ 'input-el' ].removeAttribute('required');
      }
    });

    this.defineAccessor('currency', (val) => {
      if (this.hasAttribute('currency')) {
        this.setAttribute('type', 'number');
        if (!this.hasAttribute('min')) {
          this[ 'input-el' ].setAttribute('min', '0');
        }
        this[ 'input-el' ].setAttribute('step', '1');
        this.setAttribute('icon', val);
      }
    });

    this.defineAccessor('autocomplete', (val) => {
      this[ 'input-el' ].setAttribute('autocomplete', val);
    });

    this.defineAccessor('autofocus', (val) => {
      this[ 'input-el' ].setAttribute('autofocus', val);
    });

    this.defineAccessor('max', (val) => {
      this[ 'input-el' ].setAttribute('max', val);
    });

    this.defineAccessor('min', (val) => {
      this[ 'input-el' ].setAttribute('min', val);
    });

    this.defineAccessor('maxlength', (val) => {
      this[ 'input-el' ].setAttribute('maxlength', val);
    });

    this.defineAccessor('minlength', (val) => {
      this[ 'input-el' ].setAttribute('minlength', val);
    });

    this.defineAccessor('placeholder', (val) => {
      this[ 'input-el' ].setAttribute('placeholder', val);
    });

    this.defineAccessor('readonly', (val) => {
      this[ 'input-el' ].setAttribute('readonly', val);
    });

    this.defineAccessor('spellcheck', (val) => {
      this[ 'input-el' ].setAttribute('spellcheck', val);
    });

    this.defineAccessor('step', (val) => {
      this[ 'input-el' ].setAttribute('step', val);
    });

    this.defineAccessor('value', (val) => {
      this[ 'input-el' ].setAttribute('value', val);
      this[ 'input-el' ].value = val;
      this.setAttribute('value', val);
      this.notify('value', val);
    });

    this.defineAccessor('clear', (val) => {
      if (val) {
        this[ 'clear-btn' ].onclick = (e) => {
          e.preventDefault();
          this[ 'input-el' ].focus();
          this[ 'input-el' ].value = '';
          this.setAttribute('value', '');
          this.notify('value', '');
        };
      }
    });

  }

  _validate() {
    this.removeAttribute('invalid');
    if (this._inputTimeout) {
      window.clearTimeout(this._inputTimeout);
    }
    this._inputTimeout = window.setTimeout(() => {
      if (this[ 'input-el' ].validity.valid) {
        this.removeAttribute('invalid');
      } else {
        this.setAttribute('invalid', '');
      }
    }, 1000);
  }

  connectedCallback() {
    super.connectedCallback();
    this[ 'input-el' ].onfocus = (e) => {
      this.setAttribute('focused', '');
    };
    this[ 'input-el' ].onblur = (e) => {
      this.removeAttribute('focused');
      if (!this.hasAttribute('invalid')) {
        this._validate();
      }
    };
    this[ 'input-el' ].oninput = (e) => {
      let inputAction = () => {
        this._validate();
        this.value = this[ 'input-el' ].value;
        this.dispatchEvent(new Event(e));
      };
      if (this.hasAttribute('debounce')) {
        let dVal = Number(this.getAttribute('debounce')) * 1;
        this._debounceTimeout && window.clearTimeout(this._debounceTimeout);
        this._debounceTimeout = window.setTimeout(() => {
          inputAction();
        }, dVal || 200);
      } else {
        inputAction();
      }
    };
    this[ 'input-el' ].onchange = (e) => {
      this.dispatchEvent(new Event(e));
    };
    if (this.hasAttribute('value')) {
      this[ 'input-el' ].setAttribute('value', this.getAttribute('value'));
    }
  }

}

InputUi.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    position: relative;
    height: var(--tap-zone-size, 28px);
    min-width: 210px;
    line-height: var(--tap-zone-size, 28px);
    color: var(--color, currentColor);
    border-radius: var(--ui-radius, 2px);
    box-sizing: border-box;
    transition: var(--transition, 0.2s);
    font-size: var(--ui-font-size, 13px);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color, currentColor);
    opacity: var(--shade-opacity, 0.1);
    pointer-events: none;
    border-radius: var(--ui-radius, 2px);
    transition: var(--transition, 0.2s);
  }

  .underline {
    position: absolute;
    pointer-events: none;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 2px solid var(--color, currentColor);
    border-top: none;
    opacity: 0.4;
  }

  :host([grow]) {
    display: flex;
    flex-grow: 1;
  }

  :host([focused])::after {
    opacity: 0;
  }

  :host([focused]) .underline {
    opacity: 1;
    border-width: 2px;
  }

  :host([focused]) .shader {
    background-color: rgba(0, 0, 0, 0);
  }

  input {
    display: block;
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background: none;
    color: var(--color, currentColor);
    -webkit-appearance: none;
    font-size: var(--ui-font-size, 13px);
    line-height: calc(var(--tap-zone-size, 28px) - 1px);
    font-family: var(--font-base, inherit);
  }

  @media screen and (min-resolution: 144dpi) {
    input {
      font-weight: 300;
    }
  }

  icon-mkp#icon-el {
    display: none;
    margin-left: 0.5em;
    opacity: 0.6;
  }

  :host([focused]) icon-mkp#icon-el {
    opacity: 1;
  }

  :host([icon]) icon-mkp#icon-el {
    display: inline-flex;
  }

  :host([custom]) input::-webkit-inner-spin-button, :host([custom]) input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :host([custom]) input[type="number"] {
    -moz-appearance: textfield;
  }

  .clear {
    display: none;
    justify-content: center;
    align-items: center;
    width: var(--tap-zone-size, 28px);
    height: 100%;
    cursor: pointer;
    color: currentColor;
    transition: var(--transition, 0.2s);
  }

  :host([clear]) .clear {
    display: flex;
  }

  :host([value=""]) .clear {
    opacity: 0.2;
    pointer-events: none;
  }

  :host(:not([value])) .clear {
    opacity: 0.2;
    pointer-events: none;
  }

  .tooltip {
    display: block;
    position: absolute;
    bottom: 0;
    min-width: 100%;
    transform: translateY(calc(100% + 7px));
    background-color: var(--color, #000);
    color: var(--bg-color, #fff);
    z-index: 10000;
    padding: var(--gap-mid, 10px);
    border-radius: var(--ui-radius, 2px);
    line-height: 1.2em;
    box-sizing: border-box;
    box-shadow: 0 0 0 2px var(--bg-color, #fff);
    transition: 0.4s;
    opacity: 0;
    visibility: hidden;
  }

  .message {
    color: var(--bg-color, #fff);
    text-align: left;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    height: 10px;
    width: 10px;
    background-color: var(--color, #000);
    box-sizing: border-box;
    transform: rotate(45deg) translateY(-5px);
    transition: 0.4s;
  }

  :host(:empty) .tooltip {
    opacity: 0 !important;
    visibility: hidden !important;
  }

  :host([focused]) .tooltip {
    opacity: 1;
    visibility: visible;
  }

  .error {
    display: none;
    color: #fff;
  }

  :host([invalid]) {
    --color: var(--color-alert, #f00);
  }

  :host([invalid]) .error {
    display: block;
  }

  :host([invalid]) .tooltip {
    background-color: var(--color-alert, #f00);
  }

  :host([invalid]) .tooltip::after {
    background-color: var(--color-alert, #f00);
  }

  :host([invalid]) .message {
    display: none;
  }

  :host([disabled]) {
    filter: grayscale(1);
    opacity: 0.6;
    pointer-events: none;
  }

  ::placeholder {
    color: var(--color, currentColor);
    opacity: 0.4;
  }

  ::-webkit-input-placeholder {
    color: var(--color, currentColor);
    opacity: 0.4;
  }

  ::-moz-placeholder {
    color: var(--color, currentColor);
    opacity: 0.4;
  }

  ::-ms-input-placeholder {
    color: var(--color, currentColor);
    opacity: 0.4;
  }

  @media screen and (min-resolution: 144dpi) {
    ::placeholder {
      font-weight: 300;
    }

    ::-webkit-input-placeholder {
      font-weight: 300;
    }

    ::-moz-placeholder {
      font-weight: 300;
    }

    ::-ms-input-placeholder {
      font-weight: 300;
    }
  }
</style>
<icon-mkp bind="icon: icon" id="icon-el"></icon-mkp>
<input type="text" id="input-el">
<div class="clear" id="clear-btn" bind="onclick: actions.clearClicked">
  <icon-mkp icon="cancel"></icon-mkp>
</div>
<div class="underline"></div>
<div class="tooltip">
  <div class="message">
    <slot name="message"></slot>
  </div>
  <div class="error">
    <slot name="error"></slot>
  </div>
</div>
`;
InputUi.bindable = true;
InputUi.logicAttributes = [
  'icon',
  'type',
  'required',
  'pattern',
  'currency',
  'autocomplete',
  'autofocus',
  'max',
  'maxlength',
  'placeholder',
  'readonly',
  'spellcheck',
  'step',
  'clear',
];
InputUi.is = 'input-ui';

