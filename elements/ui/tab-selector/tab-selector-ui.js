import {HdElementB} from '../../../core/hd-element-b.js';
import { } from '../../mkp/icon/icon-mkp.js';

export class TabSelectorUi extends HdElementB {

  constructor() {
    super();

    this.defineAccessor('current', (val) => {
      if (this._current === val) {
        return;
      }
      this._current = val;
      this.setAttribute('current', val);

      let curTab = this.querySelector(`[value="${val}"]`);
      if (curTab) {
        this._currentTab && this._currentTab.removeAttribute('current');
        this._currentTab = curTab;
        curTab.setAttribute('current', '');
        let curPos = this._tabsArr.indexOf(curTab);
        this['underline-el'].style.left = this._defaultUnderlineWidth * curPos + '%';
        let tabColorCode = curTab.getAttribute('color-code');
        if (tabColorCode) {
          this['underline-el'].style.backgroundColor = tabColorCode;
        } else {
          this['underline-el'].style.removeProperty('background-color');
        }
      }
    });
  }

  _init() {
    let currentValue = this.getAttribute('current');
    this._tabsArr = [ ...this.querySelectorAll('tab-option-ui') ];

    this._tabsArr.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        let val = tab['value'];
        this.current = val;
        this.notify('current', val);
        this.notify('value', val);
      });
    });

    this._defaultUnderlineWidth = 100 / this._tabsArr.length;
    this['underline-el'].style.width = this._defaultUnderlineWidth + '%';
    if (currentValue) {
      this.current = currentValue;
    }
    if (!this.current && this._tabsArr[ 0 ]) {
      this.current = this._tabsArr[ 0 ].getAttribute('value');
    }
  }

  connectedCallback() {
    super.connectedCallback();

    window.setTimeout(() => {
      this._init();
    });

  }

}

TabSelectorUi.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: var(--tap-zone-size, 28px);
    font-size: var(--ui-font-size, 15px);
    box-sizing: border-box;
    color: var(--color, currentColor);
    overflow: hidden;
  }
  .underline {
    position: absolute;
    height: 2px;
    bottom: 0;
    background-color: currentColor;
    transition: 0.2s;
    pointer-events: none;
  }
  .underline-all {
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: currentColor;
    opacity: var(--shade-opacity, 0.2);
    pointer-events: none;
  }
</style>
<slot></slot>
<div class="underline" id="underline-el"></div>
<div class="underline-all"></div>
`;
TabSelectorUi.is = 'tab-selector-ui';

class TabOptionUi extends HdElementB {

  constructor() {
    super();

    this.state = {
      icon: '',
    };

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('color-code', (val) => {
      this.style.setProperty('--color', val);
    });
  }

}

TabOptionUi.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: transparent;
    height: var(--tap-zone-size, 28px);
    display: flex;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    padding-left: var(--ui-side-padding, 0.8em);
    padding-right: var(--ui-side-padding, 0.8em);
    flex-grow: 1;
    flex-basis: 0;
    cursor: pointer;
    user-select: none;
    opacity: 0.6;
    transition: var(--transition, 0.2s);
  }
  :host([current]) {
    opacity: 1;
    pointer-events: none;
  }
  :host(:hover) {
    opacity: 1;
  }
  :host([icon]) icon-mkp {
    margin-right: 0.5em;
    color: var(--color, #000);
  }

  @media screen and (max-width:600px) {

    .text {
      display: none;
    }

    icon-ui {
      margin: 0;
    }

  }
</style>
<icon-mkp bind="icon: icon"></icon-mkp><span class="text"><slot></slot></span>
`;
TabOptionUi.logicAttributes = [
  'icon',
  'value',
  'color-code',
];
TabOptionUi.is = 'tab-option-ui';
