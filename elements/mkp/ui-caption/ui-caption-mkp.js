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

UiCaptionMkp.template = /*html*/ `
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
    padding-bottom: 0.4em;
    opacity: 0.6;
    font-size: 0.8em;
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