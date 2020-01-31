import {HdElement} from '../../../core/hd-element.js';

export class CardMkp extends HdElement {

  constructor() {
    super();

    this.defineAccessor('background-image', (val) => {
      this.style.setProperty('background-image', `url("${val}")`);
    });

    this.defineAccessor('background-pattern', (val) => {
      this.style.setProperty('background-image', `url("${val}")`);
    });

  }

  connectedCallback() {
    super.connectedCallback();
    window.requestAnimationFrame(() => {
      let rect = this.getBoundingClientRect();
      this.style.setProperty('--loc-half-height', rect.height / 2 + 'px');
    });
  }

}

const ARR_MIX = `
content: '';
position: absolute;
width: var(--gap-mid, 10px);
height: 100%;
box-sizing: border-box;
top: 0;
background-color: transparent;
`;

CardMkp.template = /*html*/ `
<style>
  :host {
    --local-color: var(--color, #000);
    --local-bg-color: var(--bg-color, #fff);
    display: block;
    padding: var(--gap-mid, 10px);
    border-radius: var(--radius, 4px);
    background-color: var(--local-bg-color);
    color: var(--local-color);
    box-sizing: border-box;
  }
  :host([outline]) {
    border: 1px solid currentColor;
  }
  :host([invert]) {
    --local-color: var(--bg-color, #fff);
    --local-bg-color: var(--color, #000);
  }
  :host([invert]) > * {
    --color: var(--local-color);
    --bg-color: var(--local-bg-color);
  }
  :host([shadow]) {
    box-shadow: 0 0 var(--gap-mid, 10px) var(--shade-color-1, rgba(0, 0, 0, 0.2));
  }
  :host([inline]) {
    display: inline-block;
  }
  :host([transparent]) {
    background: none;
  }
  :host([background-image]) {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  :host([background-pattern]) {
    background-repeat: repeat;
    background-position: top left;
  }
  :host([arrow]) {
    --loc-half-height: 0;
    position: relative;
    display: inline-block;
    border-radius: 0;
    border: none;
    margin-left: var(--gap-mid, 10px);
    margin-right: var(--gap-mid, 10px);
  }
  :host([arrow])::after {
    ${ARR_MIX}
    right: calc(0px - var(--gap-mid, 10px));
    border-left: 10px solid var(--local-bg-color);
    border-top: var(--loc-half-height) solid transparent;
    border-bottom: var(--loc-half-height) solid transparent;
  }
  :host([arrow])::before {
    ${ARR_MIX}
    left: calc(0px - var(--gap-mid, 10px));
    border-left: 10px solid transparent;
    border-top: var(--loc-half-height) solid var(--local-bg-color);
    border-bottom: var(--loc-half-height) solid var(--local-bg-color);
  }
</style>
<slot></slot>`;
CardMkp.logicAttributes = [
  'background-image',
  'background-pattern',
];
CardMkp.is = 'card-mkp';
