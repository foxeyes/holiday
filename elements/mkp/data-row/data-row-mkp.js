import { HdElement } from '../../../core/hd-element.js';

import { IconMkp } from '../../mkp/icon/icon-mkp.js';

class DataRowMkp extends HdElement {

  constructor() {
    super();

    this.state = {
      icon: '',
      label: '',
      value: '',
      units: '',
    };

    this.defineAccessor('color-code', (val) => {
      this.style.setProperty('--color-code-local', val);
    });

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('label', (val) => {
      this.setStateProperty('label', val);
    });

    this.defineAccessor('value', (val) => {
      this.setStateProperty('value', val);
    });

    this.defineAccessor('units', (val) => {
      this.setStateProperty('units', val);
    });

  }

}

DataRowMkp.styles = /*html*/ `
<style>
  :host {
    --color-code-local: currentColor;
    display: flex;
    align-items: center;
    position: relative;
    height: var(--tap-zone-size, 32px);
    border-bottom: 1px dashed var(--color-shade, rgba(0, 0, 0, 0.2));
    max-width: var(--column-width, 960px);
  }
  :host(:last-of-type) {
    border-bottom: none;
  }
  #icon {
    color: var(--color-code-local);
    margin-right: var(--gap-mid, 10px);
  }
  :host(:not([icon])) #icon-el {
    display: none;
  }
  #label {
    opacity: 0.6;
  }
  #value {
    flex-grow: 1;
    text-align: right;
    white-space: nowrap;
  }
  #units {
    margin-left: var(--gap-mid, 10px);
  }
  :host(:not([units])) #units-el {
    display: none;
  }
</style>
`;
DataRowMkp.template = /*html*/ `
<icon-ui id="icon" bind="icon: icon"></icon-ui>
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
];
DataRowMkp.is = 'data-row-mkp';

export { DataRowMkp };