import {HdElement} from '../../../core/hd-element.js';
import { } from '../icon/icon-mkp.js';

export class CaptionMkp extends HdElement {

  set icon(name) {
    this[ 'icon-el' ].setAttribute('icon', name);
  }

}

CaptionMkp.template = /*html*/ `
<style>
  :host {
    display: flex;
    align-items: flex-start;
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
<icon-mkp id="icon-el"></icon-mkp>
<div><slot></slot></div>
`;
CaptionMkp.logicAttributes = [
  'icon',
];
CaptionMkp.is = 'caption-mkp';
