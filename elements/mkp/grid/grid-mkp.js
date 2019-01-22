import { HdElement } from '../../../core/hd-element.js';

class GridMkp extends HdElement {

  constructor() {
    super();

    this.defineAccessor('gap', (val) => {
      let gapMap = {
        min: 'var(--gap-min)',
        mid: 'var(--gap-mid)',
        max: 'var(--gap-max)',
      };
      this[ 'style-el' ].sheet.insertRule(`:host {grid-gap: ${gapMap[val] || val}}`);
    });

    this.defineAccessor('columns', (val) => {
      this[ 'style-el' ].sheet.insertRule(`:host {grid-template-columns: ${val}}`);
    });

    this.defineAccessor('rows', (val) => {
      this[ 'style-el' ].sheet.insertRule(`:host {grid-template-rows: ${val}}`);
    });

  }

}

GridMkp.styles = /*html*/ `
<style id="style-el">
  :host {
    display: grid;
  }
</style>
`;
GridMkp.template = /*html*/ `<slot></slot>`;
GridMkp.logicAttributes = [
  'gap',
  'columns',
  'rows',
];

GridMkp.is = 'grid-mkp';

export { GridMkp };