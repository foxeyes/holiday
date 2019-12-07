/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

import { HdElement } from './hd-element.js';
import { HdRouter } from './hd-router.js';
import { HdState } from './hd-state.js';

class Holiday extends HdElement {

  static get __globalState() {
    return HdState;
  }

  constructor() {
    super();
    this.__globalSubscriptions = {};
  }

  /**
   *
   * @param {String} path
   * @param {*} value
   */
  publish(path, value) {
    this.constructor['__globalState'].publish(path, value);
  }

  /**
   *
   * @param {String} path
   * @param {Function} callback
   */
  subscribe(path, callback) {
    this.constructor['__globalState'].subscribe(path, callback);
    if (!this.__globalSubscriptions[ path ]) {
      this.__globalSubscriptions[ path ] = [];
    }
    this.__globalSubscriptions[ path ].push(callback);
  }

  /**
   *
   * @param {String} globalPath
   * @param {String} localPath
   * @param {Function} callback
   */
  reflectGlobalProperty(globalPath, localPath, callback = null) {
    this.subscribe(globalPath, (newValue) => {
      this.setStateProperty(localPath, newValue);
      if (callback) {
        callback(newValue);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (let path in this.__globalSubscriptions) {
      this.__globalSubscriptions[ path ].forEach((callback) => {
        this.constructor['__globalState'].unsubscribe(path, callback);
        callback = null;
      });
    }
    this.__globalSubscriptions = null;
  }

}

export {HdElement, HdRouter, HdState, Holiday};
