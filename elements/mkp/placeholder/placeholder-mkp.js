import { HdElement } from '../../../core/hd-element.js';

export class PlaceholderMkp extends HdElement {}

PlaceholderMkp.template = /*html*/ `
<style>
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed currentColor;
    opacity: 0.6;
    padding: var(--gap-min, 2px);
    min-height: var(--tap-zone-size, 28px);
    box-sizing: border-box;
  }
  :host([inline]) {
    display: inline-flex;
  }
  :host(:hover) {
    opacity: 1;
  }
</style>
<slot></slot>
`;

PlaceholderMkp.is = 'placeholder-mkp';