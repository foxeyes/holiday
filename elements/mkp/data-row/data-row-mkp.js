import {HdElement} from '../../../core/hd-element.js';
import { } from '../../mkp/icon/icon-mkp.js';

export class DataRowMkp extends HdElement {

  constructor() {
    super();

    let formaters = {
      money: (val) => {
        let options = {
          minimumFractionDigits: 2,
          useGrouping: true,
          localeMatcher: 'best fit',
        };
        let currency = this.getAttribute('currency-code');
        if (currency) {
          options.style = 'currency';
          options.currency = currency;
        }
        let locale;
        if (this.getAttribute('locale')) {
          locale = this.getAttribute('locale');
        }
        let fmt = new Intl.NumberFormat(locale, options);
        return fmt.format(val);
      }
    };

    this.state = {
      format: '',
      icon: '',
      label: '',
      value: '',
      units: '',
    };

    this._styleSheet = this['style-el'].sheet;

    this.defineAccessor('color-code', (val) => {
      // this._styleSheet.insertRule(`:host {--color-code-local: ${val}}`);
      this.style.setProperty('--color-code-local', val);
    });

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('label', (val) => {
      this.setStateProperty('label', val);
    });

    this.defineAccessor('value', (val) => {
      if (this.state.format && formaters[ this.state.format ]) {
        this.setStateProperty('value', formaters[ this.state.format ](val));
      } else {
        this.setStateProperty('value', val);
      }
    });

    this.defineAccessor('units', (val) => {
      this.setStateProperty('units', val);
    });

    this.defineAccessor('format', (val) => {
      this.setStateProperty('format', val);
      if (this.state.value !== undefined && formaters[ val ]) {
        this.setStateProperty('value', formaters[ val ](this.state.value));
      }
    });

  }

}

DataRowMkp.template = /*html*/ `
<style id="style-el">
  :host {
    display: flex;
    align-items: center;
    position: relative;
    height: var(--tap-zone-size, 32px);
    border-bottom: 1px dashed var(--color-shade, currentColor);
  }
  :host(:last-of-type) {
    border-bottom: none;
  }
  #icon {
    color: var(--color-code-local, currentColor);
    margin-right: var(--gap-mid, 10px);
  }
  :host(:not([icon])) #icon {
    display: none;
  }
  #label {
    opacity: 0.6;
    white-space: nowrap;
  }
  #value {
    flex-grow: 1;
    text-align: right;
    white-space: nowrap;
  }
  #units {
    margin-left: var(--gap-mid, 10px);
  }
  :host(:not([units])) #units {
    display: none;
  }
</style>
<icon-mkp id="icon" bind="icon: icon"></icon-mkp>
<div id="label" bind="textContent: label"></div>
<div id="value" bind="textContent: value"></div>
<div id="units" bind="textContent: units"></div>
`;
DataRowMkp.logicAttributes = [
  'color-code',
  'label',
  'value',
  'icon',
  'units',
  'format',
];
DataRowMkp.is = 'data-row-mkp';
