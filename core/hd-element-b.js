/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

import {HdElement} from './hd-element.js';

export class HdElementB extends HdElement {

  connectedCallback() {
    super.connectedCallback();
    if (!this.__bindProp) {
      this.__bindProp = this.getAttribute('bind-prop');
    }
    this.__bindId = this.getAttribute('bind-id');
    if (this.__bindProp && this.__bindId) {
      this.__bindActive = true;
      this.__bindHandler = (e) => {
        if (this.__bindActive && e.detail.dispatcher !== this && e.detail.value !== this[this.__bindProp]) {
          this.__bindActive = false;
          window.setTimeout(() => {
            this.__bindActive = true;
          });
          this[this.__bindProp] = e.detail.value;
        }
      };
      window.addEventListener(this.__bindId, this.__bindHandler);
    }
  }

  disconnectedCallback() {
    window.removeEventListener(this.__bindId, this.__bindHandler);
  }

  /**
   *
   * @param {String} propName
   * @param {*} propValue
   */
  notify(propName, propValue = null) {
    super.notify(propName, propValue = null);
    if (this.__bindProp && this.__bindId && this.__bindActive) {
      window.dispatchEvent(new CustomEvent(this.__bindId, {
        detail: {
          dispatcher: this,
          value: propValue,
        },
      }));
    }
  }

}
