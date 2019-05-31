import { HdElement } from '../../../core/hd-element.js';

class ColumnMkp extends HdElement {

  constructor() {
    super();

    this.defineAccessor('width', (val) => {
      this.style.setProperty('--local-width', val + 'px');
    });
  }

}

ColumnMkp.template = /*html*/ `
<style>
  :host {
    --local-width: 960px;
    display: flex;
    justify-content: center;
  }
  .column {
    width: 100%;
    max-width: var(--local-width);
  }
</style>
<div class="column">
  <slot></slot>
</div>
`;
ColumnMkp.is = 'column-mkp';
ColumnMkp.logicAttributes = [
  'width',
];

export { ColumnMkp };