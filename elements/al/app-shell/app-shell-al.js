import { HdElement } from '../../../core/hd-element.js';
import { IconMkp } from '../../mkp/icon/icon-mkp.js';

IconMkp.addIcons({
  'menu': 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
  'menu-close': 'M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z',
});

class AppShellAl extends HdElement {

  constructor() {
    super();

    this._onClickOutside = (e) => {
      let path = e.path || (e.composedPath && e.composedPath());
      if (!path) {
        return;
      }
      if (!path.includes(this['side-pan']) && !path.includes(this['top-pan'])) {
        this.setStateProperty('sidePanelAcive', false);
        this.setStateProperty('menuIcon', 'menu');
        window.removeEventListener('click', this._onClickOutside);
        window.removeEventListener('touchstart', this._onClickOutside);
      }
    };

    this.state = {
      icon: '',
      caption: '',
      sidePanelAcive: false,
      menuIcon: 'menu',
      actions: {
        menuClicked: () => {
          this.setStateProperty('sidePanelAcive', !this.state.sidePanelAcive);
          this.setStateProperty('menuIcon', this.state.sidePanelAcive ? 'menu-close' : 'menu');
          if (this.state.sidePanelAcive) {
            window.addEventListener('click', this._onClickOutside);
            window.addEventListener('touchstart', this._onClickOutside);
          } else {
            window.removeEventListener('click', this._onClickOutside);
            window.removeEventListener('touchstart', this._onClickOutside);
          }
        },
      },
    };

    this.defineAccessor('icon', (iconName) => {
      this.setStateProperty('icon', iconName);
    });

    this.defineAccessor('caption', (caption) => {
      this.setStateProperty('caption', caption);
    });

    this.defineAccessor('color-code', (color) => {
      this.style.setProperty('--color-code', color);
    });

  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this._onClickOutside);
    window.removeEventListener('touchstart', this._onClickOutside);
  }
}

AppShellAl.template = /*html*/ `
<style>
  ::-webkit-scrollbar {
    display: none;
  }
  :host {
    --l-width: calc(var(--tap-zone-size, 28px) + (var(--gap-min, 2px) * 2));

    display: block;
    padding-left: var(--side-panel-width, 240px);
    padding-top: calc(var(--tap-zone-size, 28px) + var(--gap-min, 2px) * 2);
  }
  top-panel-el {
    position: fixed;
    top: 0;
    right: 0;
    left: var(--side-panel-width, 240px);
    display: flex;
    align-items: center;
    height: var(--l-width);
    box-shadow: var(--ui-shadow, 0 2px 12px rgba(0, 0, 0, 0.2));
    padding-left: 0;
    color: var(--color, currentColor);
    background-color: var(--bg-color, #fff);
    font-size: calc(var(--tap-zone-size, 28px) / 2);
    transition: left 0.2s;
    overflow: hidden;
    white-space: nowrap;
    z-index: 10000;
  }
  top-panel-el::before {
    position: absolute;
    display: block;
    background-color: currentColor;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    pointer-events: none;
  }
  top-panel-el[active] {
    left: var(--side-panel-width, 240px);
  }
  .icon-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--tap-zone-size, 28px);
    width: var(--l-width);
    min-width: var(--l-width);
  }
  :host([color-code]) .icon-wrapper {
    background-color: var(--color, #000);
    color: var(--color-code, currentColor);
  }
  :host([color-code]) .title {
    padding-left: var(--gap-mid, 0.6em);
  }
  .caption {
    flex-grow: 1;
    padding-right: var(--gap-mid, 0.6em);
    overflow: hidden;
    user-select: none;
  }
  side-panel-el {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--side-panel-width, 240px);
    background-color: var(--color, #000);
    color: var(--bg-color, #fff);
    padding: var(--gap-min, 2px);
    box-sizing: border-box;
    transition: transform 0.2s;
    z-index: 100000;
  }
  side-panel-el[active] {
    transform: translateX(0);
  }
  menu-btn-el {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    display: none;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: var(--l-width);
    min-width: var(--tap-zone-size, 28px);
    background-color: var(--color, #000);
    color: var(--bg-color, #fff);
    cursor: pointer;
    user-select: none;
  }
  @media screen and (max-width: 800px) {
    :host {
      padding-left: 0;
    }
    side-panel-el {
      z-index: 1000;
      transform: translateX(-100%);
      will-change: transform;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    }
    top-panel-el {
      left: 0;
      will-change: left;
    }
    menu-btn-el {
      display: inline-flex;
    }
  }
</style>
<slot></slot>
<top-panel-el bind="@active: sidePanelAcive" id="top-pan">
  <menu-btn-el bind="onclick: actions.menuClicked">
    <icon-mkp bind="icon: menuIcon"></icon-mkp>
  </menu-btn-el>
  <div class="icon-wrapper">
    <icon-mkp bind="icon: icon"></icon-mkp>
  </div>
  <div class="caption" bind="textContent: caption"></div>
  <div class="top-right">
    <slot name="top-right"></slot>
  </div>
</top-panel-el>
<side-panel-el bind="@active: sidePanelAcive" id="side-pan">
  <slot name="menu"></slot>
</side-panel-el>
`;
AppShellAl.logicAttributes = [
  'icon',
  'caption',
  'color-code',
];

AppShellAl.is = 'app-shell-al';

export { AppShellAl };
