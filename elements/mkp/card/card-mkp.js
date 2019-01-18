import { HdElement } from '../../../core/hd-element.js';

class CardMkp extends HdElement {

  constructor() {
    super();

    this.defineAccessor('background-image', (val) => {
      this.style.setProperty('background-image', `url("${val}")`);
    });

    this.defineAccessor('background-pattern', (val) => {
      this.style.setProperty('background-image', `url("${val}")`);
    });

  }

}

CardMkp.styles = /*html*/ `
<style>
  :host {
    display: block;
    padding: var(--gap-mid, 10px);
    border-radius: var(--radius, 4px);
    background-color: var(--bg-color, #fff);
    color: var(--color, #000);
    box-sizing: border-box;
    transition: var(--transition, 0.2s);
  }
  :host([outline]) {
    border: 1px solid currentColor;
  }
  :host([invert]) {
    --local-color: var(--bg-color);
    --local-bg-color: var(--color);
    background-color: var(--local-bg-color);
    color: var(--local-color);
  }
  :host([invert]) * {
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
</style>
`;
CardMkp.template = /*html*/ `<slot></slot>`;
CardMkp.logicAttributes = [
  'background-image',
  'background-pattern',
];
CardMkp.is = 'card-mkp';

export { CardMkp };