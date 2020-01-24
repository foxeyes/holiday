import {HdElementB} from '../../../core/hd-element-b.js';

export class CtxAl extends HdElementB {

  constructor() {
    super();

    this.defineAccessor('current', (val) => {
      let ctxArr = [ ...this.querySelectorAll(`[ctx]`) ];
      ctxArr.forEach((el) => {
        let ctxEl = el.closest('ctx-al');
        if (ctxEl !== this) {
          return;
        }
        let ctxVal = el.getAttribute('ctx');
        if (ctxVal && ctxVal === val) {
          el.setAttribute('current', '');
        } else {
          el.removeAttribute('current');
        }
      });
    });
  }

}

CtxAl.template = /*html*/ `
<style>
  @supports not (display: contents) {
    :host {
      display: block;
    }
  }
  :host {
    display: contents;
  }
  ::slotted(:not([current])) {
    display: none !important;
  }
</style>
<slot></slot>
`;
CtxAl.bindable = true;
CtxAl.logicAttributes = [
  'current',
];
CtxAl.is = 'ctx-al';
