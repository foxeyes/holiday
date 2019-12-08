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

  /**
   *
   * @param {Object} scheme
   */
  static applyGlobalStateScheme(scheme) {
    HdState.applyScheme(scheme);
  }

  /**
   *
   * @param {String} statePath
   * @param {Object} routingMap
   * @param {String} propSeparator
   */
  static connectRouter(statePath, routingMap, propSeparator = null) {
    if (propSeparator) {
      HdRouter.setSeparator(propSeparator);
    }
    HdRouter.setRoutingMap(routingMap);
    window.addEventListener('hd-on-route', (e) => {
      HdState.publish(statePath, e['detail']);
    });
    HdRouter.notify();
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
    HdState.publish(path, value);
  }

  /**
   *
   * @param {String} path
   * @param {Function} callback
   */
  subscribe(path, callback) {
    HdState.subscribe(path, callback);
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
      this.__globalSubscriptions[path].forEach((callback) => {
        HdState.unsubscribe(path, callback);
        callback = null;
      });
    }
    this.__globalSubscriptions = null;
  }

}

export {HdElement, HdRouter, HdState, Holiday};
