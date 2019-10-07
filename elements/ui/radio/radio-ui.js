import { HdElement } from '../../../core/hd-element.js';

const RADIO_REG = Object.create(null);

class RadioUi extends HdElement {

  constructor() {
    super();

    this.defineAccessor('name', (name) => {
      if (!RADIO_REG[ name ]) {
        RADIO_REG[ name ] = [];
      }
      RADIO_REG[ name ].push(this);
    });

    this.onValueChange = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.onclick = (e) => {
      this.setAttribute('checked', '');
      this.notify('checked', true);
      this.notify('value', true);
      if (RADIO_REG[ this['name'] ]) {
        RADIO_REG[ this['name'] ].forEach((/** @type {RadioUi}*/ inst) => {
          if (inst !== this) {
            inst.removeAttribute('checked');
            inst.notify('checked', false);
            inst.notify('value', false);
          }
        });
      }
    };
  }

}

RadioUi.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    height: var(--tap-zone-size, 28px);
    cursor: pointer;
    font-size: var(--ui-font-size, 18px);
  }

  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--tap-zone-size, 28px);
    width: var(--tap-zone-size, 28px);
    border: var(--gap-min, 2px) solid currentColor;
    border-radius: var(--radius, 2px);
    box-sizing: border-box;
    margin-right: 0.5em;
  }

  .radio-inner {
    --inner-size: calc(var(--tap-zone-size, 28px) / 4);
    display: none;
    height: var(--inner-size);
    width: var(--inner-size);
    background-color: currentColor;
    border-radius: 100%;
    box-shadow: 0 0 4px currentColor;
  }

  :host([checked]) .radio-inner {
    display: block;
  }

  :host([grow]) {
    display: flex;
    flex-grow: 1;
  }
</style>
<div class="radio">
  <div class="radio-inner"></div>
</div>
<div class="txt">
  <slot></slot> 
</div>
`;
RadioUi.logicAttributes = [
  'name',
];
RadioUi.is = 'radio-ui';

export { RadioUi };