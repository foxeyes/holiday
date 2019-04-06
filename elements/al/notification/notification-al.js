import { HdElement } from '../../../core/hd-element.js';

class NotificationAl extends HdElement {

  constructor() {
    super();

    this.state = {
      icon: 'info',
      caption: 'Caption',
      html: '',
      act: {
        close: () => {
          this.active = false;
        },
      }
    };

    this.defineAccessor('icon', (val) => {
      this.setStateProperty('icon', val);
    });

    this.defineAccessor('caption', (val) => {
      this.setStateProperty('caption', val);
    });

    this.defineAccessor('active', (val) => {
      if (val) {
        this.setAttribute('active', '');
      } else {
        this.removeAttribute('active');
      }
    });

  }

}

NotificationAl.template = /*html*/ `
<style>
  :host {
    position: fixed;
    bottom: var(--gap-mid, 10px);
    right: var(--gap-mid, 10px);
    max-width: calc(100vw - var(--gap-mid, 10px) * 2);
    overflow: hidden;
    padding: var(--gap-mid, 10px);
    border-radius: var(--ui-radius, 4px);
    background-color: var(--bg-color, #fff);
    color: var(--color, #000);
    z-index: 100000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: var(--transition, 0.2s);
  }
  :host(:not([active])) {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .heading {
    display: flex;
    align-items: center;
    margin-bottom: var(--gap-mid);
  }
  .caption {
    padding-left: 0.4em;
    padding-right: var(--gap-max, 20px);
  }
  .content {
    word-wrap: break-word;
  }
</style>
<div class="heading">
  <icon-mkp bind="icon: icon"></icon-mkp>
  <div class="caption" bind="textContent: caption"></div>
  <button-ui icon="close" rounded outline bind="onclick: act.close"></button-ui>
</div>
<div class="content"><slot><slot></div>
`;
NotificationAl.logicAttributes = [
  'icon',
  'caption',
  'error',
];
NotificationAl.is = 'notification-al';

export { NotificationAl };