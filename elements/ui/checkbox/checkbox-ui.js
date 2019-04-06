import { HdElement } from '../../../core/hd-element.js';

class CheckboxUi extends HdElement {

  constructor() {
    super();

    this.defineAccessor('checked', (val) => {
      if (val) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    });

    this.defineAccessor('value', (val) => {
      this.checked = val;
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.onclick = (e) => {
      this.checked = !this.checked;
      this.notify('value', !!this.checked);
    };
    
  }

}

CheckboxUi.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    display: inline-flex;
    align-items: center;
    height: var(--tap-zone-size, 32px);
    min-width: var(--tap-zone-size, 32px);
    cursor: pointer;
    font-size: var(--ui-font-size, 18px);
    position: relative;
    border-radius: var(--radius, 4px);
    padding-left: calc((var(--tap-zone-size, 32px) - 20px) / 2);
    padding-right: var(--ui-side-padding, 0.6em);
    user-select: none;
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
    border-radius: var(--radius, 2px);
  }

  :host(:empty) {
    padding: 0;
    justify-content: center;
  }

  :host(:empty) .box {
    margin: 0;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border: var(--line-width, 1px) solid var(--color, currentColor);
    border-radius: 2px;
    box-sizing: border-box;
    margin-right: 0.5em;
  }

  .box-inner {
    display: none;
    height: 10px;
    width: 10px;
    background-color: var(--color, currentColor);
    border-radius: 1px;
  }

  :host([checked]) .box-inner {
    display: block;
  }

  :host([grow]) {
    display: flex;
    flex-grow: 1;
  }
</style>
<div class="box">
  <div class="box-inner"></div>
</div>
<div class="txt">
  <slot></slot> 
</div>
`;

CheckboxUi.is = 'checkbox-ui';

export { CheckboxUi };