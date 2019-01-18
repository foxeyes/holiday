import { HdElement } from '../../../core/hd-element.js';

import { } from '../icon/icon-mkp.js';

class CaptionMkp extends HdElement {

  set icon(name) {
    this[ 'icon-el' ].setAttribute('icon', name);
  }

}

CaptionMkp.styles = /*html*/ `
<style>
  :host {
    display: flex;
    align-items: center;
    font-size: 1.2em;
  }
  :host([underline]) {
    border-bottom: 1px solid currentColor;
    padding-bottom: var(--gap-mid, 10px);
  }
  :host([sub]) {
    font-size: 1.2em;
    opacity: 0.8;
  }
  icon-mkp {
    margin-right: var(--gap-mid, 10px);
  }
</style>
`;
CaptionMkp.template = /*html*/ `
<icon-mkp id="icon-el"></icon-mkp>
<div><slot></slot></div>
`;
CaptionMkp.logicAttributes = [
  'icon',
];
CaptionMkp.is = 'caption-mkp';

export { CaptionMkp };