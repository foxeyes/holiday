import { HdElement } from '../../../core/hd-element.js';

import { } from '../icon/icon-mkp.js';

class UiCaptionMkp extends HdElement {

  constructor() {
    super();

    this.state = {
      icon: '',
      text: '',
    };

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('text', (val) => {
      this.setStateProperty('text', val);
    });

  }

}

UiCaptionMkp.styles = /*html*/ `
<style>
  :host {
    display: block;
    margin-top: var(--gap-max, 20px);
    background-color: inherit;
    color: inherit;
    font-size: var(--ui-font-size, 13px);
  }
  :host(:first-of-type) {
    margin-top: 0;
  }
  .caption-row {
    display: flex;
    align-items: center;
    padding-bottom: 0.2em;
    opacity: 0.8;
    font-size: 0.9em;
  }
  .caption-row icon-mkp {
    margin-right: 0.2em;
  }
  .txt {
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
  }
  :host([disabled]) {
    filter: grayscale(1);
    opacity: 0.4;
    pointer-events: none;
  }
  :host([compact]) {
    margin: 0;
  }
</style>
`;
UiCaptionMkp.template = /*html*/ `
<div class="caption-row">
  <icon-mkp bind="icon: icon"></icon-mkp>
  <div class="txt" bind="textContent: text"></div>
</div>
<slot></slot>
`;
UiCaptionMkp.logicAttributes = [
  'text',
  'icon',
];
UiCaptionMkp.is = 'ui-caption-mkp';

export { UiCaptionMkp };