import { HdElement } from '../../../core/hd-element.js';

import { } from '../../mkp/icon/icon-mkp.js';
import { } from '../teardrop/teardrop-ui.js';

class ButtonUi extends HdElement {

  constructor() {
    super();

    this.state = {
      icon: '',
    };

    this.defineAccessor('icon', (icon) => {
      this.setStateProperty('icon', icon);
    });
    
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
  }

}

ButtonUi.styles = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    display: inline-flex;
    align-items: center;
    background-color: var(--color, #000);
    color: var(--bg-color, #fff);
    height: var(--tap-zone-size, 28px);
    min-height: var(--tap-zone-size, 28px);
    min-width: var(--tap-zone-size, 28px);
    border-radius: var(--ui-radius, 2px);
    font-size: var(--ui-font-size, 13px);
    padding-left: var(--ui-side-padding, 0.8em);
    padding-right: var(--ui-side-padding, 0.8em);
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    outline: none;
  }

  :host(:focus) {
    outline-color: var(--color, #000);
    outline-style: dotted;
    outline-width: var(--gap-min, 2px);
    outline-offset: var(--gap-min, 2px);
  }

  :host(:not([icon])) icon-mkp {
    display: none;
  }

  icon-mkp {
    margin-right: 0.5em;
  }

  :host(:empty) {
    padding: 0;
    font-size: calc(var(--ui-font-size, 13px) + 2px) !important;
  }

  :host(:empty) icon-mkp {
    margin: 0;
  }

  :host([disabled]) {
    /* filter: grayscale(1); */
    opacity: 0.2;
    pointer-events: none;
    outline: none;
  }

  :host([outline]) {
    background: none;
    color: var(--color, #000);
    /* border: var(--line-width, 1px) solid var(--color, currentColor); */
  }

  :host([outline])::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--ui-radius, 2px);
    border: var(--line-width, 1px) solid var(--color, currentColor);
    opacity: var(--shade-opacity, 0.2);
    pointer-events: none;
    transition: var(--transition, 0.2s);
  }
  :host([outline]:hover)::after {
    opacity: 1;
  }

  :host([grow]) {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  :host([shade]) {
    background-color: transparent;
    color: var(--color, #000);
  }

  :host([shade])::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--ui-radius, 2px);
    pointer-events: none;
    background-color: var(--color, #000);
    opacity: var(--shade-opacity, 0.1);
  }

  :host([rounded]) {
    border-radius: 100%;
    overflow: hidden;
    font-size: calc(var(--ui-font-size, 13px) + 2px);
  }

  :host([rounded])::after {
    border-radius: 100%;
  }

  :host([arrow]) {
    border-radius: 0;
    padding-left: calc(var(--gap-mid) / 2);
    margin-left: var(--gap-mid, 10px);
    margin-right: var(--gap-mid, 10px);
  }

  :host([arrow])::before {
    position: absolute;
    left: calc(0px - var(--gap-mid));
    top: 0;
    content: '';
    height: var(--tap-zone-size, 28px);
    width: var(--gap-mid, 10px);
    box-sizing: border-box;
    border-top: calc(var(--tap-zone-size, 28px) / 2) solid var(--color);
    border-bottom: calc(var(--tap-zone-size, 28px) / 2) solid var(--color);
    border-left: var(--gap-mid, 10px) solid transparent;
    border-right: none;
  }

  :host([arrow])::after {
    position: absolute;
    right: calc(0px - var(--gap-mid));
    top: 0;
    content: '';
    height: var(--tap-zone-size, 28px);
    width: var(--gap-mid, 10px);
    box-sizing: border-box;
    border-top: calc(var(--tap-zone-size, 28px) / 2) solid transparent;
    border-bottom: calc(var(--tap-zone-size, 28px) / 2) solid transparent;
    border-left: var(--gap-mid, 10px) solid var(--color);
    border-right: none;
  }

</style>
`;
ButtonUi.template = /*html*/ `
<teardrop-ui></teardrop-ui><icon-mkp bind="icon: icon"></icon-mkp><slot></slot>
`;
ButtonUi.logicAttributes = [
  'icon',
];
ButtonUi.is = 'button-ui';

export { ButtonUi };
