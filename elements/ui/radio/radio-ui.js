import { HdElement } from '../../../core/hd-element.js';

class RadioUi extends HdElement {

  constructor() {
    super();

    this.defineAccessor('name', (name) => {
      this._name = name;
      if (!RadioUi.reg[ name ]) {
        RadioUi.reg[ name ] = [];
      }
      RadioUi.reg[ name ].push(this);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.onclick = (e) => {
      this.attr('checked');
      if (RadioUi.reg[ this._name ]) {
        RadioUi.reg[ this._name ].forEach((inst) => {
          if (inst !== this) {
            inst.attr('checked', null);
          }
        });
      }
    };
  }

}

RadioUi.styles = /*html*/ `
<style>
  :host {
    display: inline-flex;
    align-items: center;
    height: var(--tap-zone-size, 32px);
    cursor: pointer;
    font-size: var(--ui-font-size, 18px);
  }

  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--tap-zone-size, 32px);
    width: var(--tap-zone-size, 32px);
    border: var(--gap-min, 2px) solid currentColor;
    border-radius: var(--radius, 4px);
    box-sizing: border-box;
    margin-right: 0.5em;
  }

  .radio-inner {
    --inner-size: calc(var(--tap-zone-size, 32px) / 4);
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
`;
RadioUi.template = /*html*/ `
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
RadioUi.reg = {};

export { RadioUi };